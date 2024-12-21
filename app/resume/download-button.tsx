"use client";

import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
        console.error("Content element not found");
        return;
      }

      // Create canvas with proper A4 dimensions
      const canvas = await html2canvas(element, {
        scale: 2, // Higher resolution
        useCORS: true,
        logging: false,
        width: 793, // A4 width in pixels at 96 DPI
        height: 1122, // A4 height in pixels at 96 DPI
        backgroundColor: "#ffffff",
      });

      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        format: "a4",
        unit: "mm",
      });

      // Add image to PDF maintaining A4 dimensions
      pdf.addImage(
        canvas.toDataURL("image/jpeg", 1.0),
        "JPEG",
        0,
        0,
        210, // A4 width in mm
        297 // A4 height in mm
      );

      // Save the PDF
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <button
      onClick={downloadPDF}
      className="fixed top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transition-colors duration-200"
    >
      Download PDF
    </button>
  );
}
