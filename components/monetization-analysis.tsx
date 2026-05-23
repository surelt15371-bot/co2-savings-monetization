"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  shipRecyclingData, 
  formatNumber, 
  formatCurrency 
} from "@/lib/ship-recycling-data";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig 
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import { 
  DollarSign, 
  TrendingUp, 
  Globe, 
  Leaf, 
  Factory,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info
} from "lucide-react";

const chartConfig: ChartConfig = {
  carbonCredits: { label: "Carbon Credits", color: "hsl(142, 76%, 36%)" },
  greenPremium: { label: "Green Steel Premium", color: "hsl(217, 91%, 60%)" },
  circularIncentives: { label: "Circular Economy", color: "hsl(45, 93%, 47%)" },
  euEts: { label: "EU ETS Benefit", color: "hsl(262, 83%, 58%)" },
};

const COLORS = ["#16a34a", "#2563eb", "#eab308", "#9333ea", "#ef4444"];

export function MonetizationAnalysis() {
  const [fleetSize, setFleetSize] = useState(10); // Number of ships
  const [avgLdt, setAvgLdt] = useState(25000); // Average LDT per ship
  const [carbonPrice, setCarbonPrice] = useState(50);
  const [greenPremium, setGreenPremium] = useState(30);
  const [recoveryRate, setRecoveryRate] = useState(85);

  // Calculate total potential
  const totalLdt = fleetSize * avgLdt;
  const totalSteel = totalLdt * (recoveryRate / 100);
  const co2Avoided = totalSteel * 1.6; // tonnes CO2

  const calculations = useMemo(() => {
    const carbonCreditValue = co2Avoided * carbonPrice;
    const greenPremiumValue = totalSteel * greenPremium;
    const circularIncentiveEstimate = totalSteel * 15; // Estimated circular economy incentive
    const euEtsBenefit = co2Avoided * (carbonPrice * 0.3); // Indirect benefit estimate
    
    return {
      carbonCreditValue,
      greenPremiumValue,
      circularIncentiveEstimate,
      euEtsBenefit,
      total: carbonCreditValue + greenPremiumValue + circularIncentiveEstimate + euEtsBenefit
    };
  }, [co2Avoided, totalSteel, carbonPrice, greenPremium]);

  // Data for charts
  const revenueBreakdown = [
    { name: "Carbon Credits", value: calculations.carbonCreditValue, fill: COLORS[0] },
    { name: "Green Premium", value: calculations.greenPremiumValue, fill: COLORS[1] },
    { name: "Circular Incentives", value: calculations.circularIncentiveEstimate, fill: COLORS[2] },
    { name: "EU ETS Benefit", value: calculations.euEtsBenefit, fill: COLORS[3] },
  ];

  const projectionData = [
    { year: "2025", ships: 1000, revenue: 2.1 },
    { year: "2027", ships: 1500, revenue: 3.5 },
    { year: "2029", ships: 2500, revenue: 6.2 },
    { year: "2031", ships: 4000, revenue: 10.5 },
    { year: "2033", ships: 5000, revenue: 14.8 },
  ];

  const carbonPriceScenarios = [
    { price: 20, voluntary: 20 * co2Avoided, euEts: 20 * co2Avoided * 0.3 },
    { price: 50, voluntary: 50 * co2Avoided, euEts: 50 * co2Avoided * 0.3 },
    { price: 80, voluntary: 80 * co2Avoided, euEts: 80 * co2Avoided * 0.3 },
    { price: 100, voluntary: 100 * co2Avoided, euEts: 100 * co2Avoided * 0.3 },
    { price: 150, voluntary: 150 * co2Avoided, euEts: 150 * co2Avoided * 0.3 },
  ];

  return (
    <div className="space-y-8">
      {/* Fleet Configuration */}
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <Factory className="size-5" />
            Fleet & Market Configuration
          </CardTitle>
          <CardDescription>
            Configure your fleet parameters to estimate monetization potential
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Number of Ships</Label>
                <span className="text-sm font-medium text-amber-700">{fleetSize}</span>
              </div>
              <Slider
                value={[fleetSize]}
                onValueChange={(v) => setFleetSize(v[0])}
                min={1}
                max={50}
                step={1}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Average LDT (tonnes)</Label>
                <span className="text-sm font-medium text-amber-700">{formatNumber(avgLdt)}</span>
              </div>
              <Slider
                value={[avgLdt]}
                onValueChange={(v) => setAvgLdt(v[0])}
                min={5000}
                max={80000}
                step={1000}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Recovery Rate (%)</Label>
                <span className="text-sm font-medium text-amber-700">{recoveryRate}%</span>
              </div>
              <Slider
                value={[recoveryRate]}
                onValueChange={(v) => setRecoveryRate(v[0])}
                min={70}
                max={98}
                step={1}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Carbon Price ($/tCO2)</Label>
                <span className="text-sm font-medium text-amber-700">${carbonPrice}</span>
              </div>
              <Slider
                value={[carbonPrice]}
                onValueChange={(v) => setCarbonPrice(v[0])}
                min={5}
                max={150}
                step={5}
              />
              <p className="text-xs text-muted-foreground">
                Voluntary: $2-11 | EU ETS: $50-100+
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Green Steel Premium ($/tonne)</Label>
                <span className="text-sm font-medium text-amber-700">${greenPremium}</span>
              </div>
              <Slider
                value={[greenPremium]}
                onValueChange={(v) => setGreenPremium(v[0])}
                min={0}
                max={100}
                step={5}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total LDT</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatNumber(totalLdt)}</p>
            <p className="text-teal-100 text-sm">tonnes</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Steel Recovered</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatNumber(totalSteel)}</p>
            <p className="text-emerald-100 text-sm">tonnes</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">CO2 Avoided</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatNumber(co2Avoided)}</p>
            <p className="text-blue-100 text-sm">tonnes CO2</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total Potential Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(calculations.total)}</p>
            <p className="text-amber-100 text-sm">estimated revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Breakdown Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="size-5 text-amber-600" />
              Revenue Stream Breakdown
            </CardTitle>
            <CardDescription>
              Distribution of potential monetization streams
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart>
                <Pie
                  data={revenueBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {revenueBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={<ChartTooltipContent 
                    formatter={(value) => formatCurrency(Number(value))} 
                  />} 
                />
              </PieChart>
            </ChartContainer>

            <div className="grid grid-cols-2 gap-2 mt-4">
              {revenueBreakdown.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div 
                    className="size-3 rounded-full" 
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-medium ml-auto">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Carbon Price Scenarios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5 text-emerald-600" />
              Carbon Price Sensitivity
            </CardTitle>
            <CardDescription>
              Revenue impact at different carbon price levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={carbonPriceScenarios}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="price" tickFormatter={(v) => `$${v}`} />
                <YAxis tickFormatter={(v) => `$${(v/1000000).toFixed(1)}M`} />
                <ChartTooltip 
                  content={<ChartTooltipContent 
                    formatter={(value) => formatCurrency(Number(value))} 
                  />} 
                />
                <Bar dataKey="voluntary" name="Voluntary Market" fill={COLORS[0]} />
                <Bar dataKey="euEts" name="EU ETS Benefit" fill={COLORS[3]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Market Growth Projection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="size-5 text-blue-600" />
            Market Growth Projection (2025-2033)
          </CardTitle>
          <CardDescription>
            Projected ship demolitions and monetization potential with 5x growth by 2033
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <AreaChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" tickFormatter={(v) => `${v}B`} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v/1000}K`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="revenue" 
                name="Revenue ($B)"
                stroke={COLORS[1]} 
                fill={COLORS[1]} 
                fillOpacity={0.3}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="ships" 
                name="Ships Recycled"
                stroke={COLORS[0]} 
                strokeWidth={2}
                dot={{ fill: COLORS[0] }}
              />
              <Legend />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Monetization Pathways Detail */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Detailed Monetization Pathways</h3>
        
        {shipRecyclingData.monetizationPathways.map((pathway) => (
          <Card key={pathway.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <TrendingUp className="size-5 text-amber-700" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{pathway.name}</CardTitle>
                    <CardDescription className="mt-1">{pathway.description}</CardDescription>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge 
                    className={
                      pathway.potentialRevenue === "High" ? "bg-emerald-500" :
                      pathway.potentialRevenue === "Medium-High" ? "bg-emerald-400" :
                      pathway.potentialRevenue === "Medium" ? "bg-amber-500" :
                      "bg-gray-400"
                    }
                  >
                    {pathway.potentialRevenue} Revenue
                  </Badge>
                  <Badge variant="outline">{pathway.maturity}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h5 className="text-sm font-semibold text-emerald-700 flex items-center gap-2 mb-3">
                    <CheckCircle2 className="size-4" />
                    Requirements
                  </h5>
                  <ul className="space-y-2">
                    {pathway.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ArrowRight className="size-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-amber-700 flex items-center gap-2 mb-3">
                    <AlertTriangle className="size-4" />
                    Challenges
                  </h5>
                  <ul className="space-y-2">
                    {pathway.challenges.map((challenge, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ArrowRight className="size-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Maturity Progress Bar */}
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Market Maturity</span>
                  <span className="font-medium">
                    {pathway.maturity === "Established" ? "80%" :
                     pathway.maturity === "Growing" ? "50%" :
                     pathway.maturity === "Emerging" ? "30%" : "15%"}
                  </span>
                </div>
                <Progress 
                  value={
                    pathway.maturity === "Established" ? 80 :
                    pathway.maturity === "Growing" ? 50 :
                    pathway.maturity === "Emerging" ? 30 : 15
                  }
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Implementation Roadmap */}
      <Card className="border-teal-200">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-white">
          <CardTitle className="flex items-center gap-2 text-teal-800">
            <Info className="size-5" />
            Implementation Roadmap
          </CardTitle>
          <CardDescription>
            Steps to unlock monetization potential from ship recycling
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Establish Baseline Methodology",
                description: "Develop or adopt verified methodology for calculating CO2 savings from ship recycling (ISO 14064, LCA-based)",
                status: "In Progress"
              },
              {
                step: 2,
                title: "Certification & Documentation",
                description: "Implement chain of custody documentation, HKC compliance, and third-party verification systems",
                status: "Ready"
              },
              {
                step: 3,
                title: "Carbon Registry Registration",
                description: "Register with VCS, Gold Standard, or other carbon registries with adapted steel recycling methodology",
                status: "Emerging"
              },
              {
                step: 4,
                title: "Green Steel Certification",
                description: "Obtain certification for low-carbon recycled steel content to command green premiums",
                status: "Available"
              },
              {
                step: 5,
                title: "Market Development",
                description: "Build relationships with steel producers, carbon credit buyers, and circular economy programs",
                status: "Ongoing"
              }
            ].map((item) => (
              <div key={item.step} className="flex gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="flex-shrink-0 size-10 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{item.title}</h4>
                    <Badge variant="outline">{item.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
