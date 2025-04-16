"use server";

import mysql from 'mysql2/promise';
import { createHash } from "crypto";
import { cookies } from 'next/headers';

export async function authenticate(formData: FormData) {
  try {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
      return { success: false, error: "用户名和密码不能为空" };
    }

    // 创建数据库连接
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'diary'
    });

    // 查询用户
    const [rows] = await connection.execute(
      'SELECT * FROM user WHERE username = ? AND password = ?',
      [username, password]
    );

    console.log(rows); // 输出查询结果，以检查是否正确获取了数据

    // 关闭连接
    await connection.end();

    const userFound = Array.isArray(rows) && rows.length > 0;

    if (userFound) {
      const md5Hash = createHash("md5");
      const credentialsHash = md5Hash
        .update(`${username}:${password}`)
        .digest("hex");
      
      // Set cookie
      const cookieStore = await cookies();
      cookieStore.set('auth', credentialsHash, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      });
      
      return { success: true };
    }

    return { success: false, error: "用户名或密码错误" };
  } catch (error) {
    console.error("Auth error:", error);
    return { success: false, error: "登录失败，请稍后重试" };
  }
}
