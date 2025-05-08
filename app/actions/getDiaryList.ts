"use server";

import { cookies } from "next/headers";
import { DiaryEntry } from "@/types/diary";
import { createConnection } from "@/lib/mysql";

export async function getDiaryList(params: { page: number; pageSize?: number }) {
  const { page = 1, pageSize = 10 } = params;
  try {
    // const cookieStore = await cookies();
    // const username = cookieStore.get("username");

    // if (!username) {
    //   return { success: false, error: "未登录" };
    // }

    const connection = await createConnection();
    const offset = (page - 1) * pageSize;

    // 查询数据
  const [rows] = await connection.query(
    `SELECT * FROM diary ORDER BY date DESC LIMIT ? OFFSET ?`,
    [ pageSize, offset]
  );

    const [totalRows] = (await connection.execute(
      "SELECT COUNT(*) as total FROM diary"
    )) as any;

    const total = totalRows[0].total;

    await connection.end();

    return {
      success: true,
      data: rows as DiaryEntry[],
      total,
      hasMore: page * pageSize < total,
    };
  } catch (error) {
    console.error("Get diary list error:", error);
    return {
      success: false,
      error: "获取日记列表失败，请稍后重试",
    };
  }
}


/**
 * 获取日记详情
 * @param params
 * @returns
 */
export async function getDiaryDetail(params: { id: string }) {
  const { id } = params;
  try {
    const connection = await createConnection();
    const [rows] = await connection.query(
      "SELECT * FROM diary WHERE id = ?",
      [id]
    ) as any;
    await connection.end();
    return {
      success: true,
      data: rows[0],
    };
  } catch (error) {
    console.error("Get diary detail error:", error);
    return {
      success: false,
      error: "获取日记详情失败，请稍后重试",
    };
  }
}
