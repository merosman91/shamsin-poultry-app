import jsPDF from 'jspdf';
import { Download, Share2 } from 'lucide-react';

export const ReportGenerator = ({ batch, logs }) => {
  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.text(`تقرير الدفعة رقم: ${batch.id}`, 20, 20);
    pdf.text(`السلالة: ${batch.breed}`, 20, 30);
    pdf.text(`تاريخ البدء: ${new Date(batch.startDate).toLocaleDateString('ar-EG')}`, 20, 40);
    pdf.save(`report-batch-${batch.id}.pdf`);
  };

  const shareOnWhatsApp = () => {
    const totalFeed = logs.reduce((acc, log) => acc + log.feedConsumed, 0);
    const totalMortality = logs.reduce((acc, log) => acc + log.mortality, 0);
    const text = `🐔 تقرير دفعة #${batch.id}\n- السلالة: ${batch.breed}\n- العدد: ${batch.chickCount}\n- إجمالي العلف: ${totalFeed.toFixed(2)} كجم\n- إجمالي النفوق: ${totalMortality}`;
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
