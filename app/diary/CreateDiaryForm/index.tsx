import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { DiaryForm } from "../DiaryForm";
// import { useRouter, useSearchParams } from "next/navigation";

// export const CreateDiaryForm = ({}:) => {
export async function CreateDiaryForm({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const p = await searchParams
  const page = Number(p?.page ?? "1");
  const create = p?.create === "true";
  const id = p?.id ?? "";

  const showForm = create || !!id

  return showForm ? (
    <DiaryForm />
  ) : (
    <Link
      href={`/diary?page=${page}&create=true`}
      className="text-center py-8 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
    >
      <PlusCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
      <p className="text-gray-500">点击这里开始写日记</p>
    </Link>
  );
}
