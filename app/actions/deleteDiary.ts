"use server";

import { createConnection } from "@/lib/mysql";
import { DiaryEntry } from "@/types/diary";
import mysql from "mysql2/promise";
import { cookies } from "next/headers";

export async function deleteDiary(id: string) {
  try {
    // const cookieStore = await cookies();
    // const username = cookieStore.get("username");

    // if (!username) {
    //   return { success: false, error: "未登录" };
    // }

    const connection = await createConnection();

    const [result] = await connection.execute(
      "DELETE FROM diary WHERE id = ?",
      [Number(id)]
    );

    await connection.end();

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    console.error("Delete diary error:", error);
    return {
      success: false,
      error: "删除日记失败，请稍后重试",
    };
  }
}
