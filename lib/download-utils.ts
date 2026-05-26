/**
 * Utility functions for generating and downloading reports
 */

export interface ReportData {
  title: string;
  timestamp: string;
  [key: string]: any;
}

// Dynamic imports for client-side only
let jsPDF: any;
let html2canvas: any;

const loadLibraries = async () => {
  if (typeof window === 'undefined') return;
  if (!jsPDF) {
    const jspdfModule = await import('jspdf');
    jsPDF = jspdfModule.jsPDF;
  }
  if (!html2canvas) {
    const html2canvasModule = await import('html2canvas');
    html2canvas = html2canvasModule.default;
  }
};

/**
 * Download data as JSON file
 */
export function downloadJSON(data: ReportData, filename: string = 'report') {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  downloadFile(blob, `${filename}.json`);
}

/**
 * Download data as CSV file
 */
export function downloadCSV(data: ReportData, filename: string = 'report') {
  const rows: string[] = [];
  
  // Helper function to flatten nested objects
  const flattenObject = (obj: any, prefix = ''): Record<string, any> => {
    const flattened: Record<string, any> = {};
    for (const key in obj) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (value === null || value === undefined) {
        flattened[newKey] = '';
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(flattened, flattenObject(value, newKey));
      } else if (Array.isArray(value)) {
        flattened[newKey] = JSON.stringify(value);
      } else {
        flattened[newKey] = value;
      }
    }
    return flattened;
  };

  const flatData = flattenObject(data);
  const headers = Object.keys(flatData);
  
  // Add header row
  rows.push(headers.map(h => `"${h}"`).join(','));
  
  // Add data row
  const values = headers.map(h => {
    const val = flatData[h];
    if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return `"${val}"`;
  });
  rows.push(values.join(','));
  
  const csv = rows.join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  downloadFile(blob, `${filename}.csv`);
}

/**
 * Download data as text file (human-readable format)
 */
export function downloadText(data: ReportData, filename: string = 'report') {
  let text = '';
  
  const formatValue = (value: any, indent = ''): string => {
    if (value === null || value === undefined) {
      return 'N/A';
    }
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return value.map((v, i) => `${indent}  [${i}] ${formatValue(v, indent + '  ')}`).join('\n');
      }
      return Object.entries(value)
        .map(([k, v]) => `${indent}${k}: ${formatValue(v, indent + '  ')}`)
        .join('\n');
    }
    return String(value);
  };
  
  text += `${'='.repeat(60)}\n`;
  text += `Report: ${data.title}\n`;
  text += `Generated: ${data.timestamp}\n`;
  text += `${'='.repeat(60)}\n\n`;
  
  for (const [key, value] of Object.entries(data)) {
    if (key !== 'title' && key !== 'timestamp') {
      text += `${key}:\n`;
      text += formatValue(value, '  ');
      text += '\n\n';
    }
  }
  
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
  downloadFile(blob, `${filename}.txt`);
}

/**
 * Generic file download helper
 */
function downloadFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Format currency for display
 */
export function formatCurrencyForReport(value: number): string {
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Format number for display
 */
export function formatNumberForReport(value: number, decimals = 0): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/**
 * Download HTML content as PDF
 */
export async function downloadPDF(elementId: string, filename: string = 'report.pdf') {
  await loadLibraries();
  
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found`);
    return;
  }

  try {
    // Create canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      backgroundColor: '#ffffff',
    });

    // Calculate PDF dimensions
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Add pages
    while (heightLeft >= 0) {
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      if (heightLeft > 0) {
        pdf.addPage();
        position = -imgHeight + pageHeight;
      }
    }

    // Download PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}

/**
 * Download JSON report as PDF (text-based) with professional formatting
 */
export async function downloadJSONAsPDF(data: ReportData, filename: string = 'report.pdf') {
  await loadLibraries();
  
  const pdf = new jsPDF();
  let yPosition = 15;
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const maxWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
  const reportDate = new Date(data.timestamp).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Color scheme (matching the app theme)
  const primaryColor = [22, 163, 74];    // emerald-600
  const secondaryColor = [13, 148, 136]; // teal-700
  const accentColor = [96, 125, 139];    // slate-600
  const lightGray = [241, 245, 249];     // slate-100
  const darkGray = [30, 41, 59];         // slate-800
  const textColor = [51, 65, 85];        // slate-700

  // Helper function to check if we need a new page
  const checkPageBreak = (needed: number = 10) => {
    if (yPosition + needed > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Helper function to add a heading
  const addHeading = (text: string, level: 1 | 2 | 3 = 1) => {
    checkPageBreak(12);
    
    if (level === 1) {
      pdf.setFontSize(16);
      pdf.setTextColor(...primaryColor);
      pdf.setFont(undefined, 'bold');
    } else if (level === 2) {
      pdf.setFontSize(13);
      pdf.setTextColor(...secondaryColor);
      pdf.setFont(undefined, 'bold');
    } else {
      pdf.setFontSize(11);
      pdf.setTextColor(...accentColor);
      pdf.setFont(undefined, 'bold');
    }
    
    pdf.text(text, margin, yPosition);
    yPosition += level === 1 ? 12 : 8;
    
    if (level === 1) {
      pdf.setDrawColor(...primaryColor);
      pdf.setLineWidth(0.5);
      pdf.line(margin, yPosition - 2, margin + 80, yPosition - 2);
    }
  };

  // Helper function to add body text
  const addText = (text: string, indent: number = 0) => {
    pdf.setFontSize(10);
    pdf.setTextColor(...textColor);
    pdf.setFont(undefined, 'normal');
    const wrappedText = pdf.splitTextToSize(text, maxWidth - indent);
    pdf.text(wrappedText, margin + indent, yPosition);
    yPosition += wrappedText.length * 5 + 2;
  };

  // Helper function to add a labeled value
  const addLabeledValue = (label: string, value: string) => {
    checkPageBreak(6);
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(...accentColor);
    pdf.text(label, margin + 5, yPosition);
    pdf.setTextColor(...darkGray);
    pdf.setFont(undefined, 'bold');
    pdf.text(value, margin + 60, yPosition);
    yPosition += 6;
  };

  // Helper function to format values for display
  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'number') {
      if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
      if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
      return value.toFixed(2);
    }
    if (typeof value === 'object') {
      return Object.entries(value)
        .map(([k, v]) => `${k}: ${formatValue(v)}`)
        .join(' | ');
    }
    return String(value);
  };

  // ============================================================
  // HEADER SECTION
  // ============================================================
  
  // Add colored header background
  pdf.setFillColor(...primaryColor);
  pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 35, 'F');
  
  // Add title in header
  pdf.setFontSize(24);
  pdf.setTextColor(255, 255, 255);
  pdf.setFont(undefined, 'bold');
  pdf.text(data.title || 'Report', margin, 15);
  
  // Add timestamp in header
  pdf.setFontSize(10);
  pdf.setTextColor(255, 255, 255);
  pdf.setFont(undefined, 'normal');
  pdf.text(`Generated: ${reportDate}`, margin, 28);
  
  yPosition = 40;

  // ============================================================
  // EXECUTIVE SUMMARY SECTION
  // ============================================================
  
  // Add summary box
  pdf.setFillColor(...lightGray);
  pdf.rect(margin - 2, yPosition - 2, maxWidth + 4, 18, 'F');
  pdf.setFontSize(11);
  pdf.setTextColor(...secondaryColor);
  pdf.setFont(undefined, 'bold');
  pdf.text('Executive Summary', margin + 2, yPosition + 3);
  
  yPosition += 20;
  
  // Extract and summarize key metrics
  const summaryKeys = ['steelRecovered', 'co2Saved', 'totalRevenue', 'CO2 Savings', 'Steel Recovered'];
  let summaryText = 'This report presents a comprehensive analysis of ship recycling impacts and monetization potential. ';
  
  for (const key of summaryKeys) {
    if (data[key] !== undefined) {
      const value = formatValue(data[key]);
      summaryText += `${key.replace(/([A-Z])/g, ' $1')}: ${value}. `;
    }
  }
  
  const summaryLines = pdf.splitTextToSize(summaryText, maxWidth - 4);
  pdf.setFontSize(10);
  pdf.setTextColor(...textColor);
  pdf.setFont(undefined, 'normal');
  pdf.text(summaryLines, margin + 2, yPosition);
  yPosition += summaryLines.length * 5 + 6;

  // ============================================================
  // DETAILED RESULTS SECTION
  // ============================================================
  
  addHeading('Detailed Results', 2);

  // Create a table-like structure for key results
  const rows: Array<[string, string]> = [];
  for (const [key, value] of Object.entries(data)) {
    if (key !== 'title' && key !== 'timestamp' && typeof value !== 'object') {
      const displayKey = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (char) => char.toUpperCase());
      const displayValue = formatValue(value);
      rows.push([displayKey, displayValue]);
    }
  }

  // Add table rows with alternating backgrounds
  let rowIndex = 0;
  for (const [label, value] of rows) {
    checkPageBreak(6);
    
    // Alternating row background
    if (rowIndex % 2 === 0) {
      pdf.setFillColor(245, 250, 250);
      pdf.rect(margin - 1, yPosition - 4, maxWidth + 2, 6, 'F');
    }
    
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(...accentColor);
    const truncatedLabel = label.length > 40 ? label.substring(0, 37) + '...' : label;
    pdf.text(truncatedLabel, margin + 2, yPosition);
    
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(...darkGray);
    pdf.text(value, margin + 90, yPosition);
    
    // Add bottom border
    pdf.setDrawColor(220, 225, 230);
    pdf.setLineWidth(0.1);
    pdf.line(margin - 1, yPosition + 1, margin + maxWidth + 1, yPosition + 1);
    
    yPosition += 6;
    rowIndex++;
  }

  // ============================================================
  // NESTED OBJECTS SECTION
  // ============================================================
  
  let hasNestedObjects = false;
  for (const [key, value] of Object.entries(data)) {
    if (key !== 'title' && key !== 'timestamp' && typeof value === 'object' && value !== null) {
      hasNestedObjects = true;
      checkPageBreak(15);
      
      addHeading(key.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase()), 2);
      
      // Add nested object details
      for (const [subKey, subValue] of Object.entries(value)) {
        if (subValue !== null && subValue !== undefined) {
          checkPageBreak(5);
          const displayKey = subKey
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (char) => char.toUpperCase());
          const displayValue = formatValue(subValue);
          addLabeledValue(displayKey, displayValue);
        }
      }
      
      yPosition += 4;
    }
  }

  // ============================================================
  // FOOTER SECTION
  // ============================================================
  
  checkPageBreak(15);
  
  pdf.setFontSize(10);
  pdf.setTextColor(...accentColor);
  pdf.setFont(undefined, 'italic');
  
  const footerText = 'This report was generated by the CO₂ Savings and Monetization Tool, developed as part of the Sustainable Ship Recycling Roadmap 2047 initiative. All calculations are based on peer-reviewed research and verified academic sources.';
  const footerLines = pdf.splitTextToSize(footerText, maxWidth - 4);
  pdf.text(footerLines, margin + 2, yPosition);
  
  yPosition += footerLines.length * 5 + 8;

  // Add bottom border and page numbers
  const totalPages = pdf.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setDrawColor(...primaryColor);
    pdf.setLineWidth(0.5);
    pdf.line(margin, pageHeight - 10, margin + maxWidth, pageHeight - 10);
    
    pdf.setFontSize(9);
    pdf.setTextColor(...accentColor);
    pdf.text(`Page ${i} of ${totalPages}`, margin + maxWidth - 30, pageHeight - 5);
  }

  pdf.save(filename);
}

