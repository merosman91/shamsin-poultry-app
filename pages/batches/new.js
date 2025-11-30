import { useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '@/lib/db';

export default function NewBatchPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    startDate: new Date().toISOString().split('T')[0],
    chickCount: '',
    breed: 'ROSS 308',
    chickPrice: '',
    initialWeight: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.batches.add({
        ...formData,
        chickCount: parseInt(formData.chickCount),
        chickPrice: parseFloat(formData.chickPrice),
        initialWeight: parseFloat(formData.initialWeight),
        status: 'نشطة',
      });
      alert('تم إنشاء الدفعة بنجاح!');
      router.push('/batches');
    } catch (error) {
      console.error('فشل في إنشاء الدفعة:', error);
      alert('حدث خطأ ما.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">إنشاء دفعة جديدة</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700">تاريخ البدء</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">عدد الكتاكيت</label>
          <input type="number" name="chickCount" value={formData.chickCount} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">السلالة</label>
          <input type="text" name="breed" value={formData.breed} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">سعر الكتكوت (ج.م)</label>
          <input type="number" step="0.01" name="chickPrice" value={formData.chickPrice} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">الوزن الابتدائي (جم)</label>
          <input type="number" step="0.01" name="initialWeight" value={formData.initialWeight} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700">إنشاء الدفعة</button>
      </form>
    </div>
  );
    } 
