"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2, ChartPie, Search } from "lucide-react";
import { DiaryForm } from "@/components/DiaryForm";

import { DiaryEntry } from "@/types/diary";
// import { loadDiaries, saveDiaries } from "@/lib/diary";
import { Download } from "lucide-react";
// import { downloadCSV } from "@/app/actions/download";
import { exportToCSV } from "@/lib/utils";
import { DiaryList } from "@/components/DiaryList";
import { createDiary } from "./actions/createDiary";
import { getDiaryList } from "./actions/getDiaryList";
import { updateDiary } from "./actions/updateDiary";
import { deleteDiary } from "./actions/deleteDiary";
import { exportSQL } from "./actions/exportSQL";

export default function Home() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchDiaries = async (page: number) => {
    const res = await getDiaryList({ page });
    setTotal(res.total ?? 0);
    setDiaries(res.data ?? []);
  };
  useEffect(() => {
    fetchDiaries(page);
  }, [page]);

  const [showForm, setShowForm] = useState(false);
  const [currentDiary, setCurrentDiary] = useState<DiaryEntry | null>(null);

  const handleCreateDiary = () => {
    setShowForm(true);
    setCurrentDiary(null);
  };

  const handleEditDiary = (diary: DiaryEntry) => {
    setCurrentDiary(diary ?? null);
    setShowForm(true);
  };

  const handleDeleteDiary = async (id: string) => {
    if (!window.confirm("确定要删除这篇日记吗？")) return;
    const updatedDiaries = diaries.filter((diary) => diary.id !== id);
    setDiaries(updatedDiaries);
    await deleteDiary(id);
  };

  const handleSaveDiary = async (diary: Partial<DiaryEntry>) => {
    if (diary.id != void 0) {
      await updateDiary({
        id: diary.id!,
        content: diary.content ?? "",
        date: diary.date ?? "",
      });
    } else {
      await createDiary({
        content: diary.content ?? "",
        date: diary.date ?? "",
      });
    }
    fetchDiaries(page);
  };

  console.log(diaries);

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">我的日记</h1>
          <div className="flex gap-1">
            {/* search */}
            <Button variant={"outline"} size={"icon"} onClick={e => {
              // go to statistics page
              window.location.href = "/search";
            }}>
              <Search className="w-4 h-4" />
              
            </Button>

            <Button variant={"outline"} size={"icon"} onClick={e => {
              // go to statistics page
              window.location.href = "/statistics";
            }}>
              {/* 统计 */}
              <ChartPie className="w-4 h-4" />
              
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={async () => {
                try {
                  const sqlContent = await exportSQL();
                  const blob = new Blob([sqlContent], { type: "text/plain" });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `diary_export_${
                    new Date().toISOString().split("T")[0]
                  }.sql`;
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                  document.body.removeChild(a);
                } catch (error) {
                  console.error("导出失败:", error);
                  alert("导出失败，请稍后重试");
                }
              }}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {showForm ? (
          <DiaryForm
            diary={currentDiary ?? void 0}
            onClose={() => setShowForm(false)}
            onSave={handleSaveDiary}
          />
        ) : (
          <div
            className="text-center py-8 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={handleCreateDiary}
          >
            <PlusCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-500">点击这里开始写日记</p>
          </div>
        )}

        <div className="h-2"></div>

        {diaries?.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">还没有日记，开始写第一篇吧！</p>
          </div>
        ) : (
          <DiaryList
            diaries={diaries}
            handleEditDiary={handleEditDiary}
            handleDeleteDiary={handleDeleteDiary}
            page={page}
            total={total}
            onPageChange={setPage}
          />
        )}
      </div>
    </main>
  );
}
