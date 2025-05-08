"use server";

import { createConnection } from '@/lib/mysql';
import { RandomDiary } from './getRandomDiary';

export async function getHistoryDiary(): Promise<{
  success: boolean;
  data?: RandomDiary;
  error?: string;
}> {
  try {
    const connection = await createConnection();
    // const today = new Date();
    // const month = today.getMonth() + 1;
    // const day = today.getDate();

    // const [historyDiaryResult] = await connection.execute(
    //   'SELECT id, content, DATE_FORMAT(date, "%Y-%m-%d") as date FROM diary WHERE MONTH(date) = ? ORDER BY RAND() LIMIT 1',
    //   [month, day]
    // ) as any;

    // 获取当前日期
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // 月份从0开始
    const currentDay = now.getDate();
    
    // 格式化月份和日期为两位数
    const month = currentMonth.toString().padStart(2, '0');
    const day = currentDay.toString().padStart(2, '0');
    
    // 构建日期模式 (MM-DD)
    const datePattern = `${month}-${day}`;
    
    // 查询历史今天的数据
    const [historyDiaryResult] = await connection.query(
      `SELECT * FROM diary 
       WHERE DATE_FORMAT(STR_TO_DATE(date, '%Y/%m/%d'), '%m-%d') = ? 
       ORDER BY date DESC`,
      [datePattern]
    ) as any;

    await connection.end();


    return {
      success: true,
      data: historyDiaryResult[Math.floor(Math.random() * historyDiaryResult.length)],
    };
  } catch (error) {
    console.error('Get history diary error:', error);
    return {
      success: false,
      error: '获取历史日记失败，请稍后重试',
    };
  }
}