"use client";
import { Trash2, Pencil } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useContext } from "react";
import { DiaryContext } from "../Content";

export function Actions(props: { id: string }) {
  const { id } = props;
  const { setEditId, setCreate, onDelete } = useContext(DiaryContext);
  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="icon"
        // onClick={() => handleEditDiary(diary)}
        onClick={() => {
          // add id to url
          setEditId(id);
          setCreate(true);
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
          await onDelete(id);
        }}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
