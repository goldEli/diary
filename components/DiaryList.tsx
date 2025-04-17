"use client";
import { DiaryEntry } from "@/types/diary";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface DiaryEntryProps {
  diaries: DiaryEntry[];
  handleEditDiary: (diary: DiaryEntry) => void;
  handleDeleteDiary: (id: string) => void;
  page: number;
  total: number;
  onPageChange: (page: number) => void;
}
export function DiaryList(props: DiaryEntryProps) {
  const { diaries, handleEditDiary, handleDeleteDiary, page, total, onPageChange } = props;
  return (
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
      <div className="flex justify-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          上一页
        </Button>
        <span className="flex items-center">
          第 {page} 页
        </span>
        <Button
          variant="outline"
          onClick={() => onPageChange(page + 1)}
          disabled={page * 10 >= total}
        >
          下一页
        </Button>
      </div>
    </div>
  );
}
