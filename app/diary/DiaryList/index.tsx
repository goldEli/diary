import { DiaryEntry } from "@/types/diary";
import { Paging } from "./Paging";
import { Actions } from "./Actions";

interface DiaryEntryProps {
  diaries: DiaryEntry[];
  page: number;
  total: number;
}
export function DiaryList(props: DiaryEntryProps) {
  const { diaries, page, total } = props;
  return (
    <div className="grid gap-4">
      {diaries?.map?.((diary) => (
        <div
          key={diary.id}
          className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-2">
            <Actions id={diary.id} />
            <span className="text-sm text-gray-500">{diary.date}</span>
          </div>
          <p className="whitespace-pre-wrap">{diary.content}</p>
        </div>
      ))}
      <Paging page={page} total={total} />
    </div>
  );
}
