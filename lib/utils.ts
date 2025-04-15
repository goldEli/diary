import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function exportToCSV(filename: string, jsonData: Record<string, string | number>[]) {
  // 获取所有键作为表头
  const headers = Object.keys(jsonData?.[0]);

  // 处理值，确保特殊字符被正确转义
  const rows = jsonData.map((item) =>
    headers.map((header) => {
      let value = item[header as any];
      // 处理值为数字的情况
      if (typeof value === "number") {
        return value;
      }
      // 处理字符串，转义引号并包裹在引号中
      return `"${String(value).replace(/"/g, '""')}"`;    
    }).join(",")
  ).join("\n");

  // 组合CSV内容
  const csvContent = [
    headers.join(","), // 表头行
    rows, // 数据行
  ].join("\n");
  debugger

  // 创建下载链接
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

