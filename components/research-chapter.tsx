"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { shipRecyclingData } from "@/lib/ship-recycling-data";
import { ExternalLink, BookOpen, FileText, Scale, Globe, Factory, Leaf, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

export function ResearchChapter() {
  return (
    <div className="space-y-8">
      {/* Abstract */}
      <Card className="border-teal-200">
        <CardHeader>
          <div className="flex items-center gap-2 text-teal-700">
            <BookOpen className="size-5" />
            <CardTitle>Abstract</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            This chapter examines the environmental and economic potential of ship recycling as a pathway 
            to green steel production, focusing on CO2 emissions reduction, natural resource conservation, 
            and monetization opportunities through carbon markets and circular economy incentives. Ship 
            recycling represents a significant opportunity for decarbonizing the steel industry, with 
            potential CO2 savings of 1.6 tonnes per tonne of carbon steel and up to 5 tonnes per tonne 
            of stainless steel recovered. The global ship recycling market, valued at $7 billion in 2024 
            and projected to reach $13 billion by 2030, is poised for a fivefold increase in demolition 
            volumes by 2033. With the Hong Kong Convention entering into force in June 2025, the industry 
            is transitioning toward more sustainable and regulated practices, creating new opportunities 
            for value creation through carbon credits, green steel premiums, and circular economy frameworks.
          </p>
        </CardContent>
      </Card>

      {/* Section 1: Introduction */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="bg-teal-100 text-teal-800 rounded-full size-8 flex items-center justify-center text-sm">1</span>
          Introduction to Ship Recycling and Green Steel
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">The Circular Economy Imperative</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                Ship recycling represents a cornerstone of the maritime circular economy, transforming 
                end-of-life vessels into valuable secondary raw materials. Modern ships have a lifespan 
                of 25-30 years, after which corrosion, metal fatigue, and operational economics render 
                them uneconomical to operate.
              </p>
              <p>
                The industry dismantles approximately <strong>1,000 large ocean-going vessels annually</strong>, 
                with the potential to recover 70-95% of a ship&apos;s weight as recyclable materials. In developed 
                country facilities, recovery rates can reach 98%.
              </p>
              <p>
                As the European steel sector undergoes transformation toward low-CO2 production processes, 
                ship recycling presents a strategic opportunity to supply high-quality secondary raw materials 
                while supporting decarbonization goals.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Global Market Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm">Market Value (2024)</span>
                  <Badge variant="secondary" className="text-lg font-bold">$7.0B</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm">Projected Value (2030)</span>
                  <Badge variant="secondary" className="text-lg font-bold">$13.0B</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm">CAGR (2025-2030)</span>
                  <Badge className="bg-emerald-500">7.4%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm">Asia Market Share</span>
                  <Badge variant="outline">92%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 2: CO2 Emissions */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="bg-emerald-100 text-emerald-800 rounded-full size-8 flex items-center justify-center text-sm">2</span>
          CO2 Emissions: Virgin vs. Recycled Steel
        </h2>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="size-5 text-emerald-600" />
              The Carbon Footprint of Steel Production
            </CardTitle>
            <CardDescription>
              Steel production accounts for approximately 8% of global CO2 emissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg bg-red-50 border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">Primary Route (BF-BOF)</h4>
                <p className="text-3xl font-bold text-red-700 mb-1">2.2-2.32</p>
                <p className="text-sm text-red-600">tonnes CO2 per tonne of steel</p>
                <p className="text-xs text-red-500 mt-2">
                  Responsible for ~80% of steel sector emissions due to reliance on fossil-based reductants
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-emerald-50 border-emerald-200">
                <h4 className="font-semibold text-emerald-800 mb-2">Secondary Route (EAF with Scrap)</h4>
                <p className="text-3xl font-bold text-emerald-700 mb-1">0.3-1.43</p>
                <p className="text-sm text-emerald-600">tonnes CO2 per tonne of steel</p>
                <p className="text-xs text-emerald-500 mt-2">
                  Can approach near-zero emissions when powered by renewable electricity
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-800 mb-4">CO2 Savings Per Tonne of Ferrous Scrap Recycled</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="text-center">
                  <p className="text-4xl font-bold text-emerald-700">1.6</p>
                  <p className="text-sm text-emerald-600">tonnes CO2 saved (Carbon Steel)</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-teal-700">5.0</p>
                  <p className="text-sm text-teal-600">tonnes CO2 saved (Stainless Steel)</p>
                </div>
              </div>
              <p className="text-xs text-emerald-600 mt-4 text-center">
                Source: World Steel Association, Recycling Europe & EUROFER Joint Statement (2025)
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Section 3: Resource Savings */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-800 rounded-full size-8 flex items-center justify-center text-sm">3</span>
          Natural Resource Conservation
        </h2>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="size-5 text-blue-600" />
              Resource Savings from Recycled Steel Production
            </CardTitle>
            <CardDescription>
              Per tonne of ferrous scrap recycled compared to virgin steel production
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold text-orange-700">1.4</p>
                <p className="text-sm font-medium">tonnes Iron Ore Saved</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold text-gray-700">740</p>
                <p className="text-sm font-medium">kg Coal Saved</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold text-stone-700">120</p>
                <p className="text-sm font-medium">kg Limestone Saved</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold text-yellow-700">16-17%</p>
                <p className="text-sm font-medium">Energy Reduction</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold text-blue-700">40%</p>
                <p className="text-sm font-medium">Water Consumption Reduction</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold text-emerald-700">58%</p>
                <p className="text-sm font-medium">GHG Emission Reduction</p>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Sources: World Steel Association Circular Economy data, IMO Ship Recycling guidelines, Wikipedia (citing multiple academic sources)
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Section 4: Regulatory Framework */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="bg-purple-100 text-purple-800 rounded-full size-8 flex items-center justify-center text-sm">4</span>
          Regulatory Framework
        </h2>

        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem value="hkc" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <Scale className="size-5 text-purple-600" />
                <span className="font-semibold">Hong Kong Convention (2009)</span>
                <Badge className="bg-emerald-500 ml-2">In Force: June 2025</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <p className="text-muted-foreground">
                The Hong Kong International Convention for the Safe and Environmentally Sound Recycling 
                of Ships aims to ensure that ships being recycled do not pose unnecessary risks to human 
                health, safety, or the environment.
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="p-3 bg-purple-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-700">15+</p>
                  <p className="text-xs text-purple-600">Ratifying States Required</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-700">40%</p>
                  <p className="text-xs text-purple-600">World Merchant Fleet</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-700">3%</p>
                  <p className="text-xs text-purple-600">Recycling Capacity</p>
                </div>
              </div>
              <h5 className="font-medium mt-4">Key Requirements:</h5>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Inventory of Hazardous Materials (IHM) for all ships</li>
                <li>Ship Recycling Plan specific to each vessel</li>
                <li>Authorized Ship Recycling Facilities meeting safety and environmental standards</li>
                <li>Certification and reporting requirements</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="eu-srr" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <Globe className="size-5 text-blue-600" />
                <span className="font-semibold">EU Ship Recycling Regulation</span>
                <Badge variant="outline" className="ml-2">Effective: 2018</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <p className="text-muted-foreground">
                The EU SRR establishes high standards for EU-flagged vessels at the end of their 
                operational lives, maintaining a European List of approved ship recycling facilities.
              </p>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-center flex-1">
                  <p className="text-2xl font-bold text-blue-700">48</p>
                  <p className="text-xs text-blue-600">Approved Facilities (as of July 2023)</p>
                </div>
              </div>
              <h5 className="font-medium mt-4">Requirements for Listed Facilities:</h5>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Authorization and robust structural/operational standards</li>
                <li>Environmental safety protocols</li>
                <li>Worker health and safety measures</li>
                <li>Hazardous materials handling on impermeable surfaces</li>
                <li>Emergency preparedness and response plans</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="basel" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <AlertTriangle className="size-5 text-amber-600" />
                <span className="font-semibold">Basel Convention (1989)</span>
                <Badge variant="outline" className="ml-2">187 Parties</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <p className="text-muted-foreground">
                The Basel Convention controls international movement of hazardous wastes and their 
                environmentally sound management. End-of-life ships were classified as &ldquo;toxic waste&rdquo; 
                in 2004.
              </p>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="font-medium text-amber-800">Ban Amendment</p>
                <p className="text-sm text-amber-700 mt-1">
                  Entered into force December 5, 2019, prohibiting export of hazardous wastes from 
                  OECD to non-OECD countries.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Section 5: Monetization Pathways */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="bg-amber-100 text-amber-800 rounded-full size-8 flex items-center justify-center text-sm">5</span>
          Monetization Pathways
        </h2>

        <div className="grid gap-4">
          {shipRecyclingData.monetizationPathways.map((pathway, index) => (
            <Card key={pathway.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="bg-amber-500 text-white rounded-full size-6 flex items-center justify-center text-xs">
                        {index + 1}
                      </span>
                      {pathway.name}
                    </CardTitle>
                    <CardDescription className="mt-2">{pathway.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={pathway.potentialRevenue === "High" ? "default" : 
                                   pathway.potentialRevenue === "Medium-High" ? "default" : "secondary"}>
                      {pathway.potentialRevenue} Revenue
                    </Badge>
                    <Badge variant="outline">{pathway.maturity}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h5 className="text-sm font-medium text-emerald-700 flex items-center gap-1 mb-2">
                      <CheckCircle2 className="size-4" /> Requirements
                    </h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {pathway.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">-</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-amber-700 flex items-center gap-1 mb-2">
                      <AlertTriangle className="size-4" /> Challenges
                    </h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {pathway.challenges.map((challenge, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1">-</span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 6: Carbon Market Data */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="bg-green-100 text-green-800 rounded-full size-8 flex items-center justify-center text-sm">6</span>
          Carbon Credit Market Analysis
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Voluntary Carbon Market</CardTitle>
              <CardDescription>2024-2025 Price Trends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-sm">Average Price (2024)</span>
                <span className="font-bold">$2-4/tCO2e</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-sm">High Quality Credits</span>
                <span className="font-bold">$11+/tCO2e</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-sm">Engineered Removals</span>
                <span className="font-bold">$100+/tCO2e</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Source: Climate Focus VCM Review 2024, Allied Offsets
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">EU Emissions Trading System</CardTitle>
              <CardDescription>Impact on Steel Industry</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  The EU ETS is expected to reshape steel economics, with carbon prices creating 
                  significant cost implications for EU producers. This creates opportunities for:
                </p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <TrendingUp className="size-4 text-emerald-600" />
                    Higher value for recycled steel inputs
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="size-4 text-emerald-600" />
                    Premium pricing for low-carbon steel
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="size-4 text-emerald-600" />
                    Incentives for EU-based ship recycling
                  </li>
                </ul>
              </div>
              <p className="text-xs text-muted-foreground">
                Source: Fastmarkets, ABN AMRO Research (2026)
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 7: Regional Analysis */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="bg-cyan-100 text-cyan-800 rounded-full size-8 flex items-center justify-center text-sm">7</span>
          Regional Ship Recycling Capacity
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="bg-gradient-to-br from-orange-50 to-white">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl">India</span>
              </CardTitle>
              <CardDescription>Alang Ship Breaking Yard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Capacity</span>
                <span className="font-bold">4.5M LDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Number of Yards</span>
                <span className="font-bold">183</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Global Share</span>
                <span className="font-bold">~30%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">HKC Compliant</span>
                <span className="font-bold text-emerald-600">110 of 120</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-gradient-to-br from-green-50 to-white">
              <CardTitle className="text-lg">Bangladesh</CardTitle>
              <CardDescription>Chittagong Ship Breaking Yard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">HKC Compliant Yards</span>
                <span className="font-bold">17</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Domestic Steel Met</span>
                <span className="font-bold">20%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className="bg-emerald-500">Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-gradient-to-br from-blue-50 to-white">
              <CardTitle className="text-lg">EU/EFTA</CardTitle>
              <CardDescription>Future Potential</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Projected EOL Vessels</span>
                <span className="font-bold">136M tonnes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Potential Material</span>
                <span className="font-bold">100M tonnes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Growth Projection</span>
                <span className="font-bold text-amber-600">5x by 2033</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Citations */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="bg-slate-100 text-slate-800 rounded-full size-8 flex items-center justify-center text-sm">8</span>
          References and Citations
        </h2>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-5" />
              Key Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3 text-sm">
              <li className="text-muted-foreground">
                <strong>International Maritime Organization (IMO)</strong> - Ship Recycling and Hong Kong Convention.
                <a href="https://imo.org/en/OurWork/Environment/Pages/Ship-Recycling.aspx" 
                   className="text-teal-600 hover:underline ml-1 inline-flex items-center gap-1"
                   target="_blank" rel="noopener noreferrer">
                  Link <ExternalLink className="size-3" />
                </a>
              </li>
              <li className="text-muted-foreground">
                <strong>Recycling Europe, EUROFER & NGO Shipbreaking Platform</strong> (2025) - Joint Statement: 
                Strengthening the EU ship recycling sector to support circularity and the green transition 
                of the European steel industry.
                <a href="https://recyclingeurope.org/publication/strengthening-the-eu-ship-recycling-sector-to-support-circularity-and-the-green-transition-of-the-european-steel-industry" 
                   className="text-teal-600 hover:underline ml-1 inline-flex items-center gap-1"
                   target="_blank" rel="noopener noreferrer">
                  Link <ExternalLink className="size-3" />
                </a>
              </li>
              <li className="text-muted-foreground">
                <strong>World Steel Association</strong> (2020) - Life Cycle Inventory (LCI) Study.
                <a href="https://worldsteel.org/wp-content/uploads/Life-cycle-inventory-LCI-study-2020-data-release.pdf" 
                   className="text-teal-600 hover:underline ml-1 inline-flex items-center gap-1"
                   target="_blank" rel="noopener noreferrer">
                  Link <ExternalLink className="size-3" />
                </a>
              </li>
              <li className="text-muted-foreground">
                <strong>Max Planck Institute for Sustainable Materials</strong> (2023) - Decarbonization of Steel.
                <a href="https://pure.mpg.de/pubman/item/item_3676466_2" 
                   className="text-teal-600 hover:underline ml-1 inline-flex items-center gap-1"
                   target="_blank" rel="noopener noreferrer">
                  Link <ExternalLink className="size-3" />
                </a>
              </li>
              <li className="text-muted-foreground">
                <strong>BCC Research</strong> (2025) - Global Ship Recycling Market Report.
                <a href="https://staging.bccresearch.com/market-research/environment/ship-recycling-market.html" 
                   className="text-teal-600 hover:underline ml-1 inline-flex items-center gap-1"
                   target="_blank" rel="noopener noreferrer">
                  Link <ExternalLink className="size-3" />
                </a>
              </li>
              <li className="text-muted-foreground">
                <strong>Climate Focus</strong> (2025) - Voluntary Carbon Market 2024 Review.
                <a href="https://climatefocus.com/wp-content/uploads/2025/01/Voluntary-Carbon-Market-2024-Review.pdf" 
                   className="text-teal-600 hover:underline ml-1 inline-flex items-center gap-1"
                   target="_blank" rel="noopener noreferrer">
                  Link <ExternalLink className="size-3" />
                </a>
              </li>
              <li className="text-muted-foreground">
                <strong>TU Delft</strong> - Quantitative assessment of material composition of end-of-life ships.
                <a href="https://repository.tudelft.nl" 
                   className="text-teal-600 hover:underline ml-1 inline-flex items-center gap-1"
                   target="_blank" rel="noopener noreferrer">
                  Link <ExternalLink className="size-3" />
                </a>
              </li>
              <li className="text-muted-foreground">
                <strong>European Commission</strong> - EU Ship Recycling Regulation and European List.
                <a href="https://environment.ec.europa.eu/topics/waste-and-recycling/ships_en" 
                   className="text-teal-600 hover:underline ml-1 inline-flex items-center gap-1"
                   target="_blank" rel="noopener noreferrer">
                  Link <ExternalLink className="size-3" />
                </a>
              </li>
              <li className="text-muted-foreground">
                <strong>NGO Shipbreaking Platform</strong> - Ship Breaking industry data and advocacy.
                <a href="https://shipbreakingplatform.org" 
                   className="text-teal-600 hover:underline ml-1 inline-flex items-center gap-1"
                   target="_blank" rel="noopener noreferrer">
                  Link <ExternalLink className="size-3" />
                </a>
              </li>
              <li className="text-muted-foreground">
                <strong>Wikipedia</strong> - Ship Breaking (comprehensive compilation of academic sources).
                <a href="https://en.wikipedia.org/wiki/Ship_breaking" 
                   className="text-teal-600 hover:underline ml-1 inline-flex items-center gap-1"
                   target="_blank" rel="noopener noreferrer">
                  Link <ExternalLink className="size-3" />
                </a>
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
