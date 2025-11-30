import { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import Link from 'next/link';
import { Bird, DollarSign, TrendingUp, Package } from 'lucide-react';

export default function HomePage() {
  const [stats, setStats] = useState({ totalBatches: 0, activeBatches: 0, totalExpenses: 0, totalRevenue: 0 });

  useEffect(() => {
    const getStats = async () => {
      const allBatches = await db.batches.toArray();
      const active = allBatches.filter(b => b.status !== 'مكتملة').length;
      const expenses = (await db.transactions.where('type').equals('مصروف').toArray()).reduce((sum, t) => sum + t.amount, 0);
      const revenue = (await db.transactions.where('type').equals('إيراد').toArray()).reduce((sum, t) => sum + t.amount, 0);
      
      setStats({
        totalBatches: allBatches.length,
        activeBatches: active,
        totalExpenses: expenses,
        totalRevenue: revenue,
      });
    };
    getStats();
  }, []);

  const profit = stats.totalRevenue - stats.totalExpenses;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">لوحة التحكم</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4 space-x-reverse">
          <Bird className="text-blue-500" size={40} />
          <div>
            <p className="text-gray-500">إجمالي الدفعات</p>
            <p className="text-2xl font-bold">{stats.totalBatches}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4 space-x-reverse">
          <TrendingUp className="text-green-500" size={40} />
          <div>
            <p className="text-gray-500">دفعات نشطة</p>
            <p className="text-2xl font-bold">{stats.activeBatches}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4 space-x-reverse">
          <DollarSign className="text-red-500" size={40} />
          <div>
            <p className="text-gray-500">إجمالي المصروفات</p>
            <p className="text-2xl font-bold">{stats.totalExpenses.toFixed(2)} ج.م</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4 space-x-reverse">
          <Package className="text-purple-500" size={40} />
          <div>
            <p className="text-gray-500">صافي الربح</p>
            <p className={`text-2xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>{profit.toFixed(2)} ج.م</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">روابط سريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/batches/new" className="p-4 border rounded-lg hover:bg-gray-50 text-center">إنشاء دفعة جديدة</Link>
          <Link href="/finance" className="p-4 border rounded-lg hover:bg-gray-50 text-center">إضافة معاملة مالية</Link>
        </div>
      </div>
    </div>
  );
}
