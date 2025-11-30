import Dexie from 'dexie';

export const db = new Dexie('shamsinDB');

// تعريف الجداول والحقول
db.version(1).stores({
  // دفعات الدواجن
  batches: '++id, startDate, chickCount, breed, chickPrice, initialWeight, status',
  // السجلات اليومية لكل دفعة
  dailyLogs: '++id, batchId, date, feedConsumed, avgWeight, mortality',
  // المعاملات المالية (إيرادات ومصروفات)
  transactions: '++id, type, category, amount, description, date',
  // عناصر المخزون
  inventory: '++id, name, type, quantity, minLevel, expiryDate',
});

// فتح قاعدة البيانات
db.open().catch(err => {
  console.error(err.stack || err);
});
