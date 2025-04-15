"use server";

import { CSVParser } from "@/lib/CSVParser";
import { DiaryEntry } from "@/types/diary";
import fs from "fs";
import path from "path";

export async function downloadCSV() {
  try {
    const dataDir = path.join(process.cwd(), "data");
    const files = fs
      .readdirSync(dataDir)
      .filter((file) => file.endsWith(".csv"));

    if (files.length === 0) {
      throw new Error("No CSV files found");
    }

    const ret: {
      fileName: string;
      list: DiaryEntry[]
    }[] = [];
    for (const item of files) {
      // 读取第一个CSV文件的内容
      const filePath = path.join(dataDir, item);
      if (!filePath.includes("diaries")) {
        continue;
      }
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const res = await CSVParser.parseAsync<DiaryEntry>(fileContent);
      ret.push({
        fileName: item,
        list: res
      })
    }
    return ret
  } catch (error) {
    console.error("Error reading CSV file:", error);
    return [];
  }
}

