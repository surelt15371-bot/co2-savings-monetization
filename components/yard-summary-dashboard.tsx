'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, TrendingUp, Leaf, Zap, Droplets, DollarSign, Gauge, Lightbulb, Download, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { downloadJSONAsPDF } from '@/lib/download-utils';

interface YardMetrics {
  annualLDT: number;
  steelRecoveryRate: number;
  carbonCreditPrice: number;
  greenSteelPremium: number;
  circularIncentive?: number;
}

interface CalculatedResults {
  steelRecovered: number;
  co2Saved: number;
  co2SavedMonetary: number;
  ironOreSaved: number;
  coalSaved: number;
  limestoneSaved: number;
  energySaved: number;
  waterSaved: number;
  greenSteelRevenue: number;
  totalRevenue: number;
  jobsSupported: number;
  equivalents: {
    carMilesDriven: number;
    flightsNYLondon: number;
    homesElectrified: number;
    treesEquivalent: number;
  };
}

// Academic Constants from References
const ACADEMIC_VALUES = {
  CO2_SAVED_PER_TONNE: 1.67,      // World Steel Association 2022 average
  HILLMAN_CO2_SAVE: 1.5,           // Hillman et al. 2015 Nordic average
  CHOI_CO2_SAVE: 1.6,              // Choi et al. 2016 calculated
  TAYLOR_CO2_PER_LDT: 1.5,         // Taylan 2013
  
  // Resource Savings per tonne of steel (World Steel Association)
  IRON_ORE_SAVED: 1.4,             // tonnes/tonne steel
  COAL_SAVED: 0.74,                // tonnes/tonne steel (740 kg)
  LIMESTONE_SAVED: 0.12,           // tonnes/tonne steel (120 kg)
  
  // Energy & Water (IEA, IRENA, WSA)
  ENERGY_SAVED_PER_TONNE: 2.3,     // GJ/tonne (14 MJ/kg BF-BOF vs 11.7 MJ/kg EAF)
  ENERGY_PERCENT_REDUCTION: 0.74,  // 74% energy reduction
  WATER_SAVED_PER_TONNE: 20.1,     // m³/tonne (28.6 - 8.5)
  
  // Default Recovery Rate (Gulia et al. 2023, CareEdge 2024)
  DEFAULT_RECOVERY_RATE: 0.88,     // 88% average material recovery
  
  // Jobs & Industry (JICA 2016, ILO 2019)
  JOBS_PER_10000_TONNES: 25,       // Employment ratio in ship recycling
};

// Emissions Equivalents Calculations
const EQUIVALENTS = {
  CAR_CO2_PER_KM: 0.21,            // kg CO2 per km (average passenger car)
  FLIGHT_CO2_PER_TRIP: 0.92,       // tonnes CO2 per NY-London flight
  HOME_CO2_ANNUAL: 4.6,            // tonnes CO2 per home per year (US average)
  TREE_CO2_PER_YEAR: 0.021,        // tonnes CO2 sequestered per tree per year
};

export function YardSummaryDashboard() {
  const [metrics, setMetrics] = useState<YardMetrics>({
    annualLDT: 100,
    steelRecoveryRate: 88,
    carbonCreditPrice: 8,
    greenSteelPremium: 50,
    circularIncentive: 10,
  });

  const [results, setResults] = useState<CalculatedResults | null>(null);

  // Calculate all results based on input
  const handleCalculate = () => {
    const annualLDT = metrics.annualLDT;
    const recoveryRate = metrics.steelRecoveryRate / 100;
    const carbonCreditPrice = metrics.carbonCreditPrice;
    const greenSteelPremium = metrics.greenSteelPremium;

    // Steel recovery (assuming 75kg steel per 1000 LDT average)
    const steelRecovered = (annualLDT * 1000 * 0.75 * recoveryRate);

    // CO2 Savings (using World Steel Association 2022 average: 1.67 tCO2 per tonne)
    const co2Saved = steelRecovered * ACADEMIC_VALUES.CO2_SAVED_PER_TONNE;
    const co2SavedMonetary = co2Saved * carbonCreditPrice;

    // Resource Savings (per tonne of steel, World Steel Association)
    const ironOreSaved = steelRecovered * ACADEMIC_VALUES.IRON_ORE_SAVED;
    const coalSaved = steelRecovered * ACADEMIC_VALUES.COAL_SAVED;
    const limestoneSaved = steelRecovered * ACADEMIC_VALUES.LIMESTONE_SAVED;

    // Energy and Water (IEA, IRENA)
    const energySaved = steelRecovered * ACADEMIC_VALUES.ENERGY_SAVED_PER_TONNE; // GJ
    const waterSaved = steelRecovered * ACADEMIC_VALUES.WATER_SAVED_PER_TONNE; // m³

    // Revenue
    const greenSteelRevenue = steelRecovered * (greenSteelPremium / 1000); // $/kg to $/tonne
    const totalRevenue = co2SavedMonetary + greenSteelRevenue;

    // Jobs (JICA 2016: 25 jobs per 10,000 tonnes recycled)
    const jobsSupported = Math.round((annualLDT / 10) * ACADEMIC_VALUES.JOBS_PER_10000_TONNES);

    // Equivalents
    const carMilesDriven = Math.round((co2Saved * 1000) / EQUIVALENTS.CAR_CO2_PER_KM);
    const flightsNYLondon = Math.round(co2Saved / EQUIVALENTS.FLIGHT_CO2_PER_TRIP);
    const homesElectrified = Math.round(co2Saved / EQUIVALENTS.HOME_CO2_ANNUAL);
    const treesEquivalent = Math.round(co2Saved / EQUIVALENTS.TREE_CO2_PER_YEAR);

    setResults({
      steelRecovered,
      co2Saved,
      co2SavedMonetary,
      ironOreSaved,
      coalSaved,
      limestoneSaved,
      energySaved,
      waterSaved,
      greenSteelRevenue,
      totalRevenue,
      jobsSupported,
      equivalents: {
        carMilesDriven,
        flightsNYLondon,
        homesElectrified,
        treesEquivalent,
      },
    });
  };

  // Initial calculation on mount
  useEffect(() => {
    handleCalculate();
  }, []);

  const chartData = results ? [
    { name: 'Carbon Credits', value: results.co2SavedMonetary, fill: '#10b981' },
    { name: 'Green Steel Premium', value: results.greenSteelRevenue, fill: '#0891b2' },
  ] : [];

  const resourceData = results ? [
    { name: 'Iron Ore', value: Math.round(results.ironOreSaved), unit: 'tonnes' },
    { name: 'Coal', value: Math.round(results.coalSaved), unit: 'tonnes' },
    { name: 'Limestone', value: Math.round(results.limestoneSaved), unit: 'tonnes' },
  ] : [];

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="size-5 text-teal-600" />
            Yard Input Parameters
          </CardTitle>
          <CardDescription>
            Enter your yard&apos;s annual recycling capacity and market parameters. All calculations based on World Steel Association, IEA, IRENA, and peer-reviewed research.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Academic Foundation:</strong> CO2 savings: 1.67 tCO2/tonne (WSA 2022) | Resource savings: WSA LCI Study | Energy: IEA | Water: WSA | Jobs: JICA 2016
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Annual LDT (Lightweight Tonnage) Recovered
              </label>
              <Input
                type="number"
                value={metrics.annualLDT}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  setMetrics({ ...metrics, annualLDT: val });
                  setTimeout(handleCalculate, 0);
                }}
                placeholder="e.g., 100 (thousand LDT)"
                className="text-lg"
              />
              <p className="text-xs text-slate-500">in thousands of tonnes</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Material Recovery Rate (%)
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={metrics.steelRecoveryRate}
                  onChange={(e) => {
                    const val = Math.min(100, Math.max(0, parseFloat(e.target.value) || 0));
                    setMetrics({ ...metrics, steelRecoveryRate: val });
                    setTimeout(handleCalculate, 0);
                  }}
                  placeholder="e.g., 88"
                  className="text-lg"
                />
                <span className="text-slate-600">%</span>
              </div>
              <p className="text-xs text-slate-500">Industry average: 88% (Gulia et al. 2023)</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Carbon Credit Price ($/tCO2e)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">$</span>
                <Input
                  type="number"
                  value={metrics.carbonCreditPrice}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value) || 0;
                    setMetrics({ ...metrics, carbonCreditPrice: val });
                    setTimeout(handleCalculate, 0);
                  }}
                  placeholder="e.g., 8"
                  className="text-lg"
                />
              </div>
              <p className="text-xs text-slate-500">Market range: $2-15/tCO2e</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Green Steel Premium ($/tonne)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">$</span>
                <Input
                  type="number"
                  value={metrics.greenSteelPremium}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value) || 0;
                    setMetrics({ ...metrics, greenSteelPremium: val });
                    setTimeout(handleCalculate, 0);
                  }}
                  placeholder="e.g., 50"
                  className="text-lg"
                />
              </div>
              <p className="text-xs text-slate-500">Emerging market incentive: $30-100</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Circular Incentive ($/tonne)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">$</span>
                <Input
                  type="number"
                  value={metrics.circularIncentive || 10}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value) || 0;
                    setMetrics({ ...metrics, circularIncentive: val });
                    setTimeout(handleCalculate, 0);
                  }}
                  placeholder="e.g., 10"
                  className="text-lg"
                />
              </div>
              <p className="text-xs text-slate-500">Government incentives: $5-20</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      {results && (
        <>
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Steel Recovered</p>
                    <p className="text-2xl font-bold text-emerald-700">
                      {(results.steelRecovered / 1000).toFixed(1)}K
                    </p>
                    <p className="text-xs text-slate-500 mt-1">tonnes</p>
                  </div>
                  <TrendingUp className="size-8 text-emerald-600 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">CO2 Saved</p>
                    <p className="text-2xl font-bold text-green-700">
                      {(results.co2Saved / 1000).toFixed(1)}K
                    </p>
                    <p className="text-xs text-slate-500 mt-1">tonnes CO2e</p>
                  </div>
                  <Leaf className="size-8 text-green-600 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Total Revenue</p>
                    <p className="text-2xl font-bold text-blue-700">
                      ${(results.totalRevenue / 1_000_000).toFixed(2)}M
                    </p>
                    <p className="text-xs text-slate-500 mt-1">annual</p>
                  </div>
                  <DollarSign className="size-8 text-blue-600 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Jobs Supported</p>
                    <p className="text-2xl font-bold text-orange-700">
                      {results.jobsSupported}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">FTE positions</p>
                  </div>
                  <Lightbulb className="size-8 text-orange-600 opacity-20" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Download Report Section */}
          <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="size-5" />
                Export Dashboard Report
              </CardTitle>
              <CardDescription>Download the current yard analysis results as PDF</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => {
                  const reportData = {
                    title: "Yard Summary Dashboard Report",
                    timestamp: new Date().toISOString(),
                    yardInputs: {
                      annualLDT: `${metrics.annualLDT}K tonnes`,
                      materialRecoveryRate: `${metrics.steelRecoveryRate}%`,
                      carbonCreditPrice: `$${metrics.carbonCreditPrice}/tCO2e`,
                      greenSteelPremium: `$${metrics.greenSteelPremium}/tonne`,
                      circularIncentive: `$${metrics.circularIncentive || 10}/tonne`,
                    },
                    keyMetrics: {
                      steelRecovered: `${(results?.steelRecovered || 0) / 1000} thousand tonnes`,
                      co2Saved: `${((results?.co2Saved || 0) / 1000).toFixed(1)}K tonnes CO2e`,
                      totalRevenue: `$${(((results?.co2Saved || 0) * metrics.carbonCreditPrice + (results?.steelRecovered || 0) * (metrics.greenSteelPremium / 1000) + (results?.steelRecovered || 0) * ((metrics.circularIncentive || 10) / 1000)) / 1_000_000).toFixed(2)}M`,
                      jobsSupported: results?.jobsSupported || 0,
                    },
                    resourceSavings: {
                      ironOre: `${((results?.ironOreSaved || 0) / 1000).toFixed(1)}K tonnes`,
                      coal: `${((results?.coalSaved || 0) / 1000).toFixed(1)}K tonnes`,
                      water: `${((results?.waterSaved || 0) / 1_000_000).toFixed(2)}M m³`,
                    },
                    revenueBreakdown: {
                      carbonCredits: `$${(((results?.co2Saved || 0) * metrics.carbonCreditPrice) / 1_000_000).toFixed(2)}M`,
                      greenSteelPremium: `$${(((results?.steelRecovered || 0) * (metrics.greenSteelPremium / 1000)) / 1_000_000).toFixed(2)}M`,
                      circularIncentives: `$${(((results?.steelRecovered || 0) * ((metrics.circularIncentive || 10) / 1000)) / 1_000_000).toFixed(2)}M`,
                      total: `$${(((results?.co2Saved || 0) * metrics.carbonCreditPrice + (results?.steelRecovered || 0) * (metrics.greenSteelPremium / 1000) + (results?.steelRecovered || 0) * ((metrics.circularIncentive || 10) / 1000)) / 1_000_000).toFixed(2)}M`,
                    },
                  };
                  downloadJSONAsPDF(reportData, `yard-dashboard-${new Date().getTime()}.pdf`);
                }}
                className="flex items-center gap-2"
              >
                <Download className="size-4" />
                Download as PDF
              </Button>
            </CardContent>
          </Card>

          {/* Detailed Results Tabs */}
          <Tabs defaultValue="emissions" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="emissions">Emissions</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="equivalents">Equivalents</TabsTrigger>
              <TabsTrigger value="monetization">Monetization</TabsTrigger>
            </TabsList>

            <TabsContent value="emissions" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Revenue Breakdown</CardTitle>
                    <CardDescription>
                      Carbon Credits vs Green Steel Premium (WSA 2022 baseline)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: $${(value / 1_000_000).toFixed(1)}M`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${(value / 1_000_000).toFixed(2)}M`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">CO2 Savings Details</CardTitle>
                    <CardDescription>
                      Based on 1.67 tCO2/tonne steel (WSA 2022)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-slate-600">Total CO2 Saved</span>
                      <span className="font-bold text-lg">{(results.co2Saved / 1000).toFixed(1)}K tonnes</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-slate-600">Carbon Credit Value (@${metrics.carbonCreditPrice}/tCO2e)</span>
                      <span className="font-bold text-lg text-green-600">${(results.co2SavedMonetary / 1_000_000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-slate-600">Green Steel Revenue (@${metrics.greenSteelPremium}/t)</span>
                      <span className="font-bold text-lg text-blue-600">${(results.greenSteelRevenue / 1_000_000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 bg-slate-50 p-2 rounded">
                      <span className="text-sm font-semibold text-slate-700">Total Annual Revenue</span>
                      <span className="font-bold text-lg text-teal-600">${(results.totalRevenue / 1_000_000).toFixed(2)}M</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-4 pt-4 border-t">
                      <strong>Source Citation:</strong> CO2 savings based on World Steel Association 2022 LCI study comparing BF-BOF (2.2 tCO2/t) vs EAF (0.53 tCO2/t average)
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Raw Material Savings</CardTitle>
                    <CardDescription>
                      Per tonne steel recycled vs virgin production (WSA LCI)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={resourceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${value} tonnes`} />
                        <Bar dataKey="value" fill="#0891b2" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Resource & Energy Savings</CardTitle>
                    <CardDescription>
                      Annual savings from {metrics.annualLDT}K LDT recovered
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-slate-600">Iron Ore Saved</span>
                      <span className="font-bold">{(results.ironOreSaved / 1000).toFixed(1)}K tonnes</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-slate-600">Coal Saved</span>
                      <span className="font-bold">{(results.coalSaved / 1000).toFixed(1)}K tonnes</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-slate-600">Limestone Saved</span>
                      <span className="font-bold">{(results.limestoneSaved / 1000).toFixed(1)}K tonnes</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-slate-600">Energy Saved</span>
                      <span className="font-bold">{(results.energySaved / 1000).toFixed(1)}K GJ</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 bg-slate-50 p-2 rounded">
                      <span className="text-sm font-semibold text-slate-700">Water Saved</span>
                      <span className="font-bold">{(results.waterSaved / 1_000_000).toFixed(2)}M m³</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-4 pt-4 border-t">
                      <strong>Source Citation:</strong> World Steel Association LCI Study 2020 | Energy: IEA | Water: WSA
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="equivalents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Environmental Impact Equivalents</CardTitle>
                  <CardDescription>
                    CO2 savings expressed in relatable environmental terms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-lg border border-red-200">
                      <p className="text-sm text-slate-600 mb-2">Gasoline Cars</p>
                      <p className="text-2xl font-bold text-red-600">
                        {results.equivalents.carMilesDriven.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">miles driven</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-sm text-slate-600 mb-2">Flights</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {results.equivalents.flightsNYLondon}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">NY to London round-trips</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                      <p className="text-sm text-slate-600 mb-2">Homes</p>
                      <p className="text-2xl font-bold text-green-600">
                        {results.equivalents.homesElectrified}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">annual electricity</p>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
                      <p className="text-sm text-slate-600 mb-2">Trees</p>
                      <p className="text-2xl font-bold text-amber-600">
                        {results.equivalents.treesEquivalent.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">grown for 1 year</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-4 pt-4 border-t">
                    <strong>Conversion Factors:</strong> Car emissions 0.21 kg CO2/km | Flight 0.92 tCO2/trip | Home 4.6 tCO2/year | Tree 21 kg CO2/year
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monetization" className="space-y-4">
              <div className="space-y-6">
                {/* Monetization Controls */}
                <Card className="border-amber-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-amber-800 text-base">Monetization Parameters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Carbon Price ($/tCO2)</Label>
                          <span className="text-sm font-medium text-amber-700">${metrics.carbonCreditPrice}</span>
                        </div>
                        <Slider
                          value={[metrics.carbonCreditPrice]}
                          onValueChange={(v) => {
                            setMetrics({ ...metrics, carbonCreditPrice: v[0] });
                            setTimeout(handleCalculate, 0);
                          }}
                          min={2}
                          max={100}
                          step={1}
                        />
                        <p className="text-xs text-muted-foreground">
                          VCM: $2-11 | India CCTS: ~$10 | EU ETS: $65+
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Green Steel Premium ($/t)</Label>
                          <span className="text-sm font-medium text-amber-700">${metrics.greenSteelPremium}</span>
                        </div>
                        <Slider
                          value={[metrics.greenSteelPremium]}
                          onValueChange={(v) => {
                            setMetrics({ ...metrics, greenSteelPremium: v[0] });
                            setTimeout(handleCalculate, 0);
                          }}
                          min={0}
                          max={100}
                          step={5}
                        />
                        <p className="text-xs text-muted-foreground">
                          Range: $20-50/t (CareEdge 2024)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Circular Incentive ($/t)</Label>
                          <span className="text-sm font-medium text-amber-700">${metrics.circularIncentive || 10}</span>
                        </div>
                        <Slider
                          value={[metrics.circularIncentive || 10]}
                          onValueChange={(v) => {
                            setMetrics({ ...metrics, circularIncentive: v[0] });
                            setTimeout(handleCalculate, 0);
                          }}
                          min={0}
                          max={30}
                          step={1}
                        />
                        <p className="text-xs text-muted-foreground">
                          Govt. incentives (ILO 2019)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Revenue Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-amber-700 flex items-center gap-2">
                      <TrendingUp className="size-5" />
                      Revenue Breakdown
                    </CardTitle>
                    <CardDescription>
                      Based on carbon market research and CareEdge (2024) market data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                        <p className="text-sm text-green-600 mb-1">Carbon Credits</p>
                        <p className="text-2xl font-bold text-green-800">${(((results?.co2Saved || 0) * metrics.carbonCreditPrice) / 1_000_000).toFixed(2)}M</p>
                        <p className="text-xs text-green-600 mt-1">@ ${metrics.carbonCreditPrice}/tCO2</p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-600 mb-1">Green Steel Premium</p>
                        <p className="text-2xl font-bold text-blue-800">${((results?.steelRecovered || 0) * (metrics.greenSteelPremium / 1000) / 1_000_000).toFixed(2)}M</p>
                        <p className="text-xs text-blue-600 mt-1">@ ${metrics.greenSteelPremium}/t steel</p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                        <p className="text-sm text-purple-600 mb-1">Circular Incentives</p>
                        <p className="text-2xl font-bold text-purple-800">${((results?.steelRecovered || 0) * ((metrics.circularIncentive || 10) / 1000) / 1_000_000).toFixed(2)}M</p>
                        <p className="text-xs text-purple-600 mt-1">@ ${metrics.circularIncentive || 10}/t steel</p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border border-amber-200">
                        <p className="text-sm text-amber-600 mb-1">Total Potential</p>
                        <p className="text-2xl font-bold text-amber-800">${(((results?.co2Saved || 0) * metrics.carbonCreditPrice + (results?.steelRecovered || 0) * (metrics.greenSteelPremium / 1000) + (results?.steelRecovered || 0) * ((metrics.circularIncentive || 10) / 1000)) / 1_000_000).toFixed(2)}M</p>
                        <p className="text-xs text-amber-600 mt-1">Annual Revenue</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* India Market Context */}
                <Card className="border-teal-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-teal-800 text-base flex items-center gap-2">
                      <Info className="size-4" />
                      India Market Context
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Market Size</p>
                        <p className="font-bold">$13B by 2030</p>
                        <p className="text-xs text-muted-foreground">CareEdge 2024</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Growth Rate</p>
                        <p className="font-bold">5x by 2033</p>
                        <p className="text-xs text-muted-foreground">Industry projection</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">India Global Share</p>
                        <p className="font-bold">33%+</p>
                        <p className="text-xs text-muted-foreground">of ship recycling</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Carbon Market</p>
                        <p className="font-bold">India CCTS</p>
                        <p className="text-xs text-muted-foreground">Launched 2022</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Reference Section */}
          <Card className="bg-slate-50 border-slate-200">
            <CardHeader>
              <CardTitle className="text-base">Data Sources & Academic Citations</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-slate-600 space-y-2">
              <div>
                <strong>CO2 Emissions Baseline:</strong> World Steel Association 2022 LCI Study | BF-BOF: 2.2 tCO2/t | EAF: 0.53 tCO2/t
              </div>
              <div>
                <strong>Material Recovery:</strong> Gulia et al. 2023 (Environmental Assessment of Ship Recycling Industry in India)
              </div>
              <div>
                <strong>Resource Savings:</strong> World Steel Association Life Cycle Inventory Study 2020 (1.4t iron ore, 0.74t coal, 0.12t limestone per tonne steel)
              </div>
              <div>
                <strong>Energy & Water:</strong> IEA Iron and Steel Technology Roadmap 2020 | IRENA Reaching Zero with Renewables 2020
              </div>
              <div>
                <strong>Employment:</strong> Japan International Cooperation Agency (JICA) 2016 Study on Ship Recycling in India
              </div>
              <div>
                <strong>Market Data:</strong> CareEdge Ratings 2024 | Carbon market research 2024
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
