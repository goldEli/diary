'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getDiaryStatistics, DiaryStatistics } from '../actions/getDiaryStatistics';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState<DiaryStatistics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      const result = await getDiaryStatistics();
      if (result.success && result.data) {
        setStatistics(result.data);
      } else {
        setError(result.error || '获取数据失败');
      }
    };

    fetchStatistics();
  }, []);

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!statistics) {
    return <div className="p-4">加载中...</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">日记统计</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="text-lg font-semibold">总日记数</CardHeader>
          <CardContent className="text-3xl font-bold text-primary">
            {statistics.totalCount}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-lg font-semibold">平均字数</CardHeader>
          <CardContent className="text-3xl font-bold text-primary">
            {statistics.avgContentLength}
          </CardContent>
        </Card>

        {statistics.randomDiary && (
          <Card>
            <CardHeader className="text-lg font-semibold">随机一则日记</CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-500">{statistics.randomDiary.date}</div>
              <div className="text-sm line-clamp-4">{statistics.randomDiary.content}</div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="mt-6">
        <CardHeader className="text-lg font-semibold">月度统计</CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statistics.monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" name="日记数量" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}