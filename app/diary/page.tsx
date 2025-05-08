import { DiaryList } from "@/app/diary/DiaryList";
import { getDiaryList } from "../actions/getDiaryList";
import { HeaderActions } from "./HeaderActions";
import { CreateDiaryForm } from "./CreateDiaryForm";

export default async function Diary({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const p = await searchParams
  const page = Number(p?.page ?? "1");
  const res = await getDiaryList({ page });
  const total = res.total ?? 0;
  const diaries = res.data ?? [];


  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">我的日记</h1>
          <HeaderActions />
        </div>

        <CreateDiaryForm searchParams={searchParams} />

        <div className="h-2"></div>


        <DiaryList
          diaries={diaries}
          page={page}
          total={total}
        />

      </div>
    </main>
  );
}
