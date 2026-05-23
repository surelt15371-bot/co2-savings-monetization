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
 * Download JSON report as PDF (text-based)
 */
export async function downloadJSONAsPDF(data: ReportData, filename: string = 'report.pdf') {
  await loadLibraries();
  
  const pdf = new jsPDF();
  let yPosition = 10;
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const maxWidth = pdf.internal.pageSize.getWidth() - 2 * margin;

  // Add title
  pdf.setFontSize(16);
  pdf.text(data.title, margin, yPosition);
  yPosition += 10;

  // Add timestamp
  pdf.setFontSize(10);
  pdf.setTextColor(100);
  pdf.text(`Generated: ${new Date(data.timestamp).toLocaleString()}`, margin, yPosition);
  yPosition += 8;

  // Add content
  pdf.setFontSize(11);
  pdf.setTextColor(0);

  const formatValue = (key: string, value: any): string[] => {
    const lines: string[] = [];
    if (typeof value === 'object' && value !== null) {
      lines.push(`${key}:`);
      for (const [k, v] of Object.entries(value)) {
        const formattedLines = formatValue(`  ${k}`, v);
        lines.push(...formattedLines);
      }
    } else {
      lines.push(`${key}: ${value}`);
    }
    return lines;
  };

  for (const [key, value] of Object.entries(data)) {
    if (key !== 'title' && key !== 'timestamp') {
      const lines = formatValue(key, value);
      for (const line of lines) {
        if (yPosition > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += 6;
      }
      yPosition += 4; // Extra space between sections
    }
  }

  pdf.save(filename);
}

