"use client";
import { Trash2, Pencil } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { deleteDiary } from "@/app/actions/deleteDiary";
import { useRouter, useSearchParams } from "next/navigation";

export function Actions(props: { id: string }) {
  const { id } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="icon"
        // onClick={() => handleEditDiary(diary)}
        onClick={() => {
          // add id to url
          router.push(`/diary?id=${id}&page=${page}`);
        }}
      >
        <Pencil className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        // onClick={() => handleDeleteDiary(diary.id)}
        onClick={async () => {
          if (!window.confirm("确定要删除这篇日记吗？")) return;
          await deleteDiary(id);
          router.refresh();
        }}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
