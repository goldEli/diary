'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { DiaryForm } from '@/components/DiaryForm';

import { DiaryEntry } from '@/types/diary';
import { loadDiaries, saveDiaries } from '@/lib/diary';

export default function Home() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      if (localStorage.getItem("auth") != "admin") {
        window.location.href = "/login";
        return 
      }
      const loadedDiaries = await loadDiaries();
      setDiaries(loadedDiaries);
    };
    fetchDiaries();
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [currentDiary, setCurrentDiary] = useState<DiaryEntry | null>(null);

  const handleCreateDiary = () => {
    setShowForm(true);
    setCurrentDiary(null);
  };

  const handleEditDiary = (diary: DiaryEntry) => {
    setCurrentDiary(diary);
    setShowForm(true);
  };

  const handleDeleteDiary = async (id: string) => {
    const updatedDiaries = diaries.filter(diary => diary.id !== id);
    setDiaries(updatedDiaries);
    await saveDiaries(updatedDiaries);
  };

  const handleSaveDiary = async (diary: DiaryEntry) => {
    let updatedDiaries: DiaryEntry[];
    if (currentDiary) {
      updatedDiaries = diaries.map(d => d.id === diary.id ? diary : d);
    } else {
      updatedDiaries = [diary, ...diaries];
    }
    setDiaries(updatedDiaries);
    await saveDiaries(updatedDiaries);
  };

  console.log(diaries);

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">我的日记</h1>
        </div>

        {showForm ? (
          <DiaryForm
            diary={currentDiary}
            onClose={() => setShowForm(false)}
            onSave={handleSaveDiary}
          />
        ) : (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={handleCreateDiary}>
            <PlusCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-500">点击这里开始写日记</p>
          </div>
        )}

        <div className='h-2'></div>

        {diaries?.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">还没有日记，开始写第一篇吧！</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {diaries?.map?.((diary) => (
              <div
                key={diary.id}
                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditDiary(diary)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteDiary(diary.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-500">{diary.date}</span>
                </div>
                <p className="whitespace-pre-wrap">{diary.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
