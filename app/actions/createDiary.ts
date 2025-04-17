"use server";

import { DiaryEntry } from '@/types/diary';
import mysql from 'mysql2/promise';
import { cookies } from 'next/headers';



export async function createDiary(diary: Omit<DiaryEntry, "id">) {
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

    const [result] = await connection.execute(
      'INSERT INTO diary (content, date) VALUES (?, ?)',
      [diary.content, diary.date]
    );

    await connection.end();

    return { 
      success: true, 
      data: null
    };

  } catch (error) {
    console.error("Create diary error:", error);
    return { 
      success: false, 
      error: "创建日记失败，请稍后重试" 
    };
  }
}