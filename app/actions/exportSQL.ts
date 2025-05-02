"use server";

import { createConnection } from "@/lib/mysql";

export async function exportSQL() {
  const connection = await createConnection();
  try {
    // 获取所有日记数据
    const [rows] = await connection.query('SELECT * FROM diary');
    
    // 生成INSERT语句
    let sqlContent = `
    SET NAMES utf8mb4;
    SET FOREIGN_KEY_CHECKS = 0;
    `;
    for (const row of rows as any[]) {
      const { id, content, date } = row;
      const escapedContent = content.replace(/'/g, "''"); // 转义单引号
      sqlContent += `INSERT INTO diary (id, content, date) VALUES ('${id}', '${escapedContent}', '${date}');
`;
    }
    // end
    sqlContent += `
    SET FOREIGN_KEY_CHECKS = 1;
    `;

    return sqlContent;
  } catch (error) {
    console.error('Error exporting SQL:', error);
    throw error;
  } finally {
    await connection.end();
  }
}