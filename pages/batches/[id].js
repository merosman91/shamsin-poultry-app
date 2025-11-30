import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db } from '@/lib/db';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DailyLogForm } from '@/components/daily-log-form';
import { ReportGenerator } from '@/components/report-generator';

export default function BatchDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [batch, setBatch] = useState(null);
  const [logs, setLogs] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchBatchData = async () => {
        const batchData = await db.batches.get(parseInt(id));
        if (!batchData) {
          router.push('/batches');
          return;
        }
        setBatch(batchData);

        const allLogs = await db.dailyLogs.where('batchId').equals(parseInt(id)).toArray();
        setLogs(allLogs);

        const dataForChart = allLogs.map(log => ({
          day: `يوم ${Math.floor((new Date(log.date) - new Date(batchData.startDate)) / (1000 * 60 * 60 * 24)) + 1}`,
          weight: log.avgWeight,
          feed: log.feedConsumed,
        }));
        setChartData(dataForChart);
      };
      fetchBatchData();
    }
  }, [id, router]);

  if (!batch) return <div>جاري التحميل...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">تفاصيل الدفعة #{batch.id}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow"><h3 className="font-semibold">السلالة</h3><p>{batch.breed}</p></div>
        <div className="p-4 bg-white rounded shadow"><h3 className="font-semibold">عدد الكتاكيت</h3><p>{batch.chickCount}</p></div>
        <div className="p-4 bg-white rounded shadow"><h3 className="font-semibold">تاريخ البدء</h3><p>{new Date(batch.startDate).toLocaleDateString('ar-EG')}</p></div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold mb-4">التسجيل اليومي</h2>
        <DailyLogForm batchId={batch.id} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold mb-4">تحليل الأداء</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="weight" stroke="#8884d8" name="متوسط الوزن (جم)" />
            <Line type="monotone" dataKey="feed" stroke="#82ca9d" name="استهلاك العلف (كجم)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">التقارير</h2>
        <ReportGenerator batch={batch} logs={logs} />
      </div>
    </div>
  );
}
