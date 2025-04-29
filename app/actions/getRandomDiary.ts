"use server";

import { createConnection } from '@/lib/mysql';

export type RandomDiary = {
  id: string;
  content: string;
  date: string;
};

export async function getRandomDiary(): Promise<{
  success: boolean;
  data?: RandomDiary;
  error?: string;
}> {
  try {
    const connection = await createConnection();

    const [randomDiaryResult] = await connection.execute(
      'SELECT id, content, DATE_FORMAT(date, "%Y-%m-%d") as date FROM diary ORDER BY RAND() LIMIT 1'
    ) as any;

    await connection.end();

    return {
      success: true,
      data: randomDiaryResult[0],
    };
  } catch (error) {
    console.error('Get random diary error:', error);
    return {
      success: false,
      error: '获取随机日记失败，请稍后重试',
    };
  }
}