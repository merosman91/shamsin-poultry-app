import { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { PlusCircle, TrendingUp, TrendingDown } from 'lucide-react';

export default function FinancePage() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({ type: 'مصروف', category: 'علف', amount: '', description: '', date: new Date().toISOString().split('T')[0] });

  useEffect(() => {
    const fetchTransactions = async () => {
      const allTransactions = await db.transactions.orderBy('id').reverse().toArray();
      setTransactions(allTransactions);
    };
    fetchTransactions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await db.transactions.add({ ...formData, amount: parseFloat(formData.amount) });
    alert('تمت إضافة المعاملة بنجاح');
    setFormData({ ...formData, amount: '', description: '' });
    window.location.reload();
  };

  const totalRevenue = transactions.filter(t => t.type === 'إيراد').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'مصروف').reduce((sum, t) => sum + t.amount, 0);
  const profit = totalRevenue - totalExpenses;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">الإدارة المالية</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-100 p-6 rounded-lg text-center"><TrendingUp className="mx-auto text-green-600" size={40} /><p className="text-xl font-bold mt-2">إجمالي الإيرادات</p><p className="text-2xl">{totalRevenue.toFixed(2)} ج.م</p></div>
        <div className="bg-red-100 p-6 rounded-lg text-center"><TrendingDown className="mx-auto text-red-600" size={40} /><p className="text-xl font-bold mt-2">إجمالي المصروفات</p><p className="text-2xl">{totalExpenses.toFixed(2)} ج.م</p></div>
        <div className="bg-blue-100 p-6 rounded-lg text-center"><p className="text-xl font-bold mt-2">صافي الربح</p><p className={`text-2xl ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>{profit.toFixed(2)} ج.م</p></div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">إضافة معاملة جديدة</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <select name="type" value={formData.type} onChange={(e)=>setFormData({...formData, type:e.target.value})} className="p-2 border rounded">
            <option value="مصروف">مصروف</option>
            <option value="إيراد">إيراد</option>
          </select>
          <input type="number" step="0.01" name="amount" placeholder="المبلغ" value={formData.amount} onChange={handleChange} required className="p-2 border rounded" />
          <input type="text" name="description" placeholder="وصف" value={formData.description} onChange={handleChange} required className="p-2 border rounded" />
          <input type="date" name="date" value={formData.date} onChange={handleChange} required className="p-2 border rounded" />
          <button type="submit" className="md:col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 flex items-center justify-center space-x-2 space-x-reverse"><PlusCircle size={20} /><span>إضافة</span></button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">آخر المعاملات</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead><tr className="bg-gray-100"><th className="p-2">النوع</th><th className="p-2">الوصف</th><th className="p-2">المبلغ</th><th className="p-2">التاريخ</th></tr></thead>
            <tbody>{transactions.map(t => <tr key={t.id} className="border-b"><td className="p-2">{t.type}</td><td className="p-2">{t.description}</td><td className={`p-2 ${t.type === 'إيراد' ? 'text-green-600' : 'text-red-600'}`}>{t.amount.toFixed(2)}</td><td className="p-2">{new Date(t.date).toLocaleDateString('ar-EG')}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
    } 
