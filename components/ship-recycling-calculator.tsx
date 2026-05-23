"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  shipTypes,
  emissionFactors,
  resourceSavings,
  carbonMarkets,
  indiaData,
  calculateCO2Savings, 
  calculateResourceSavings, 
  calculateMonetizationPotential,
  formatNumber,
  formatCurrency,
  formatINR
} from "@/lib/ship-recycling-data";
import { downloadJSONAsPDF } from "@/lib/download-utils";
import { 
  Leaf, Droplets, Flame, Mountain, Factory, Car, Plane, Home, 
  DollarSign, TrendingUp, BookOpen, Info, FileText, Scale, ArrowRight, Download
} from "lucide-react";

export function ShipRecyclingCalculator() {
  const [shipType, setShipType] = useState(shipTypes[0].name);
  const [customLdt, setCustomLdt] = useState<number | null>(null);
  const [steelRecoveryRate, setSteelRecoveryRate] = useState(85);
  const [carbonPrice, setCarbonPrice] = useState(10); // Default to India CCTS
  const [greenPremium, setGreenPremium] = useState(30);
  const [circularIncentive, setCircularIncentive] = useState(10);
  const [methodology, setMethodology] = useState<"wsa" | "hillman" | "choi" | "india">("wsa");

  const selectedShip = shipTypes.find(s => s.name === shipType);
  const ldtTonnes = customLdt || selectedShip?.typicalLdt || 25000;
  const recoveryRate = (customLdt ? steelRecoveryRate : (selectedShip?.steelContent || 0.85) * 100) / 100;

  const co2Results = useMemo(() => 
    calculateCO2Savings(ldtTonnes, recoveryRate, methodology), 
    [ldtTonnes, recoveryRate, methodology]
  );

  const resourceResults = useMemo(() => 
    calculateResourceSavings(ldtTonnes, recoveryRate), 
    [ldtTonnes, recoveryRate]
  );

  const monetizationResults = useMemo(() => 
    calculateMonetizationPotential(ldtTonnes, recoveryRate, carbonPrice, greenPremium, circularIncentive), 
    [ldtTonnes, recoveryRate, carbonPrice, greenPremium, circularIncentive]
  );

  const methodologyInfo = {
    wsa: {
      name: "World Steel Association",
      factor: emissionFactors.savingsPerTonne.worldSteelAverage,
      citation: "World Steel Association (2022)"
    },
    hillman: {
      name: "Hillman et al. (Nordic)",
      factor: emissionFactors.savingsPerTonne.hillmanNordic,
      citation: "Hillman et al. (2015) - Nordic Council"
    },
    choi: {
      name: "Choi et al.",
      factor: emissionFactors.savingsPerTonne.choiCalculated,
      citation: "Choi, J.K. et al. (2016)"
    },
    india: {
      name: "India Grid-Adjusted",
      factor: emissionFactors.bfBof.indiaAverage - emissionFactors.eaf.indiaGridBased,
      citation: "Gulia et al. (2023), IEA (2020)"
    }
  };

  return (
    <div className="space-y-6">
      {/* Data Sources Banner */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <BookOpen className="size-5 text-blue-600 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="font-medium text-blue-800">Academic Data Sources</p>
              <p className="text-sm text-blue-700">
                All calculations based on peer-reviewed research: World Steel Association (2020, 2022), 
                IEA (2020), IRENA (2020), Hillman et al. (2015), Choi et al. (2016), 
                Gulia et al. (2023), and CareEdge (2024).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Ship Input */}
      <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-white">
        <CardHeader>
          <CardTitle className="text-teal-800">Ship Parameters</CardTitle>
          <CardDescription>Configure the vessel specifications for CO2 and resource savings analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ship-type">Ship Type</Label>
              <Select value={shipType} onValueChange={(v) => { setShipType(v); setCustomLdt(null); }}>
                <SelectTrigger id="ship-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {shipTypes.map((ship) => (
                    <SelectItem key={ship.name} value={ship.name}>
                      {ship.name} (~{formatNumber(ship.typicalLdt)} LDT)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Source: Gujarat Maritime Board, Choi et al. (2016)
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="custom-ldt">Custom LDT (tonnes)</Label>
              <Input
                id="custom-ldt"
                type="number"
                placeholder={`Default: ${formatNumber(selectedShip?.typicalLdt || 25000)}`}
                value={customLdt || ""}
                onChange={(e) => setCustomLdt(e.target.value ? Number(e.target.value) : null)}
              />
              <p className="text-xs text-muted-foreground">
                Light Displacement Tonnage - weight of ship without cargo/fuel
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Steel Recovery Rate</Label>
              <span className="text-sm font-medium text-teal-700">{steelRecoveryRate}%</span>
            </div>
            <Slider
              value={[steelRecoveryRate]}
              onValueChange={(v) => setSteelRecoveryRate(v[0])}
              min={70}
              max={98}
              step={1}
              className="py-2"
            />
            <p className="text-xs text-muted-foreground">
              Typical: 70-95% | HKC-compliant: up to 98% (Recycling Europe & EUROFER, 2025)
            </p>
          </div>

          {/* Methodology Selection */}
          <div className="space-y-3 p-4 bg-white rounded-lg border">
            <div className="flex items-center gap-2">
              <Scale className="size-4 text-teal-600" />
              <Label className="font-medium">CO2 Calculation Methodology</Label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {(Object.keys(methodologyInfo) as Array<keyof typeof methodologyInfo>).map((key) => (
                <button
                  key={key}
                  onClick={() => setMethodology(key)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    methodology === key 
                      ? "bg-teal-100 border-teal-400 text-teal-800" 
                      : "bg-white hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  <p className="font-medium text-sm">{methodologyInfo[key].name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {methodologyInfo[key].factor} tCO2/t
                  </p>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Info className="size-3" />
              Selected: {methodologyInfo[methodology].citation}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Emission Factors Reference */}
      <Card className="border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="size-4" />
            Key Emission Factors (Referenced Values)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-xs text-red-600 font-medium">BF-BOF (Primary)</p>
              <p className="text-lg font-bold text-red-800">{emissionFactors.bfBof.globalAverage} tCO2/t</p>
              <p className="text-xs text-red-600">WSA (2020)</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-xs text-red-600 font-medium">BF-BOF (India)</p>
              <p className="text-lg font-bold text-red-800">{emissionFactors.bfBof.indiaAverage} tCO2/t</p>
              <p className="text-xs text-red-600">Gulia et al. (2023)</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-green-600 font-medium">EAF (Scrap + RE)</p>
              <p className="text-lg font-bold text-green-800">{emissionFactors.eaf.withScrap} tCO2/t</p>
              <p className="text-xs text-green-600">IEA, IRENA (2020)</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-green-600 font-medium">EAF (India Grid)</p>
              <p className="text-lg font-bold text-green-800">{emissionFactors.eaf.indiaGridBased} tCO2/t</p>
              <p className="text-xs text-green-600">Gulia et al. (2023)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Leaf className="size-5" />
              CO2 Avoided
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatNumber(co2Results.co2Avoided)}</p>
            <p className="text-emerald-100 text-sm">tonnes CO2</p>
            <Badge variant="secondary" className="mt-2 bg-emerald-400/30 text-white border-0">
              {methodologyInfo[methodology].name}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Factory className="size-5" />
              Steel Recovered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatNumber(co2Results.totalSteelRecovered)}</p>
            <p className="text-blue-100 text-sm">tonnes</p>
            <Badge variant="secondary" className="mt-2 bg-blue-400/30 text-white border-0">
              {(recoveryRate * 100).toFixed(0)}% recovery
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <DollarSign className="size-5" />
              Monetization Potential
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(monetizationResults.totalPotentialValue)}</p>
            <p className="text-amber-100 text-sm">{formatCurrency(monetizationResults.perTonneLDTValue)}/LDT</p>
            <Badge variant="secondary" className="mt-2 bg-amber-400/30 text-white border-0">
              Carbon Markets
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Methodology Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Scale className="size-5" />
            CO2 Savings by Methodology
          </CardTitle>
          <CardDescription>
            Comparison of different academic methodologies for {formatNumber(co2Results.totalSteelRecovered)} tonnes steel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className={`p-4 rounded-lg border-2 ${methodology === "wsa" ? "bg-purple-50 border-purple-400" : "bg-gray-50 border-gray-200"}`}>
              <p className="text-sm font-medium">World Steel Assoc.</p>
              <p className="text-2xl font-bold text-purple-800">
                {formatNumber(co2Results.totalSteelRecovered * emissionFactors.savingsPerTonne.worldSteelAverage)}
              </p>
              <p className="text-xs text-muted-foreground">tCO2 @ 1.67 tCO2/t</p>
              <p className="text-xs text-purple-600 mt-1">WSA (2022)</p>
            </div>
            <div className={`p-4 rounded-lg border-2 ${methodology === "hillman" ? "bg-purple-50 border-purple-400" : "bg-gray-50 border-gray-200"}`}>
              <p className="text-sm font-medium">Hillman et al.</p>
              <p className="text-2xl font-bold text-purple-800">
                {formatNumber(co2Results.co2AvoidedHillman)}
              </p>
              <p className="text-xs text-muted-foreground">tCO2 @ 1.5 tCO2/t</p>
              <p className="text-xs text-purple-600 mt-1">Nordic Council (2015)</p>
            </div>
            <div className={`p-4 rounded-lg border-2 ${methodology === "choi" ? "bg-purple-50 border-purple-400" : "bg-gray-50 border-gray-200"}`}>
              <p className="text-sm font-medium">Choi et al.</p>
              <p className="text-2xl font-bold text-purple-800">
                {formatNumber(co2Results.co2AvoidedChoi)}
              </p>
              <p className="text-xs text-muted-foreground">tCO2 @ 1.6 tCO2/t</p>
              <p className="text-xs text-purple-600 mt-1">RCR Journal (2016)</p>
            </div>
            <div className={`p-4 rounded-lg border-2 ${methodology === "india" ? "bg-purple-50 border-purple-400" : "bg-gray-50 border-gray-200"}`}>
              <p className="text-sm font-medium">India Grid-Adjusted</p>
              <p className="text-2xl font-bold text-purple-800">
                {formatNumber(co2Results.co2AvoidedIndia)}
              </p>
              <p className="text-xs text-muted-foreground">tCO2 @ 1.11 tCO2/t</p>
              <p className="text-xs text-purple-600 mt-1">Gulia et al. (2023)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results Tabs */}
      <Tabs defaultValue="co2" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="co2">CO2 Impact</TabsTrigger>
          <TabsTrigger value="resources">Resource Savings</TabsTrigger>
          <TabsTrigger value="monetization">Monetization</TabsTrigger>
        </TabsList>

        <TabsContent value="co2">
          <Card>
            <CardHeader>
              <CardTitle className="text-emerald-700 flex items-center gap-2">
                <Leaf className="size-5" />
                Carbon Impact Equivalents
              </CardTitle>
              <CardDescription>
                {formatNumber(co2Results.co2Avoided)} tonnes CO2 avoided equals:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg">
                <Car className="size-8 text-emerald-600" />
                <div>
                  <p className="text-2xl font-bold text-emerald-800">{formatNumber(co2Results.equivalentCars)}</p>
                  <p className="text-sm text-emerald-600">cars off the road for 1 year (@ 4.6 tCO2/car/year)</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <Plane className="size-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-800">{formatNumber(co2Results.equivalentFlights)}</p>
                  <p className="text-sm text-blue-600">transatlantic flights avoided (@ 1.6 tCO2/passenger)</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-lg">
                <Home className="size-8 text-amber-600" />
                <div>
                  <p className="text-2xl font-bold text-amber-800">{formatNumber(co2Results.equivalentHomes)}</p>
                  <p className="text-sm text-amber-600">Indian households powered for 1 year (@ 7.5 tCO2/home)</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-muted-foreground">
                <strong>Citations:</strong> {co2Results.citations.join("; ")}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-700 flex items-center gap-2">
                <Mountain className="size-5" />
                Natural Resource Savings
              </CardTitle>
              <CardDescription>
                Resources saved compared to virgin steel production (BF-BOF route)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-full">
                      <Mountain className="size-5 text-orange-600" />
                    </div>
                    <div>
                      <span className="font-medium">Iron Ore</span>
                      <p className="text-xs text-muted-foreground">@ {resourceSavings.ironOre.saved} t/t - WSA</p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-orange-700">{formatNumber(resourceResults.ironOreSaved)} t</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-200 rounded-full">
                      <Flame className="size-5 text-gray-700" />
                    </div>
                    <div>
                      <span className="font-medium">Coal</span>
                      <p className="text-xs text-muted-foreground">@ {resourceSavings.coal.saved} t/t - WSA</p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-gray-700">{formatNumber(resourceResults.coalSaved)} t</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-stone-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-stone-200 rounded-full">
                      <Mountain className="size-5 text-stone-600" />
                    </div>
                    <div>
                      <span className="font-medium">Limestone</span>
                      <p className="text-xs text-muted-foreground">@ {resourceSavings.limestone.saved} t/t - WSA</p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-stone-700">{formatNumber(resourceResults.limestoneSaved)} t</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <Flame className="size-5 text-yellow-600" />
                    </div>
                    <div>
                      <span className="font-medium">Energy</span>
                      <p className="text-xs text-muted-foreground">@ 2.3 GJ/t - IEA (2020)</p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-yellow-700">{formatNumber(resourceResults.energySavedGJ, 1)} GJ</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg sm:col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Droplets className="size-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-medium">Water</span>
                      <p className="text-xs text-muted-foreground">@ {resourceSavings.water.savingsPerTonne} m³/t ({resourceSavings.water.percentageReduction}% reduction) - WSA</p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-blue-700">{formatNumber(resourceResults.waterSavedCubicMeters)} m³</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-muted-foreground">
                <strong>Citations:</strong> {resourceResults.citations.join("; ")}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monetization">
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
                      <span className="text-sm font-medium text-amber-700">${carbonPrice}</span>
                    </div>
                    <Slider
                      value={[carbonPrice]}
                      onValueChange={(v) => setCarbonPrice(v[0])}
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
                      <span className="text-sm font-medium text-amber-700">${greenPremium}</span>
                    </div>
                    <Slider
                      value={[greenPremium]}
                      onValueChange={(v) => setGreenPremium(v[0])}
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
                      <span className="text-sm font-medium text-amber-700">${circularIncentive}</span>
                    </div>
                    <Slider
                      value={[circularIncentive]}
                      onValueChange={(v) => setCircularIncentive(v[0])}
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
                    <p className="text-2xl font-bold text-green-800">{formatCurrency(monetizationResults.carbonCreditValue)}</p>
                    <p className="text-xs text-green-600 mt-1">@ ${carbonPrice}/tCO2</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 mb-1">Green Steel Premium</p>
                    <p className="text-2xl font-bold text-blue-800">{formatCurrency(monetizationResults.greenSteelPremiumValue)}</p>
                    <p className="text-xs text-blue-600 mt-1">@ ${greenPremium}/t steel</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-600 mb-1">Circular Incentives</p>
                    <p className="text-2xl font-bold text-purple-800">{formatCurrency(monetizationResults.circularIncentiveValue)}</p>
                    <p className="text-xs text-purple-600 mt-1">@ ${circularIncentive}/t steel</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-600 mb-1">Total Potential</p>
                    <p className="text-2xl font-bold text-amber-800">{formatCurrency(monetizationResults.totalPotentialValue)}</p>
                    <p className="text-xs text-amber-600 mt-1">{formatCurrency(monetizationResults.perTonneSteelValue)}/t steel</p>
                  </div>
                </div>

                {/* Market Comparison */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium mb-3">Carbon Credit Market Comparison</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="p-3 bg-white rounded border">
                      <p className="text-xs text-muted-foreground">VCM (Low: $2)</p>
                      <p className="font-bold">{formatCurrency(monetizationResults.vcmLowEstimate)}</p>
                    </div>
                    <div className="p-3 bg-white rounded border">
                      <p className="text-xs text-muted-foreground">VCM (High: $11)</p>
                      <p className="font-bold">{formatCurrency(monetizationResults.vcmHighEstimate)}</p>
                    </div>
                    <div className="p-3 bg-teal-50 rounded border border-teal-200">
                      <p className="text-xs text-teal-600">India CCTS (~$10)</p>
                      <p className="font-bold text-teal-800">{formatCurrency(monetizationResults.indiaCctsEstimate)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-muted-foreground">
                  <strong>Citations:</strong> {monetizationResults.citations.join("; ")}
                </div>
              </CardContent>
            </Card>

            {/* India Context */}
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
                    <p className="text-muted-foreground">Alang Capacity</p>
                    <p className="font-bold">{indiaData.alang.annualCapacity}M LDT/year</p>
                    <p className="text-xs text-muted-foreground">GMB, CareEdge (2024)</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">HKC-Compliant Yards</p>
                    <p className="font-bold">{indiaData.alang.hkcCompliantYards} of {indiaData.alang.operationalYards}</p>
                    <p className="text-xs text-muted-foreground">Gujarat Maritime Board</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Global Share</p>
                    <p className="font-bold">{indiaData.alang.globalShare}%</p>
                    <p className="text-xs text-muted-foreground">CareEdge (2024a)</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">CCTS Launch</p>
                    <p className="font-bold">{indiaData.regulations.cctsLaunched}</p>
                    <p className="text-xs text-muted-foreground">BEE, Ministry of Power</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Download Report Section */}
      <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="size-5" />
            Export Report
          </CardTitle>
          <CardDescription>Download the current calculation results as PDF</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => {
              const reportData = {
                title: "Ship Recycling Calculator Report",
                timestamp: new Date().toISOString(),
                shipType,
                customLdt: customLdt || selectedShip?.typicalLdt,
                steelRecoveryRate: `${steelRecoveryRate}%`,
                methodology,
                co2Results: {
                  co2Avoided: `${formatNumber(co2Results.co2Avoided)} tonnes`,
                  steelRecovered: `${formatNumber(co2Results.totalSteelRecovered)} tonnes`,
                },
                resourceSavings: {
                  ironOre: `${formatNumber(resourceResults.ironOreSaved)} tonnes`,
                  coal: `${formatNumber(resourceResults.coalSaved)} tonnes`,
                  limestone: `${formatNumber(resourceResults.limestoneSaved)} tonnes`,
                  water: `${formatNumber(resourceResults.waterSavedCubicMeters)} m³`,
                },
                monetizationPotential: {
                  carbonCredits: formatCurrency(monetizationResults.carbonCreditValue),
                  greenSteelPremium: formatCurrency(monetizationResults.greenSteelPremiumValue),
                  circularIncentives: formatCurrency(monetizationResults.circularIncentiveValue),
                  totalValue: formatCurrency(monetizationResults.totalPotentialValue),
                },
              };
              downloadJSONAsPDF(reportData, `ship-recycling-report-${new Date().getTime()}.pdf`);
            }}
            className="flex items-center gap-2"
          >
            <Download className="size-4" />
            Download as PDF
          </Button>
        </CardContent>
      </Card>

      {/* Calculation Steps */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="size-5 text-purple-600" />
            How Calculations Work
          </CardTitle>
          <CardDescription>Step-by-step methodology based on academic research</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* CO2 Calculation Steps */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-purple-900">CO2 Emissions Calculation</h4>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <p className="font-medium">Input Ship Tonnage</p>
                    <p className="text-sm text-muted-foreground">Enter LDT (Lightweight Tonnage) of vessel</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <p className="font-medium">Apply Recovery Rate</p>
                    <p className="text-sm text-muted-foreground">Steel recovery: 85-98% depending on ship condition</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <p className="font-medium">Calculate Recycled Steel</p>
                    <p className="text-sm text-muted-foreground">Tonnage × Recovery Rate = Recycled Steel (tonnes)</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <p className="font-medium">Apply CO2 Factor</p>
                    <p className="text-sm text-muted-foreground">Based on chosen methodology (WSA, Hillman, Choi, or India)</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">5</div>
                  <div>
                    <p className="font-medium">Result: CO2 Avoided</p>
                    <p className="text-sm text-muted-foreground">Recycled Steel × CO2 Factor = tonnes CO2e saved</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Resource Calculation Steps */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-emerald-900">Resource Savings Calculation</h4>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <p className="font-medium">Take Recycled Steel Amount</p>
                    <p className="text-sm text-muted-foreground">From CO2 calculation (tonnes of steel)</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <p className="font-medium">Apply Resource Ratios</p>
                    <p className="text-sm text-muted-foreground">Iron Ore: 1.4 t/t | Coal: 0.74 t/t | Water: 20.1 m³/t (WSA)</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <p className="font-medium">Calculate Resource Avoided</p>
                    <p className="text-sm text-muted-foreground">Recycled Steel × Each Ratio = Natural Resources Saved</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <p className="font-medium">Energy Savings: 74%</p>
                    <p className="text-sm text-muted-foreground">EAF vs BF-BOF: 2.3 GJ/t saved per tonne (IEA)</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">5</div>
                  <div>
                    <p className="font-medium">Environmental Equivalents</p>
                    <p className="text-sm text-muted-foreground">Convert to cars, flights, homes for context</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Sources */}
          <div className="p-4 bg-white rounded-lg border border-purple-100">
            <p className="font-semibold text-sm mb-2 text-purple-900">Academic Sources for Calculations</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• <strong>CO2 Factors:</strong> World Steel Association (2020, 2022), Hillman et al. (2015), Choi et al. (2016), Gulia et al. (2023)</li>
              <li>• <strong>Resource Ratios:</strong> International Energy Agency (2020), World Steel Association LCI Study</li>
              <li>• <strong>Monetization:</strong> CareEdge (2024), India Carbon Credit Trading Scheme</li>
              <li>• <strong>Regulatory:</strong> IMO Hong Kong Convention, EU Ship Recycling Regulation, Basel Convention</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
