import { useState } from 'react';
import { db } from '@/lib/db';

export const DailyLogForm = ({ batchId, onLogAdded }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    feedConsumed: '',
    avgWeight: '',
    mortality: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.dailyLogs.add({
        ...formData,
        batchId: parseInt(batchId),
        feedConsumed: parseFloat(formData.feedConsumed),
        avgWeight: parseFloat(formData.avgWeight),
        mortality: parseInt(formData.mortality),
      });
      alert('تم تسجيل البيانات بنجاح!');
      onLogAdded(); // لتحديث الواجهة
      setFormData({ ...formData, feedConsumed: '', avgWeight: '', mortality: '' });
    } catch (error) {
      console.error('فشل في حفظ السجل:', error);
      alert('حدث خطأ ما.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <input type="date" name="date" value={formData.date} onChange={handleChange} required className="p-2 border rounded" />
      <input type="number" step="0.01" name="feedConsumed" placeholder="العلف المستهلك (كجم)" value={formData.feedConsumed} onChange={handleChange} required className="p-2 border rounded" />
      <input type="number" step="0.01" name="avgWeight" placeholder="متوسط الوزن (جم)" value={formData.avgWeight} onChange={handleChange} required className="p-2 border rounded" />
      <input type="number" name="mortality" placeholder="عدد النفوق" value={formData.mortality} onChange={handleChange} required className="p-2 border rounded" />
      <button type="submit" className="md:col-span-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">تسجيل</button>
    </form>
  );
};
