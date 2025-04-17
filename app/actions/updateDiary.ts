"use server";

import { DiaryEntry } from '@/types/diary';
import { createConnection } from '@/lib/mysql';
import { cookies } from 'next/headers';



export async function updateDiary(diary: DiaryEntry) {
  try {
    const cookieStore = await cookies();
    const username = cookieStore.get('username');

    if (!username) {
      return { success: false, error: "未登录" };
    }

    const connection = await createConnection();

    const [result] = await connection.execute(
      'UPDATE diary SET content = ?, date = ? WHERE id = ?',
      [diary.content, diary.date, diary.id]
    );

    await connection.end();

    return { 
      success: true, 
      data: null
    };

  } catch (error) {
    console.error("Update diary error:", error);
    return { 
      success: false, 
      error: "更新日记失败，请稍后重试" 
    };
  }
}