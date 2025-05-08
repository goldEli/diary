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

  // const fetchDiaries = async (page: number) => {
  //   const res = await getDiaryList({ page });
  //   setTotal(res.total ?? 0);
  //   setDiaries(res.data ?? []);
  // };
  // useEffect(() => {
  //   fetchDiaries(page);
  // }, [searchParams]);

  // const [showForm, setShowForm] = useState(false);
  // const [currentDiary, setCurrentDiary] = useState<DiaryEntry | null>(null);

  // const handleCreateDiary = () => {
  //   setShowForm(true);
  //   setCurrentDiary(null);
  // };

  // const handleEditDiary = (diary: DiaryEntry) => {
  //   setCurrentDiary(diary ?? null);
  //   setShowForm(true);
  // };

  // const handleDeleteDiary = async (id: string) => {
  //   if (!window.confirm("确定要删除这篇日记吗？")) return;
  //   // const updatedDiaries = diaries.filter((diary) => diary.id !== id);
  //   // setDiaries(updatedDiaries);
  //   await deleteDiary(id);
  // };

  // const handleSaveDiary = async (diary: Partial<DiaryEntry>) => {
  //   if (diary.id != void 0) {
  //     await updateDiary({
  //       id: diary.id!,
  //       content: diary.content ?? "",
  //       date: diary.date ?? "",
  //     });
  //   } else {
  //     await createDiary({
  //       content: diary.content ?? "",
  //       date: diary.date ?? "",
  //     });
  //   }
  //   // fetchDiaries(page);
  // };

  console.log(diaries);

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

        {/* {diaries?.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">还没有日记，开始写第一篇吧！</p>
          </div>
        ) : (
          <DiaryList
            diaries={diaries}
            handleEditDiary={() => {}}
            handleDeleteDiary={() => {}}
            page={page}
            total={total}
            onPageChange={(newPage) => {
              window.location.href = `/?page=${newPage}`;
            }}
          />
        )} */}
      </div>
    </main>
  );
}
