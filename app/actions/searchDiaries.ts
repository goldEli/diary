"use server";

import { DiaryEntry } from "@/types/diary";
import { createConnection } from "@/lib/mysql";

interface SearchParams {
  keyword?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}

export async function searchDiaries(params: SearchParams) {
  const {
    keyword = "",
    startDate = "",
    endDate = "",
    page = 1,
    pageSize = 10,
  } = params;

  try {
    const connection = await createConnection();
    // 计算偏移量
    const offset = (page - 1) * pageSize;

    // 构建基础查询
    let baseQuery = `FROM diary WHERE 1=1`;
    const params = [];

    // 添加关键词条件
    if (keyword) {
      baseQuery += ` AND content LIKE ?`;
      params.push(`%${keyword}%`);
    }

    // 添加日期范围条件
    if (startDate) {
      baseQuery += ` AND STR_TO_DATE(date, '%Y/%m/%d') >= STR_TO_DATE(?, '%Y/%m/%d')`;
      params.push(startDate);
    }
    if (endDate) {
      baseQuery += ` AND STR_TO_DATE(date, '%Y/%m/%d') <= STR_TO_DATE(?, '%Y/%m/%d')`;
      params.push(endDate);
    }

    // 查询数据
    const [rows] = await connection.query(
      `SELECT * ${baseQuery} ORDER BY STR_TO_DATE(date, '%Y/%m/%d') DESC LIMIT ? OFFSET ?`,
      [...params, pageSize, offset]
    );


    // 查询总数
    const [totalResult] = (await connection.query(
      `SELECT COUNT(*) as total ${baseQuery}`,
      params
    )) as any;
    const total = totalResult[0].total;

    await connection.end();

    return {
      success: true,
      data: rows as DiaryEntry[],
      total,
      hasMore: page * pageSize < total,
    };
  } catch (error) {
    console.error("Search diaries error:", error);
    return {
      success: false,
      error: "搜索日记失败，请稍后重试",
    };
  }
}
