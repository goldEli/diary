"use client"

import { Button } from "@/components/ui/button";
import { ChartPie, Download, Search, SheetIcon } from "lucide-react";
import { exportSQL } from "@/app/actions/exportSQL";
import { exportCSV } from "@/app/actions/exportCSV";

export function HeaderActions() {
  return (
    <div className="flex gap-1">
      {/* search */}
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={(e) => {
          // go to statistics page
          window.location.href = "/search";
        }}
      >
        <Search className="w-4 h-4" />
      </Button>

      <Button
        variant={"outline"}
        size={"icon"}
        onClick={(e) => {
          // go to statistics page
          window.location.href = "/statistics";
        }}
      >
        {/* 统计 */}
        <ChartPie className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={async () => {
          try {
            const sqlContent = await exportSQL();
            const blob = new Blob([sqlContent], { type: "text/plain" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `diary_export_${
              new Date().toISOString().split("T")[0]
            }.sql`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          } catch (error) {
            console.error("导出失败:", error);
            alert("导出失败，请稍后重试");
          }
        }}
      >
        <Download className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={async () => {
          try {
            const csvContent = await exportCSV();
            const blob = new Blob([csvContent], {
              type: "text/csv;charset=utf-8;",
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `diary_export_${
              new Date().toISOString().split("T")[0]
            }.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          } catch (error) {
            console.error("导出失败:", error);
            alert("导出失败，请稍后重试");
          }
        }}
      >
        <SheetIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
