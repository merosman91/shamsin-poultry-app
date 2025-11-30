import Head from 'next/head';
import Link from 'next/link';
import { Home, Package, DollarSign, FileBarChart, Bird } from 'lucide-react';

export const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>شمسين - نظام إدارة مزارع الدواجن</title>
        <meta name="description" content="تطبيق ويب تقدمي لإدارة مزارع الدواجن" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="min-h-screen bg-gray-100 flex">
        {/* الشريط الجانبي */}
        <aside className="w-64 bg-white shadow-md">
          <div className="p-4 text-2xl font-bold text-green-600 border-b">
            🐔 شمسين
          </div>
          <nav className="p-4 space-y-2">
            <Link href="/" className="flex items-center space-x-2 space-x-reverse p-2 rounded hover:bg-gray-100">
              <Home size={20} /> <span>لوحة التحكم</span>
            </Link>
            <Link href="/batches" className="flex items-center space-x-2 space-x-reverse p-2 rounded hover:bg-gray-100">
              <Bird size={20} /> <span>إدارة الدفعات</span>
            </Link>
            <Link href="/finance" className="flex items-center space-x-2 space-x-reverse p-2 rounded hover:bg-gray-100">
              <DollarSign size={20} /> <span>الإدارة المالية</span>
            </Link>
            <Link href="/inventory" className="flex items-center space-x-2 space-x-reverse p-2 rounded hover:bg-gray-100">
              <Package size={20} /> <span>إدارة المخزون</span>
            </Link>
            <Link href="/reports" className="flex items-center space-x-2 space-x-reverse p-2 rounded hover:bg-gray-100">
              <FileBarChart size={20} /> <span>التقارير</span>
            </Link>
          </nav>
        </aside>

        {/* المحتوى الرئيسي */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </>
  );
};
