"use server";

import { DiaryEntry } from "@/types/diary";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import { stringify } from "csv-stringify/sync";
import { CSVParser } from "./CSVParser";

const DATA_DIR = path.join(process.cwd(), "data");
const getCurrentYear = () => new Date().getFullYear();
const CSV_FILE = path.join(DATA_DIR, `diaries_${getCurrentYear()}.csv`);

export const loadDiaries = async (): Promise<DiaryEntry[]> => {
  try {
    if (!fs.existsSync(CSV_FILE)) {
      return [];
    }
    const content = fs.readFileSync(CSV_FILE, "utf-8");
    if (!content.trim()) {
      return [];
    }
    // 同步解析
    const records = CSVParser.parseSync<DiaryEntry>(content);
    return records;
    // return records.map((record: any) => ({
    //   id: record.id,
    //   content: record.content,
    //   date: record.date,
    // }));
  } catch (error) {
    console.error("Error loading diaries:", error);
    return [];
  }
};

export const saveDiaries = async (diaries: DiaryEntry[]): Promise<void> => {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const csvContent = stringify(diaries, {
      header: true,
      columns: ["id", "content", "date"],
    });
    fs.writeFileSync(CSV_FILE, csvContent, "utf-8");
  } catch (error) {
    console.error("Error saving diaries:", error);
  }
};
