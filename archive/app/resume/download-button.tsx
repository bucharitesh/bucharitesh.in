'use client';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface DownloadButtonProps {
  contentId: string;
  fileName: string;
}

export default function DownloadButton({
  contentId,
  fileName,
}: DownloadButtonProps) {
  const downloadPDF = async () => {
    try {
      const element = document.getElementById(contentId);
      if (!element) {
        console.error('Content element not found');
        return;
      }

      // Create a clone of the element
      const clone = element.cloneNode(true) as HTMLElement;

      // Create a temporary container with desktop styles
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      document.body.appendChild(container);

      // Apply desktop styles to clone
      clone.style.width = '793px'; // A4 width in pixels
      clone.style.height = '1122px'; // A4 height in pixels
      clone.style.padding = '32px'; // Equivalent to p-8
      clone.style.display = 'block';

      // Remove any mobile-specific classes and add desktop classes
      clone.classList.remove('grid-cols-1');
      clone.querySelector('.grid')?.classList.remove('grid-cols-1');
      clone.querySelector('.grid')?.classList.add('grid-cols-5');

      // Add clone to temporary container
      container.appendChild(clone);

      // Create canvas with proper A4 dimensions
      const canvas = await html2canvas(clone, {
        scale: 2, // Higher resolution
        useCORS: true,
        logging: false,
        width: 793, // A4 width in pixels at 96 DPI
        height: 1122, // A4 height in pixels at 96 DPI
        backgroundColor: '#ffffff',
      });

      // Remove temporary container
      document.body.removeChild(container);

      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        format: 'a4',
        unit: 'mm',
      });

      // Add image to PDF maintaining A4 dimensions
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        0,
        0,
        210, // A4 width in mm
        297 // A4 height in mm
      );

      // Save the PDF
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <button
      onClick={downloadPDF}
      className="fixed top-12 right-4 z-40 hidden rounded-sm bg-blue-500 px-4 py-2 font-bold text-white shadow-lg transition-colors duration-200 hover:bg-blue-700 md:block lg:top-12"
    >
      Download PDF
    </button>
  );
}
