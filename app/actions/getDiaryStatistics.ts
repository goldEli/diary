"use server";

import { createConnection } from '@/lib/mysql';
import { getRandomDiary, RandomDiary } from './getRandomDiary';
import { getHistoryDiary } from './getHistoryDiary';

export type DiaryStatistics = {
  totalCount: number;
  monthlyStats: Array<{
    month: string;
    count: number;
  }>;
  avgContentLength: number;
  randomDiary?: RandomDiary;
  historyDiary?: RandomDiary;
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

    await connection.end();

    // 获取随机一篇日记
    const randomDiaryResult = await getRandomDiary();
    // 获取历史上的今天的日记
    const historyDiaryResult = await getHistoryDiary();

    return {
      success: true,
      data: {
        totalCount,
        monthlyStats,
        avgContentLength,
        randomDiary: randomDiaryResult.data,
        historyDiary: historyDiaryResult.data,
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