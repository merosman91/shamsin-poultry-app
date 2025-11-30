import { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { Package, PlusCircle, AlertTriangle } from 'lucide-react';

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', type: 'علف', quantity: '', minLevel: '', expiryDate: '' });

  useEffect(() => {
    const fetchItems = async () => {
      const allItems = await db.inventory.toArray();
      setItems(allItems);
    };
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await db.inventory.add({ ...formData, quantity: parseInt(formData.quantity), minLevel: parseInt(formData.minLevel) });
    alert('تمت إضافة الصنف بنجاح');
    setFormData({ name: '', type: 'علف', quantity: '', minLevel: '', expiryDate: '' });
    window.location.reload();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">إدارة المخزون</h1>
      
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">إضافة صنف جديد</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <input type="text" name="name" placeholder="اسم الصنف" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} required className="p-2 border rounded" />
          <select name="type" value={formData.type} onChange={(e)=>setFormData({...formData, type:e.target.value})} className="p-2 border rounded"><option value="علف">علف</option><option value="دواء">دواء</option><option value="مستلزم">مستلزم</option></select>
          <input type="number" name="quantity" placeholder="الكمية" value={formData.quantity} onChange={(e)=>setFormData({...formData, quantity:e.target.value})} required className="p-2 border rounded" />
          <input type="number" name="minLevel" placeholder="الحد الأدنى" value={formData.minLevel} onChange={(e)=>setFormData({...formData, minLevel:e.target.value})} required className="p-2 border rounded" />
          <input type="date" name="expiryDate" value={formData.expiryDate} onChange={(e)=>setFormData({...formData, expiryDate:e.target.value})} className="p-2 border rounded" />
          <button type="submit" className="md:col-span-6 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 flex items-center justify-center space-x-2 space-x-reverse"><PlusCircle size={20} /><span>إضافة</span></button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">المخزون الحالي</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead><tr className="bg-gray-100"><th className="p-2">الاسم</th><th className="p-2">النوع</th><th className="p-2">الكمية</th><th className="p-2">الحد الأدنى</th><th className="p-2">تاريخ الانتهاء</th><th className="p-2">حالة</th></tr></thead>
            <tbody>{items.map(item => { const isLow = item.quantity <= item.minLevel; return <tr key={item.id} className="border-b"><td className="p-2">{item.name}</td><td className="p-2">{item.type}</td><td className="p-2">{item.quantity}</td><td className="p-2">{item.minLevel}</td><td className="p-2">{item.expiryDate ? new Date(item.expiryDate).toLocaleDateString('ar-EG') : '-'}</td><td className="p-2">{isLow ? <span className="text-red-600 flex items-center"><AlertTriangle size={16}/> منخفض</span> : <span className="text-green-600">جيد</span>}</td></tr> })}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
    } 
