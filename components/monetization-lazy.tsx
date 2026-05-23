'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Download, DollarSign } from 'lucide-react';

export function MonetizationLazy() {
  return (
    <div className="space-y-6">
      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="size-5" />
            Monetization Pathways for Ship Recycling CO2 Savings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="font-semibold text-amber-900 mb-3">Five Revenue Pathways</h3>
            <p className="text-sm text-amber-800 mb-4">
              Maximize earnings from ship recycling through multiple monetization channels:
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border-2 border-cyan-300">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-blue-900">1. Verified Carbon Credits (VCM)</h4>
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded">PRIMARY</span>
              </div>
              <p className="text-sm text-blue-800 mb-2">1.6-1.8 tCO2/tonne steel × $2-11/tCO2 = $3.20-19.80/tonne recycled</p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Standards: VCS, Gold Standard, Verra</li>
                <li>• Market: $2-5B by 2030</li>
                <li>• Timeline: 6-12 months to issue</li>
              </ul>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-green-900">2. Compliance Carbon Market</h4>
                <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded">GROWING</span>
              </div>
              <p className="text-sm text-green-800 mb-2">EU ETS: €80-120/tonne | India CCTS: ₹500-700/tonne | FY2030+ expansion</p>
              <ul className="text-xs text-green-700 space-y-1">
                <li>• EU scheme expanding to maritime</li>
                <li>• India CCTS market doubling annually</li>
                <li>• Direct government/corporate buyers</li>
              </ul>
            </div>

            <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-300">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-orange-900">3. Green Steel Premium</h4>
                <span className="text-xs font-bold text-orange-700 bg-orange-100 px-2 py-1 rounded">EXPANDING</span>
              </div>
              <p className="text-sm text-orange-800 mb-2">Market incentive: $30-100/tonne recycled steel (2-5% price premium)</p>
              <ul className="text-xs text-orange-700 space-y-1">
                <li>• Buyers: Auto, construction, renewable industries</li>
                <li>• Certification: SteelZero, Science Based Targets</li>
                <li>• Demand: Growing 15-20% annually</li>
              </ul>
            </div>

            <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg border-2 border-pink-300">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-rose-900">4. Circular Economy Incentives</h4>
                <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-1 rounded">NEW</span>
              </div>
              <p className="text-sm text-rose-800 mb-2">Government programs: $10-50/tonne | EPR schemes, waste credits, tax benefits</p>
              <ul className="text-xs text-rose-700 space-y-1">
                <li>• India PRB, EU EPR schemes</li>
                <li>• RECs + ITC bundling</li>
                <li>• Infrastructure funding</li>
              </ul>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg border-2 border-purple-300">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-purple-900">5. Integrated Revenue Model</h4>
                <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">OPTIMAL</span>
              </div>
              <p className="text-sm text-purple-800 mb-2">Combined: $50-170/tonne (5-8x higher than scrap value alone)</p>
              <ul className="text-xs text-purple-700 space-y-1">
                <li>• Stack multiple revenue streams</li>
                <li>• Verified + Compliance + Premium + Incentives</li>
                <li>• Example: 100,000 LDT yard = $5-17M annual</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-slate-900 text-white rounded-lg">
            <h4 className="flex items-center gap-2 font-semibold mb-4 text-lg">
              <DollarSign className="size-5" />
              Revenue Projection: 100,000 LDT/Year Yard
            </h4>
            <div className="grid gap-3 text-sm">
              <div className="flex justify-between pb-2 border-b border-slate-700">
                <span>Carbon Credits (1.6 tCO2/t × $8/tCO2 × 88% recovery)</span>
                <span className="font-semibold text-green-400">$1,120,000</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-700">
                <span>Green Steel Premium ($40/t × 88,000 t)</span>
                <span className="font-semibold text-green-400">$3,520,000</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-700">
                <span>Circular Incentives ($15/t × 88,000 t)</span>
                <span className="font-semibold text-green-400">$1,320,000</span>
              </div>
              <div className="flex justify-between pt-2 text-lg">
                <span className="font-bold">Total Annual Revenue</span>
                <span className="font-bold text-green-300">$5,960,000</span>
              </div>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition font-semibold">
            <Download className="size-4" />
            Download Monetization Analysis
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
