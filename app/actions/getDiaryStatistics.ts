"use server";

import { createConnection } from '@/lib/mysql';

export type DiaryStatistics = {
  totalCount: number;
  monthlyStats: Array<{
    month: string;
    count: number;
  }>;
  avgContentLength: number;
  randomDiary?: {
    id: string;
    content: string;
    date: string;
  };
};

export async function getDiaryStatistics(): Promise<{
  success: boolean;
  data?: DiaryStatistics;
  error?: string;
}> {
  try {
    const connection = await createConnection();

    // 获取总日记数
    const [totalResult] = await connection.execute(
      'SELECT COUNT(*) as total FROM diary'
    ) as any;
    const totalCount = totalResult[0].total;

    // 获取每月日记数量统计
    const [monthlyStats] = await connection.execute(
      `SELECT 
        DATE_FORMAT(date, '%Y-%m') as month,
        COUNT(*) as count
       FROM diary
       GROUP BY DATE_FORMAT(date, '%Y-%m')
       ORDER BY month DESC
       LIMIT 12`
    ) as any;

    // 获取平均内容长度
    const [avgLengthResult] = await connection.execute(
      'SELECT AVG(CHAR_LENGTH(content)) as avgLength FROM diary'
    ) as any;
    const avgContentLength = Math.round(avgLengthResult[0].avgLength || 0);

    // 获取随机一篇日记
    const [randomDiaryResult] = await connection.execute(
      'SELECT id, content, DATE_FORMAT(date, "%Y-%m-%d") as date FROM diary ORDER BY RAND() LIMIT 1'
    ) as any;
    const randomDiary = randomDiaryResult[0];

    await connection.end();

    return {
      success: true,
      data: {
        totalCount,
        monthlyStats,
        avgContentLength,
        randomDiary,
      },
    };
  } catch (error) {
    console.error('Get diary statistics error:', error);
    return {
      success: false,
      error: '获取统计数据失败，请稍后重试',
    };
  }
}