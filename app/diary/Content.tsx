"use client";
import { DiaryList } from "@/app/diary/DiaryList";
import { getDiaryList } from "../actions/getDiaryList";
import { HeaderActions } from "./HeaderActions";
import { CreateDiaryForm } from "./CreateDiaryForm";
import { DiaryEntry } from "@/types/diary";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { deleteDiary } from "../actions/deleteDiary";
import { createDiary } from "../actions/createDiary";
import { updateDiary } from "../actions/updateDiary";
export const DiaryContext = createContext<{
  page: number;
  setPage: (page: number) => void;
  diaries: DiaryEntry[];
  total: number;
  onDelete: (id: DiaryEntry["id"]) => void;
  onEdit: (diary: Omit<DiaryEntry, "id"> & Partial<Pick<DiaryEntry, "id">>) => void;
  create: boolean;
  setCreate: (create: boolean) => void;
  editId: DiaryEntry["id"] | null;
  setEditId: (editId: DiaryEntry["id"] | null) => void;
}>({
  page: 1,
  setPage: () => {},
  diaries: [],
  total: 0,
  create: false,
  setCreate: () => {},
  onDelete: () => {},
  onEdit: () => {},
  editId: null,
  setEditId: () => {},
});

export default function Content() {
  const [page, setPage] = useState(1);
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [create, setCreate] = useState(false);
  const [editId, setEditId] = useState<DiaryEntry["id"] | null>(null);

  const fetchDiaries = async (page: number) => {
    setLoading(true);
    const res = await getDiaryList({ page });
    setDiaries(res.data ?? []);
    setTotal(res.total ?? 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchDiaries(page);
  }, [page]);

  const onDelete = async (id: DiaryEntry["id"]) => {
    await deleteDiary(id);
    fetchDiaries(page);
  };

  const onEdit = async (diary: Omit<DiaryEntry, "id"> & Partial<Pick<DiaryEntry, "id">>) => {
    if (!diary.id) {
      await createDiary(diary);
    } else {
      await updateDiary({ ...diary, id: diary.id! });
    }
    fetchDiaries(page);
    setEditId(null);
    setCreate(false);
  };

  return (
    <DiaryContext.Provider
      value={{ page, setPage, diaries, total, onDelete, onEdit, create, setCreate, editId, setEditId }}
    >
      <main className="min-h-screen p-4 md:p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">我的日记</h1>
            <HeaderActions />
          </div>

          <CreateDiaryForm />

          <div className="h-2"></div>
          {loading ? (
            <div className="text-center text-gray-500">加载中...</div>
          ) : (
            <DiaryList diaries={diaries} page={page} total={total} />
          )}
        </div>
      </main>
    </DiaryContext.Provider>
  );
}
