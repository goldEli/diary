import { PlusCircle } from "lucide-react";
import { DiaryForm } from "../DiaryForm";
import { DiaryContext } from "../Content";
import { useContext } from "react";

export async function CreateDiaryForm() {
  const { setCreate, create } = useContext(DiaryContext);

  const showForm = create 

  return showForm ? (
    <DiaryForm />
  ) : (
    <div
      onClick={() => setCreate(true)}
      className="text-center py-8 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
    >
      <PlusCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
      <p className="text-gray-500">点击这里开始写日记</p>
    </div>
  );
}
