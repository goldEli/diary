"use server";

import { createConnection } from "@/lib/mysql";

export async function exportCSV() {
  const connection = await createConnection();
  try {
    // 获取所有日记数据
    const [diaries] = await connection.query("SELECT * FROM diary") as any;

    // 创建CSV内容
    const csvHeader = "日期,内容\n";
    const csvRows = diaries.map((diary: any) => {
      // 处理内容中的逗号和换行符，确保CSV格式正确
    //   const sanitizedContent = diary.content
    //     .replace(/"/g, '""')
    //     .replace(/\n/g, " ");
      return `${diary.date},"${diary.content}"`;
    });

    return csvHeader + csvRows.join("\n");
  } catch (error) {
    console.error("导出CSV失败:", error);
    throw new Error("导出CSV失败");
  }
}
