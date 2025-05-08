"use client";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";

export function Paging(props: {
  page: number;
  total: number;
}) {
  const router = useRouter();
  const { page, total } = props;
  return (
    <div className="flex justify-center gap-4 mt-4">
      <Button
        variant="outline"
        onClick={() => router.push(`/diary?page=${page - 1}`)}
        disabled={page <= 1}
      >
        上一页
      </Button>
      <span className="flex items-center">第 {page} 页</span>
      <Button
        variant="outline"
        onClick={() => router.push(`/diary?page=${page + 1}`)}
        disabled={page * 10 >= total}
      >
        下一页
      </Button>
    </div>
  );
}
