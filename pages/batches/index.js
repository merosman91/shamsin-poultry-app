import { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function BatchesPage() {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchBatches = async () => {
      const allBatches = await db.batches.orderBy('id').reverse().toArray();
      setBatches(allBatches);
    };
    fetchBatches();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">إدارة الدفعات</h1>
        <Link href="/batches/new" className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse hover:bg-green-700">
          <PlusCircle size={20} />
          <span>دفعة جديدة</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {batches.map(batch => (
          <Link key={batch.id} href={`/batches/${batch.id}`} className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">دفعة #{batch.id}</h2>
            <p className="text-gray-600">السلالة: {batch.breed}</p>
            <p className="text-gray-600">عدد الكتاكيت: {batch.chickCount}</p>
            <p className="text-gray-600">تاريخ البدء: {new Date(batch.startDate).toLocaleDateString('ar-EG')}</p>
            <p className="text-sm text-gray-500 mt-2">الحالة: {batch.status || 'نشطة'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
    } 
