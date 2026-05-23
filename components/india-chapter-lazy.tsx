'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, ExternalLink, FileText } from 'lucide-react';

export function IndiaChapterLazy() {
  return (
    <div className="space-y-6">
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            India Guidance Document: Ship Recycling for Green Steel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
            <h3 className="font-semibold text-emerald-900 mb-3">Comprehensive India-Specific Guidance</h3>
            <p className="text-sm text-emerald-800 mb-4">
              This document contains country-specific analysis for India's ship recycling industry at Alang:
            </p>
            <ul className="text-sm text-emerald-800 space-y-2 mb-4">
              <li>• Executive summary of India's market potential</li>
              <li>• Alang industry overview: 4.5M LDT capacity, 183 yards, 112 HKC-compliant</li>
              <li>• CO2 quantification methodology adapted for India grid mix</li>
              <li>• Natural resource savings per tonne recycled (WSA data)</li>
              <li>• India regulatory framework: HKC, Recycling of Ships Act 2019, India CCTS</li>
              <li>• Monetization pathways: Carbon credits, green steel premium, circular economy incentives</li>
              <li>• Implementation guidance for Indian recyclers and steel producers</li>
              <li>• Case study: VLCC calculations with India-specific carbon prices</li>
              <li>• Market projections through 2040</li>
            </ul>
            <div className="flex gap-3 flex-wrap">
              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                <Download className="size-4" />
                Download for India
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition">
                <ExternalLink className="size-4" />
                View Full Document
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-800 mb-2">Alang Market Data</h4>
              <p className="text-sm text-emerald-700">Annual capacity: 4.5M LDT | Yards: 183 | HKC compliant: 112 | Employment: ~25,000 jobs</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-800 mb-2">CO2 Savings (India)</h4>
              <p className="text-sm text-emerald-700">Per tonne steel: 1.6-1.8 tCO2e | Annual at 4.5M LDT: 7.2-8.1M tonnes CO2 avoided</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-800 mb-2">India CCTS Carbon Price</h4>
              <p className="text-sm text-emerald-700">Range: ₹500-700/tonne ($6-8 USD equivalent) | Market growing 15-20% annually</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-800 mb-2">Regulatory References</h4>
              <p className="text-sm text-emerald-700">HKC 2025 | Recycling of Ships Act 2019 | Basel Convention | Ministry of Power Guidelines</p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Data Sources:</strong> CareEdge 2024a/b, Gujarat Maritime Board, Dr. Joshua Ebenezer (NuCov 2024), 
              Mayank Mishra research, World Steel Association, IEA, IRENA
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
