"use client";
import { Button } from "../../../components/ui/button";
import { useContext } from "react";
import { DiaryContext } from "../Content";

export function Paging() {
  const { page, setPage, total } = useContext(DiaryContext);
  return (
    <div className="flex justify-center gap-4 mt-4">
      <Button
        variant="outline"
        onClick={() => setPage(page - 1)}
        disabled={page <= 1}
      >
        上一页
      </Button>
      <span className="flex items-center">第 {page} 页</span>
      <Button
        variant="outline"
        onClick={() => setPage(page + 1)}
        disabled={page * 10 >= total}
      >
        下一页
      </Button>
    </div>
  );
}
