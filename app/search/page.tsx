"use client";

import { useState } from "react";
import { DiaryEntry } from "@/types/diary";
import { DiaryList } from "@/components/DiaryList";
import { searchDiaries } from "../actions/searchDiaries";
import { DatePicker } from "@/components/DatePicker";
import dayjs from "dayjs";
import Link from "next/link";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  // 3个月前
  const [startDate, setStartDate] = useState(dayjs().subtract(30, "day").format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const result = await searchDiaries({
        keyword,
        startDate: dayjs(startDate).format("YYYY/MM/DD"),
        endDate: dayjs(endDate).format("YYYY/MM/DD"),
        page,
        pageSize: 10,
      });

      if (result.success) {
        setDiaries(result.data ?? []);
        setTotal(result.total);
      }
    } catch (error) {
      console.error("搜索失败:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">搜索日记</h1>
          <Link
            href="/"
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            返回首页
          </Link>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              关键词
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入搜索关键词"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                开始日期
              </label>
              <DatePicker
                value={startDate}
                onChange={setStartDate}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                结束日期
              </label>
              <DatePicker
                value={endDate}
                onChange={setEndDate}
                className="w-full"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "搜索中..." : "搜索"}
          </button>
        </div>
      </div>

      {diaries.length > 0 ? (
        <DiaryList
          diaries={diaries}
          handleDeleteDiary={() => {}}
          handleEditDiary={() => {}}
          total={total}
          page={page}
          onPageChange={(newPage) => {
            setPage(newPage);
            handleSearch();
          }}
        />
      ) : (
        <div className="text-center text-gray-500 mt-8">
          {loading ? "加载中..." : "暂无搜索结果"}
        </div>
      )}
    </div>
  );
}
