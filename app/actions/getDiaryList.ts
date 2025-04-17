"use server";

import { DiaryEntry } from '@/types/diary';
import mysql from 'mysql2/promise';
import { cookies } from 'next/headers';

export async function getDiaryList() {
  try {
    const cookieStore = await cookies();
    const username = cookieStore.get('username');

    if (!username) {
      return { success: false, error: "未登录" };
    }

    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'diary'
    });

    const [rows] = await connection.execute(
      'SELECT * FROM diary ORDER BY date DESC'
    );

    await connection.end();

    return { 
      success: true, 
      data: rows as DiaryEntry[]
    };

  } catch (error) {
    console.error("Get diary list error:", error);
    return { 
      success: false, 
      error: "获取日记列表失败，请稍后重试" 
    };
  }
}