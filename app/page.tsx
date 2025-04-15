'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { DiaryForm } from '@/components/DiaryForm';

interface DiaryEntry {
  id: string;
  content: string;
  date: string;
}

export default function Home() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
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

  const handleDeleteDiary = (id: string) => {
    setDiaries(diaries.filter(diary => diary.id !== id));
  };

  const handleSaveDiary = (diary: DiaryEntry) => {
    if (currentDiary) {
      setDiaries(diaries.map(d => d.id === diary.id ? diary : d));
    } else {
      setDiaries([diary, ...diaries]);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">我的日记</h1>
          {/* <Button onClick={handleCreateDiary} className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            写日记
          </Button> */}
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

        {diaries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">还没有日记，开始写第一篇吧！</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {diaries.map((diary) => (
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
                </div>
                <p className="text-gray-600 mb-2 line-clamp-2">{diary.content}</p>
                <time className="text-sm text-gray-400">{diary.date}</time>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
