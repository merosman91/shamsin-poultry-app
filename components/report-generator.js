import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Download, Share2 } from 'lucide-react';

export const ReportGenerator = ({ batch, logs }) => {
  const generatePDF = async () => {
    // هذا مثال مبسط. في تطبيق حقيقي، ستقوم بإنشاء مكون React مخفي
    // يحتوي على كل بيانات التقرير بشكل منسق ثم تحويله.
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.text(`تقرير الدفعة رقم: ${batch.id}`, 20, 20);
    pdf.text(`السلالة: ${batch.breed}`, 20, 30);
    pdf.text(`تاريخ البدء: ${new Date(batch.startDate).toLocaleDateString('ar-EG')}`, 20, 40);
    
    // ... إضافة المزيد من البيانات من logs و batch
    
    pdf.save(`report-batch-${batch.id}.pdf`);
  };

  const shareOnWhatsApp = () => {
    const totalFeed = logs.reduce((acc, log) => acc + log.feedConsumed, 0);
    const totalMortality = logs.reduce((acc, log) => acc + log.mortality, 0);
    const text = `
    🐔 تقرير سريع لدفعة #${batch.id}
    - السلالة: ${batch.breed}
    - العدد: ${batch.chickCount}
    - إجمالي العلف المستهلك: ${totalFeed.toFixed(2)} كجم
    - إجمالي النفوق: ${totalMortality}
    `;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="flex space-x-4 space-x-reverse">
      <button onClick={generatePDF} className="flex items-center space-x-2 space-x-reverse bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        <Download size={20} />
        <span>تصدير PDF</span>
      </button>
      <button onClick={shareOnWhatsApp} className="flex items-center space-x-2 space-x-reverse bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        <Share2 size={20} />
        <span>مشاركة عبر واتساب</span>
      </button>
    </div>
  );
};
