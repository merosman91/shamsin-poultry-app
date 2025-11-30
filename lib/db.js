import Dexie from 'dexie';

export const db = new Dexie('shamsinDB');

db.version(1).stores({
  batches: '++id, startDate, chickCount, breed, chickPrice, initialWeight, status',
  dailyLogs: '++id, batchId, date, feedConsumed, avgWeight, mortality',
  transactions: '++id, type, category, amount, description, date',
  inventory: '++id, name, type, quantity, minLevel, expiryDate',
});

db.open().catch(err => {
  console.error("Failed to open db: " + err.stack);
});
