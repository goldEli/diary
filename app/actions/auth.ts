"use server";

import { CSVParser } from "@/lib/CSVParser";
import { createHash } from "crypto";
import fs from "fs/promises";
import path from "path";
import { cookies } from 'next/headers';

export async function authenticate(formData: FormData) {
  try {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
      return { success: false, error: "用户名和密码不能为空" };
    }

    const csvPath = path.join(process.cwd(), "data", "admin.csv");
    const csvContent = await fs.readFile(csvPath, "utf-8");
    const rows = await CSVParser.parseAsync<{ username: string; password: string }>(
      csvContent
    );

    const userFound = rows.some((row) => {
      return row.username === username && row.password === password;
    });
    console.log("rows:",rows)
    console.log("password:",password)
    console.log("username:",username)

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
