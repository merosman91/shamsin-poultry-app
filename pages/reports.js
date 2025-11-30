import { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { FileBarChart } from 'lucide-react';

export default function ReportsPage() {
  const [report, setReport] = useState({ totalRevenue: 0, totalExpenses: 0, profit: 0 });

  useEffect(() => {
    const generateReport = async () => {
      const revenue = (await db.transactions.where('type').equals('إيراد').toArray()).reduce((sum, t) => sum + t.amount, 0);
      const expenses = (await db.transactions.where('type').equals('مصروف').toArray()).reduce((sum, t) => sum + t.amount, 0);
      setReport({ totalRevenue: revenue, totalExpenses: expenses, profit: revenue - expenses });
    };
    generateReport();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-2 space-x-reverse"><FileBarChart size={40}/>التقارير العامة</h1>
      
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">ملخص مالي شامل</h2>
        <div className="space-y-4">
          <div className="flex justify-between text-lg"><span>إجمالي الإيرادات:</span><span className="font-bold text-green-600">{report.totalRevenue.toFixed(2)} ج.م</span></div>
          <div className="flex justify-between text-lg"><span>إجمالي المصروفات:</span><span className="font-bold text-red-600">{report.totalExpenses.toFixed(2)} ج.م</span></div>
          <hr />
          <div className="flex justify-between text-xl"><span>صافي الربح:</span><span className={`font-bold ${report.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>{report.profit.toFixed(2)} ج.م</span></div>
        </div>
        <p className="text-sm text-gray-500 mt-6">هذا التقرير يعكس جميع المعاملات المسجلة في النظام.</p>
      </div>
    </div>
  );
    } 
