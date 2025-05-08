"use client";

import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getDiaryDetail } from "@/app/actions/getDiaryList";
import { DiaryContext } from "./Content";

interface DiaryEntry {
  id: string;
  content: string;
  date: string;
}

/**
 *  格式化日期 2025/01/01 18:00:00
 * @param date
 */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

export function DiaryForm() {
  const { editId, onEdit, setCreate } = useContext(DiaryContext);
  const [diary, setDiary] = useState<DiaryEntry | null>(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editId) {
      getDiaryDetail({ id: editId }).then((res) => {
        setDiary(res.data);
        setContent(res.data.content);
      });
    }
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newDiary: Partial<DiaryEntry> = {
      content,
      date: diary?.date ?? formatDate(new Date()),
    };
    if (diary?.id) {
      newDiary.id = diary.id;
    }
    onEdit({
      id: newDiary.id,
      content: newDiary.content ?? "",
      date: newDiary.date ?? "",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            写下你的故事
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="今天发生了什么有趣的事情..."
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setCreate(false);
            }}
          >
            取消
          </Button>
          <Button type="submit">保存</Button>
        </div>
      </form>
    </div>
  );
}
