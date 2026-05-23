'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, ExternalLink, BookOpen } from 'lucide-react';

export function ResearchChapterLazy() {
  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="size-5" />
            Research Chapter: Green Steel from Ship Recycling
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Comprehensive Chapter Available</h3>
            <p className="text-sm text-blue-800 mb-4">
              This section contains a detailed academic chapter covering:
            </p>
            <ul className="text-sm text-blue-800 space-y-2 mb-4">
              <li>• Abstract and introduction with literature review</li>
              <li>• India's ship recycling industry overview</li>
              <li>• CO2 quantification methodology with worked examples</li>
              <li>• Natural resource savings calculations</li>
              <li>• Regulatory framework (HKC, Basel, EU SRR, Indian regulations)</li>
              <li>• Five monetization pathways with detailed analysis</li>
              <li>• Implementation guidance for recyclers, steel producers, and policymakers</li>
              <li>• Case studies with full VLCC calculations</li>
              <li>• 38 academic references organized by category</li>
            </ul>
            <div className="flex gap-3 flex-wrap">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Download className="size-4" />
                Download as Markdown
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition">
                <ExternalLink className="size-4" />
                View Full Content
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-slate-50 rounded-lg border">
              <h4 className="font-semibold text-slate-800 mb-2">CO2 Emissions Data</h4>
              <p className="text-sm text-slate-600">BF-BOF: 2.2-2.54 tCO2/tonne steel | EAF: 0.3-0.5 tCO2/tonne steel | Savings: 1.6-2.2 tCO2/tonne</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border">
              <h4 className="font-semibold text-slate-800 mb-2">Resource Conservation</h4>
              <p className="text-sm text-slate-600">Iron ore: 1.4 t/t | Coal: 0.74 t/t | Limestone: 0.12 t/t | Energy: 74% reduction</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border">
              <h4 className="font-semibold text-slate-800 mb-2">Market Opportunities</h4>
              <p className="text-sm text-slate-600">Carbon credits: $2-15/tCO2e | Green steel premium: $30-100/tonne | Circular incentives: $10-50/tonne</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border">
              <h4 className="font-semibold text-slate-800 mb-2">India Market Size</h4>
              <p className="text-sm text-slate-600">Alang capacity: 4.5M LDT | 183 active yards | Market value: $3B+ by 2030</p>
            </div>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs text-amber-800">
              <strong>Note:</strong> The full research chapter with complete data, citations, and analysis is available. 
              This preview shows key statistics. Download the markdown version or view full content for detailed academic chapter.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
