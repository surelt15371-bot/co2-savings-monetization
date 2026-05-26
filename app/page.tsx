'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ShipRecyclingCalculator } from "@/components/ship-recycling-calculator";
import { YardSummaryDashboard } from "@/components/yard-summary-dashboard";
import { Calculator, Ship, Leaf, Recycle, Gauge, Info } from "lucide-react";

export default function ShipRecyclingPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "calculator">("dashboard");

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <Ship className="size-8" />
            </div>
            <div className="p-2 bg-white/10 rounded-lg">
              <Recycle className="size-8" />
            </div>
            <div className="p-2 bg-white/10 rounded-lg">
              <Leaf className="size-8" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Unlock and Monetize CO2 and Resource Savings
          </h1>
          <p className="text-lg md:text-xl text-teal-100 max-w-3xl text-pretty">
            Quantify carbon and natural resource savings from green steel production via ship recycling 
            and explore pathways for monetization through carbon credits or circular economy incentives.
          </p>
          
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <p className="text-3xl font-bold">1.67</p>
              <p className="text-sm text-teal-100 mt-1">tCO₂ Avoided per tonne of recycled steel</p>
              <p className="text-xs text-teal-200 mt-2">Source: IEA / worldsteel</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <p className="text-3xl font-bold">$13B</p>
              <p className="text-sm text-teal-100 mt-1">Projected global ship recycling market by 2030</p>
              <p className="text-xs text-teal-200 mt-2">Source: BCC Research (2025)</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <p className="text-3xl font-bold">3×</p>
              <p className="text-sm text-teal-100 mt-1">Increase in projected recycling tonnage</p>
              <p className="text-xs text-teal-200 mt-2">Source: BIMCO (2025)</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <p className="text-3xl font-bold">95–98%</p>
              <p className="text-sm text-teal-100 mt-1">Material recovery potential</p>
              <p className="text-xs text-teal-200 mt-2">Source: Climate Catalyst & PwC India (2024)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Info Banner */}
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="py-4">
            <div className="flex gap-3">
              <Info className="size-5 text-blue-600 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="font-semibold text-blue-900">How to Use This Tool</p>
                <p className="text-sm text-blue-800">
                  <strong>Dashboard:</strong> Enter your yard's annual LDT recovery to see all CO2 and resource savings with monetization analysis • 
                  <strong> CO2 Calculator:</strong> Calculate impacts for individual ships or yard-wide operations with revenue potential
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="mb-6 flex gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "dashboard"
                ? "border-teal-600 text-teal-700 bg-teal-50"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Gauge className="size-4" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab("calculator")}
            className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "calculator"
                ? "border-teal-600 text-teal-700 bg-teal-50"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Calculator className="size-4" />
            <span>CO2 Calculator</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "dashboard" && (
            <>
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl p-6 border border-slate-700">
                <h2 className="text-2xl font-bold mb-2">Yard Summary Dashboard</h2>
                <p className="text-slate-200">
                  Enter your yard's annual LDT recovery to see comprehensive CO2 savings, resource conservation, 
                  and monetization potential. All calculations based on World Steel Association, IEA, IRENA, and peer-reviewed research.
                </p>
              </div>
              <YardSummaryDashboard />
            </>
          )}

          {activeTab === "calculator" && (
            <>
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-6 border border-teal-100">
                <h2 className="text-2xl font-bold text-teal-800 mb-2">
                  Ship Recycling CO2 and Resource Savings Calculator
                </h2>
                <p className="text-muted-foreground">
                  Calculate the environmental impact and monetization potential of recycling end-of-life vessels.
                  Adjust ship parameters, recovery rates, and carbon pricing to see real-time projections.
                </p>
              </div>
              <ShipRecyclingCalculator />
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 mt-16">
        <div className="container mx-auto px-4 py-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col justify-center min-h-[120px]">
              <h3 className="font-semibold text-white mb-3">About This Tool</h3>
              <p className="text-sm text-slate-300 italic border-l-2 border-teal-400 pl-3 whitespace-normal break-words">
                This tool has been developed as part of the Sustainable Ship Recycling Roadmap 2047 initiative to facilitate evidence-based analysis of environmental benefits, resource conservation, and decarbonisation opportunities in the ship recycling sector.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Key Sources</h3>
              <ul className="text-sm space-y-1">
                <li>International Maritime Organization (IMO)</li>
                <li>World Steel Association</li>
                <li>Recycling Europe & EUROFER</li>
                <li>NGO Shipbreaking Platform</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Regulatory Framework</h3>
              <ul className="text-sm space-y-1">
                <li>Hong Kong Convention (2025)</li>
                <li>EU Ship Recycling Regulation</li>
                <li>Basel Convention</li>
                <li>EU ETS Carbon Pricing</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
            <p>Data compiled from verified sources including IMO, World Steel Association, and peer-reviewed research.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
