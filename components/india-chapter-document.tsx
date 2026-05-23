"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Download, Printer, ChevronDown, ChevronUp, ExternalLink, BookOpen, Quote } from "lucide-react"

const chapterContent = {
  title: "Unlock and Monetize CO2 and Resource Savings: Quantify Carbon and Natural Resource Savings from Green Steel Production via Ship Recycling and Explore Pathways for Monetization through Carbon Credits or Circular Economy Incentives",
  subtitle: "A Comprehensive Chapter and Guidance Document for India",
  version: "2.0",
  date: "April 2026",
  author: "Based on research and data compilation from multiple academic and industry sources",
  
  sections: [
    {
      id: "abstract",
      title: "Abstract",
      content: `This chapter examines the potential for unlocking and monetizing CO2 and natural resource savings from green steel production via ship recycling in India, with specific focus on the Alang-Sosiya Ship Recycling Yard in Gujarat. The study quantifies the carbon dioxide emissions avoided and natural resources conserved when ships are recycled to produce secondary steel, compared to primary steel production via the conventional blast furnace-basic oxygen furnace (BF-BOF) route.

Drawing upon data from the World Steel Association (2024), International Energy Agency (2023), Climate Catalyst (2024), and multiple peer-reviewed studies including Hillman et al. (2015), Choi et al. (2016), Rahman and Kim (2020), and Taylan (2013), this chapter establishes that every tonne of steel recycled from ships avoids 1.5-2.24 tonnes of CO2 emissions and conserves 1.4 tonnes of iron ore, 0.74 tonnes of coal, and 0.12 tonnes of limestone.

The chapter further explores monetization pathways through the India Carbon Credit Trading Scheme (CCTS), voluntary carbon markets (VCM), green steel premiums, and circular economy incentives. With India's ship recycling industry projected to process up to 12 million LDT by 2035 under accelerated scenarios (CareEdge, 2024a), the annual carbon credit potential could reach USD 300-600 million, contributing significantly to India's net-zero 2070 commitment.

**Keywords:** Ship recycling, green steel, carbon credits, circular economy, CO2 emissions, India, Alang, Hong Kong Convention, decarbonization`
    },
    {
      id: "introduction",
      title: "1. Introduction",
      subsections: [
        {
          title: "1.1 Background and Research Context",
          content: `The global steel industry accounts for approximately 7-9% of anthropogenic CO2 emissions, making it one of the most carbon-intensive industrial sectors (IEA, 2023; World Steel Association, 2024). In India, the steel sector contributes approximately 12% of the nation's total greenhouse gas (GHG) emissions, with an emission intensity of 2.54 t-CO2e per tonne of crude steel (tcs)—significantly higher than the global average of 1.91 t-CO2e/tcs (Gulia et al., 2023; IRENA, 2023).

India's National Steel Policy (2017) targets 300 million tonnes of production capacity by 2030-31, up from the current ~160 million tonnes. This expansion, if pursued through conventional primary steelmaking routes, would substantially increase India's carbon footprint, potentially jeopardizing the nation's Nationally Determined Contributions (NDCs) under the Paris Agreement and its commitment to achieve net-zero emissions by 2070.

Ship recycling presents a unique and underexplored pathway within this transition framework. As Mishra (2024) articulates in "Monetizing Emissions Reductions in the Ship Recycling Industry," decommissioned vessels represent a significant source of high-quality scrap steel with documented provenance—a critical factor for carbon credit verification and green steel certification.

The entry into force of the Hong Kong International Convention for the Safe and Environmentally Sound Recycling of Ships (HKC) on June 26, 2025 (IMO, 2009) marks a watershed moment for India's ship recycling industry. India, having acceded to the HKC in November 2019, now possesses the world's largest concentration of HKC-compliant ship recycling facilities at Alang, Gujarat (Gujarat Maritime Board, 2025).`
        },
        {
          title: "1.2 Research Objectives and Scope",
          content: `This guidance document addresses three primary research objectives:

**Objective 1: Quantification of Environmental Benefits**
- Establish methodologies for calculating CO2 emissions avoided through ship recycling
- Define and quantify natural resource savings (iron ore, coal, limestone, water, energy)
- Provide validated calculation frameworks aligned with GHG Protocol (2011) and ISO 14064-1 (2018)

**Objective 2: Regulatory and Policy Navigation**
- Map relevant Indian and international regulatory frameworks
- Identify compliance requirements for carbon credit generation
- Outline verification and certification pathways under VCS, Gold Standard, and India CCTS

**Objective 3: Monetization Pathway Analysis**
- Evaluate carbon credit market opportunities (voluntary and compliance markets)
- Assess green steel premium potential in domestic and international markets
- Identify circular economy incentives and government schemes applicable to ship recyclers

The geographic scope is primarily India, with emphasis on the Alang-Sosiya Ship Recycling Yard, while drawing comparative insights from Bangladesh (Rahman & Kim, 2020) and Turkey (Aşıcı, 2024) where relevant.`
        },
        {
          title: "1.3 Literature Review and Theoretical Framework",
          content: `**Steel Production and Emissions:**
The relationship between steel production routes and CO2 emissions has been extensively documented. World Steel Association (2024) reports that primary steel production via the BF-BOF route generates 2.0-2.54 t-CO2 per tonne of crude steel, while secondary production via Electric Arc Furnace (EAF) with 100% scrap input generates only 0.3-0.7 t-CO2/t—a reduction of 65-85%.

Hillman et al. (2015), in their comprehensive study "Climate Benefits of Material Recycling: Inventory of Average Greenhouse Gas Emissions for Denmark, Norway, and Sweden," established that material recycling consistently results in lower GHG emissions compared to virgin material production. Their findings provide a methodological foundation for quantifying emissions avoided through ship steel recycling.

**Ship Recycling Economics and Environmental Impacts:**
Choi et al. (2016) conducted economic and environmental perspectives analysis of end-of-life ship management, utilizing cost-benefit analysis and environmental life cycle assessment. Their work demonstrated that proper ship recycling, when conducted in compliant facilities, generates significant environmental benefits while remaining economically viable.

Rahman and Kim (2020, 2021) contributed critical research on ship recycling's circularity and environmental impacts, particularly in the South Asian context. Their Weibull tonnage estimation methodology provides a framework for projecting future ship recycling volumes and associated environmental benefits.

Taylan (2013), in "An Insight into Ship Recycling: Facts and Figures," provided foundational data on ship material composition and recovery rates that remain relevant for contemporary calculations.

**Carbon Markets and Monetization:**
The Sustainable Shipping Initiative (2023) and recent work by Dr. Joshua Ebenezer of NuCov Facilitrade Pvt Ltd (2024) have advanced the discourse on monetizing environmental benefits from ship recycling through carbon credit mechanisms. Aşıcı (2024) provides comparative analysis of emissions trading systems, offering insights relevant to India's emerging CCTS framework.`
        }
      ]
    },
    {
      id: "india-ship-recycling-industry",
      title: "2. India's Ship Recycling Industry: Structure and Capacity",
      subsections: [
        {
          title: "2.1 Alang-Sosiya: The Global Hub",
          content: `**Geographic and Operational Characteristics:**
Alang-Sosiya Ship Recycling Yard, located in the Bhavnagar district of Gujarat, is the world's largest ship breaking facility. The yard extends approximately 10 kilometers along the Gulf of Khambhat coastline, benefiting from unique geographical advantages (Gujarat Maritime Board, 2025; GMS Inc., 2025):

- Tidal range: Up to 36 feet (11 meters), among the highest in the world
- Firm sandy beach with gradual slope enabling controlled vessel grounding
- Strong underwater currents facilitating natural debris dispersal
- Capacity to accommodate vessels up to 80,000+ LDT

**Infrastructure and Capacity:**
| Parameter | Value | Source |
|-----------|-------|--------|
| Number of Plots | 183 yards | GMB, 2025 |
| Total Annual Capacity | 4.5 million LDT | Wikipedia/GMB |
| HKC-Compliant Yards | 112 of 131 (as of June 2025) | GMB, 2025 |
| Yards with SoC | 110+ | DG Shipping, 2025 |
| Historical Processing | 70 million tonnes, 8,500+ ships | GMS Inc., 2025 |
| Share of India's Recycling | 98% | CareEdge, 2024b |

**Historical Context:**
According to data compiled by Japan International Cooperation Agency (JICA, 2016), MECON Ltd (2001), and UNEP (1997), Alang emerged as a major ship recycling destination in the 1980s following the decline of traditional ship breaking centers in Taiwan, South Korea, and China. The yard's development was facilitated by favorable labor costs, minimal environmental regulation at the time, and strategic location for vessels transiting the Suez Canal route.

**Workforce and Safety Infrastructure:**
- Direct employment: ~30,000 workers (ILO, 2019)
- Indirect employment: ~200,000+ in ancillary industries
- Multi-specialty hospital with ICU, MRI, CT facilities on-site
- Mandatory GMB-certified training programs
- NEBOSH-credentialed safety officers at HKC-compliant yards`
        },
        {
          title: "2.2 Market Dynamics and Future Projections",
          content: `**Current Market Challenges:**
The ship recycling market exhibits pronounced cyclical patterns influenced by multiple factors (CareEdge, 2024a; CareEdge, 2024b; Rasmussen, 2023):

- Global freight rates: High rates extend vessel operational life, reducing recycling volumes
- Geopolitical factors: Red Sea tensions and canal diversions impact vessel economics
- Currency volatility: USD acquisition for ship purchase versus INR steel sales creates margin pressure
- Regulatory arbitrage: Differential standards between recycling destinations

**2024 Market Impact:**
The fiscal year 2024 marked the lowest recycling volumes at Alang in two decades, with less than 10 lakh LDT processed. Only approximately 20-24 of the 120 active yards remained operational during the downturn, highlighting the sector's vulnerability to market cycles.

**Future Volume Projections (Climate Catalyst, 2024):**
| Scenario | 2025 | 2030 | 2035 | 2040 |
|----------|------|------|------|------|
| Business-as-Usual | 2.4 MT LDT | 4.5 MT | 4.5 MT | 4.5 MT |
| Moderate Growth | 2.4 MT LDT | 4.5 MT | 9.0 MT | 8.9 MT |
| Accelerated | 2.4 MT LDT | 7.2 MT | 12.0 MT | 10.3 MT |

**CareEdge (2024a) Projections:**
India's ship recycling industry is projected to grow at a 10% CAGR by 2028, with volumes expected to reach 3.8-4.2 million GT in 2025, up from an estimated 2.3-2.6 million GT in 2024.

**Global Supply Context:**
According to Recycling Europe and EUROFER (2025), approximately 15,000 ships representing 12.5% of the global fleet are expected to reach end-of-life by 2035. EU/EFTA alone projects 136 million tonnes of LDT from end-of-life vessels, representing a five-fold increase in available tonnage by 2033.

**India's Competitive Position:**
- Current global market share: ~30%
- Primary competitors: Bangladesh, Pakistan, Turkey
- Strategic advantage: HKC compliance leadership in South Asia
- Potential for EU SRR approval through mutual recognition`
        },
        {
          title: "2.3 Steel Recovery Pathways and Material Flows",
          content: `**Ship Material Composition:**
Based on Taylan (2013) and subsequent research, the typical material composition of end-of-life vessels is:

| Material Category | Percentage of LDT | Recovery Rate |
|-------------------|-------------------|---------------|
| Steel/Iron | 75-85% | 85-95% |
| Machinery & Equipment | 8-12% | 90-95% |
| Non-Ferrous Metals | 2-4% | 85-90% |
| Other Materials | 4-8% | Variable |

**Steel Output Categories from Alang (Climate Catalyst, 2024):**
A critical finding from recent research is that ship-derived steel follows multiple pathways, not all of which involve melting:

| Category | Share | Description | End Products |
|----------|-------|-------------|--------------|
| Fabrication Scrap | 50% | Plates, pipes, rods for direct reuse | Profiles, flanges, agricultural implements |
| Re-rolling Material | 25% | Steel for re-rolling mills | TMT bars (<6mm), flat bars, angles |
| Melting Scrap | 25% | Scrap for induction/EAF furnaces | Billets, ingots, TMT bars (>6mm) |

**Implications for Carbon Accounting:**
This distribution has significant implications for emissions quantification. The 75% of recovered steel that is upcycled (not melted) avoids the energy-intensive melting process entirely, providing additional CO2 benefits beyond the standard recycled versus virgin steel comparison.

**Downstream Integration:**
The Alang ecosystem includes extensive downstream integration:
- Bhavnagar Induction Furnace Association
- Silhor Steel Rerolling Mills Association
- Secondary steel mills throughout Gujarat and neighboring states
- Export networks for refurbished marine equipment to Africa, Middle East, and Southeast Asia`
        }
      ]
    },
    {
      id: "co2-quantification",
      title: "3. CO2 Emissions Quantification Methodology",
      subsections: [
        {
          title: "3.1 Baseline Emissions: Primary Steel Production",
          content: `**Emission Factors by Production Route:**
Drawing upon World Steel Association (2024), IEA (2023), and IRENA (2023) data, baseline emission factors for primary steel production are established:

| Production Route | CO2 Emissions (t-CO2/tcs) | Share in India | Source |
|------------------|---------------------------|----------------|--------|
| BF-BOF (Blast Furnace-Basic Oxygen Furnace) | 2.2-2.54 | ~33% | WSA, 2024; IEA, 2023 |
| DRI-EAF (Coal-based Direct Reduced Iron) | 2.0-2.2 | ~25% | WSA, 2024 |
| DRI-EAF (Gas-based) | 1.4-1.6 | ~10% | IRENA, 2023 |
| EAF/IF (Scrap-based) | 0.3-0.7 | ~20% | WSA, 2024 |

**India-Specific Emission Context:**
According to Gulia et al. (2023) and Bureau of Energy Efficiency (BEE) PAT Scheme data:
- Total steel sector emissions: ~12% of India's total GHG emissions
- Weighted average emission intensity: 2.54 t-CO2e/tcs
- Primary cause of high intensity: Heavy reliance on coal-based production (DRI and BF-BOF)
- Global comparison: India's intensity is 33% higher than global average (1.91 t-CO2e/tcs)

**Reference Framework:**
This study adopts the methodology established by:
- GHG Protocol Corporate Accounting Standard (WRI/WBCSD, 2011)
- ISO 14064-1:2018 Greenhouse Gas Quantification Guidelines
- IPCC Guidelines for National GHG Inventories
- World Steel Association LCI Database (2020)`
        },
        {
          title: "3.2 Emissions Avoided Calculation Methodology",
          content: `**Core Formula:**
Following Hillman et al. (2015) methodology for calculating climate benefits of material recycling:

**CO2 Avoided = Steel Recovered × (Baseline Emissions Factor − Scrap Route Emissions Factor)**

Where:
- Steel Recovered = LDT × Steel Content % × Recovery Rate %
- Baseline Emissions Factor = BF-BOF or weighted average primary production emissions
- Scrap Route Emissions Factor = EAF/IF emissions using 100% scrap feed

**Recommended Emission Factors for India:**
| Parameter | Conservative | Mid-range | Progressive | Source |
|-----------|--------------|-----------|-------------|--------|
| Baseline (BF-BOF) | 2.20 t-CO2/t | 2.35 t-CO2/t | 2.54 t-CO2/t | WSA, 2024 |
| Scrap Route (EAF/IF) | 0.70 t-CO2/t | 0.50 t-CO2/t | 0.30 t-CO2/t | WSA, 2024 |
| **Net Savings** | **1.50 t-CO2/t** | **1.85 t-CO2/t** | **2.24 t-CO2/t** | Calculated |

**Worked Example: VLCC Oil Tanker Recycling**
Based on parameters from Choi et al. (2016) and GMS Inc. (2025):

| Parameter | Value | Calculation |
|-----------|-------|-------------|
| Light Displacement Tonnage (LDT) | 45,000 tonnes | Ship documentation |
| Steel Content | 85% | Taylan, 2013 |
| Recovery Rate | 88% | Industry average |
| Steel Recovered | 33,660 tonnes | 45,000 × 0.85 × 0.88 |
| CO2 Avoided (Mid-range) | 62,271 tonnes | 33,660 × 1.85 |
| CO2 Avoided (Progressive) | 75,398 tonnes | 33,660 × 2.24 |

**Upcycling Bonus Calculation:**
For the 75% of ship steel that is upcycled without melting (Climate Catalyst, 2024):
- Induction Furnace energy requirement: 550-600 kWh/tonne
- India grid emission factor: 0.79 kg CO2/kWh (CEA, 2023)
- Additional emissions avoided from bypassing melting: ~0.45 t-CO2/t

**Total Potential CO2 Savings (Comprehensive Calculation):**
| Component | Factor | Steel Tonnes | CO2 Avoided |
|-----------|--------|--------------|-------------|
| Melting Scrap (25%) | 1.85 t-CO2/t | 8,415 t | 15,568 t |
| Upcycled Steel (75%) | 2.30 t-CO2/t | 25,245 t | 58,064 t |
| **Total** | - | **33,660 t** | **73,632 t** |`
        },
        {
          title: "3.3 Verification and Quality Assurance",
          content: `**Standardized Ship Parameters for Calculation:**
Based on Taylan (2013), Rahman & Kim (2020), and industry data:

| Ship Type | Typical LDT (t) | Steel Content | Recovery Rate | Typical CO2 Avoided |
|-----------|-----------------|---------------|---------------|---------------------|
| VLCC Oil Tanker | 45,000 | 85% | 88% | 62,000-75,000 t |
| Capesize Bulk Carrier | 25,000 | 88% | 90% | 36,000-44,000 t |
| Large Container Ship | 30,000 | 82% | 85% | 38,000-47,000 t |
| Cruise Ship | 35,000 | 75% | 82% | 40,000-48,000 t |
| LNG Carrier | 28,000 | 80% | 85% | 35,000-43,000 t |
| General Cargo | 8,000 | 85% | 88% | 10,500-12,700 t |
| Offshore Platform | 15,000 | 90% | 92% | 23,000-28,000 t |

**Verification Requirements (ISO 14064-3 Aligned):**
1. **Ship Identification Documentation**
   - International Maritime Organization (IMO) number
   - Light Displacement Tonnage certificate
   - Last Class survey report
   
2. **Pre-Recycling Survey**
   - Inventory of Hazardous Materials (IHM) - required under HKC
   - Material composition analysis
   - Baseline steel grade assessment

3. **Material Flow Documentation**
   - Weigh bridge records for all steel dispatches
   - Chain of custody tracking to downstream users
   - Segregation records by material type

4. **Third-Party Verification**
   - Accredited verification body assessment
   - Site inspection and data validation
   - Annual verification cycle

**Recommended Verification Bodies for India:**
- Bureau Veritas India
- DNV India
- Lloyd's Register India
- Indian Register of Shipping (IRS)
- TUV India
- Class NK India Office`
        }
      ]
    },
    {
      id: "natural-resource-savings",
      title: "4. Natural Resource Savings Quantification",
      subsections: [
        {
          title: "4.1 Raw Material Conservation",
          content: `**Resource Savings per Tonne of Recycled Steel:**
World Steel Association (2022, 2024) provides the following resource savings factors:

| Resource | Savings per Tonne Steel | Scientific Basis | Source |
|----------|-------------------------|------------------|--------|
| Iron Ore | 1.4 tonnes | Ore-to-steel conversion ratio | WSA, 2024 |
| Coking Coal | 0.74 tonnes (740 kg) | BF-BOF process requirements | WSA, 2024 |
| Limestone | 0.12 tonnes (120 kg) | Flux requirements | WSA, 2022 |

**Annual Resource Savings at Projected Capacity:**
Applying these factors to Climate Catalyst (2024) volume projections:

| Scenario (2035) | Steel Recovered | Iron Ore Saved | Coal Saved | Limestone Saved |
|-----------------|-----------------|----------------|------------|-----------------|
| Business-as-Usual | 3.8 MT | 5.3 MT | 2.8 MT | 456,000 t |
| Moderate | 7.6 MT | 10.6 MT | 5.6 MT | 912,000 t |
| Accelerated | 10.2 MT | 14.3 MT | 7.5 MT | 1.22 MT |

**Context for India's Mining Sector:**
- India's iron ore production (2023-24): ~275 million tonnes
- Ship recycling contribution at accelerated scenario: Up to 5.2% iron ore equivalent savings
- Reduces extraction pressure on Odisha, Jharkhand, Chhattisgarh, and Karnataka mining regions
- Contributes to conservation of forest land and biodiversity in mining areas`
        },
        {
          title: "4.2 Energy and Water Savings",
          content: `**Energy Intensity Comparison:**
Drawing upon IEA (2023) and World Steel Association (2024) data:

| Production Route | Primary Energy (GJ/t crude steel) | Source |
|------------------|-----------------------------------|--------|
| BF-BOF (Primary) | 19-23 GJ/t | IEA, 2023 |
| DRI-EAF (Coal) | 25-30 GJ/t | IEA, 2023 |
| DRI-EAF (Gas) | 16-20 GJ/t | IRENA, 2023 |
| EAF with 100% Scrap | 5-7 GJ/t | WSA, 2024 |
| Induction Furnace | 9-12 GJ/t | BEE, 2024 |

**Net Energy Savings:**
| Comparison | Energy Savings | Percentage Reduction |
|------------|----------------|----------------------|
| BF-BOF vs Scrap EAF | 14-16 GJ/t | 70-75% |
| BF-BOF vs IF | 10-14 GJ/t | 45-60% |
| Upcycled Steel (no melting) | 18-22 GJ/t | ~95% |

**Water Consumption Analysis:**
| Production Route | Water Consumption (m³/tonne) | Source |
|------------------|------------------------------|--------|
| Integrated BF-BOF | 25-35 m³/t | WSA, 2024 |
| Scrap-based EAF | 10-15 m³/t | WSA, 2024 |
| Induction Furnace | 8-12 m³/t | Industry data |

**Water Savings:** 40-65% reduction compared to primary steelmaking

**Aggregate Annual Impact at Accelerated Scenario (10.2 MT Steel, 2035):**
| Resource | Annual Savings | Equivalent |
|----------|----------------|------------|
| Primary Energy | 140-160 million GJ | ~3.3-3.8 MTOE |
| Water | 100-170 million m³ | Domestic supply for ~5 million people |
| Iron Ore | 14.3 million tonnes | ~5% of India's production |
| Coal | 7.5 million tonnes | ~1% of India's consumption |`
        }
      ]
    },
    {
      id: "regulatory-framework",
      title: "5. Regulatory Framework for India",
      subsections: [
        {
          title: "5.1 International Regulatory Instruments",
          content: `**Hong Kong International Convention for the Safe and Environmentally Sound Recycling of Ships (HKC)**
Entry into Force: June 26, 2025 (IMO, 2009)

Key Requirements:
1. **For Ships:**
   - Inventory of Hazardous Materials (IHM) maintained throughout operational life
   - International Certificate on Inventory of Hazardous Materials
   - Ship Recycling Plan before recycling operations commence

2. **For Recycling Facilities:**
   - Ship Recycling Facility Plan (SRFP)
   - Document of Authorization to conduct ship recycling
   - Statement of Compliance (SoC) for the facility

3. **For Flag States:**
   - Survey and certification of ships
   - Authorization of ship recycling facilities

**India's HKC Status:**
- Acceded: November 28, 2019
- Ratification instrument deposited with IMO
- 112 of 131 yards at Alang possess HKC-compliant SoC
- Positioned as global leader in HKC-compliant recycling capacity

**Basel Convention on the Control of Transboundary Movements of Hazardous Wastes**
- India ratified: 1992
- Ships destined for recycling classified as hazardous waste
- Prior Informed Consent (PIC) procedures required for transboundary movement
- Ban Amendment: India has not ratified the Ban Amendment

**EU Ship Recycling Regulation (EU SRR) - Regulation (EU) No 1257/2013**
- Applies to EU-flagged vessels
- Requires recycling at EU-approved facilities
- Currently no Indian yards on EU-approved list
- Potential for mutual recognition with HKC entry into force`
        },
        {
          title: "5.2 Indian National Regulations",
          content: `**The Recycling of Ships Act, 2019 (Amended 2021)**
Implementing legislation for HKC in India

Key Provisions:
- Mandatory recycling authorization for all facilities
- Ship-specific Recycling Plan requirements
- Certificate of Compliance (CoC) issuance by DG Shipping
- Penal provisions: Imprisonment up to 5 years, fines up to INR 10 crore for violations
- Directorate General of Shipping (DGS) as nodal authority

**Ship Recycling Facilities (Ship Breaking) Code, 2013**
- Precursor to the 2019 Act
- Established HSE standards for ship recycling
- Worker welfare and safety requirements
- Environmental protection protocols

**Gujarat Maritime Board (GMB) Regulations:**
- Plot allocation and lease management at Alang
- Infrastructure requirements for recycling operations
- Environmental clearances and compliance monitoring
- Training and certification mandates for yard personnel
- Coordination with State Pollution Control Board

**Steel Scrap Recycling Policy, 2019 (Ministry of Steel):**
- Promotes circular economy in steel sector
- Target: 70 MT domestic scrap availability by 2030
- Quality certification requirements for scrap
- Extended Producer Responsibility (EPR) framework
- Infrastructure development for collection and processing

**Bureau of Indian Standards (BIS) Considerations:**
- Government initiative to ease BIS norms for ship recycling steel
- Potential integration of ship scrap into mainstream steel supply chain
- Quality standards under review for ship-derived steel products`
        },
        {
          title: "5.3 Carbon Market Regulations in India",
          content: `**India Carbon Credit Trading Scheme (CCTS)**
Legal Basis: Energy Conservation (Amendment) Act, 2022; Energy Conservation Act, 2001 (Bureau of Energy Efficiency, Ministry of Power)

Framework Overview:
- Notified: June 2023
- Compliance mechanism regulations: July 2024
- Carbon Credit Certificates (CCCs) for over-achievement
- Trading platform: Power exchanges (IEX, PXIL)
- Oversight: National Steering Committee for Indian Carbon Market (NSCICM)

**Covered Sectors:**
Nine energy-intensive industrial sectors including:
1. Iron & Steel (253 steel units covered)
2. Cement
3. Aluminum
4. Pulp & Paper
5. Chlor-Alkali
6. Petrochemicals
7. Fertilizer
8. Textile
9. Railways

**Steel Sector Provisions (as per LSE/Grantham Institute Analysis, 2024):**
- Mandatory emissions intensity targets for obligated entities
- Shift from efficiency-based (PAT) to emissions-intensity-based metric
- Baseline: Historical emissions intensity
- Target: Percentage reduction over compliance period
- Trading of surplus CCCs permitted

**Critique and Limitations:**
According to LSE (2024), current CCTS reduction targets may not be ambitious enough to drive deep decarbonization and technological transformation required for net-zero alignment. However, the scheme will encourage efficiency improvements in existing high-emitting steel units.

**Opportunities for Ship Recycling Integration:**
1. Ship recyclers can potentially supply certified low-carbon steel inputs
2. Downstream steel users can claim emission reductions
3. Integration pathway through certified scrap supply chain
4. Policy advocacy needed for explicit recognition of ship recycling benefits`
        },
        {
          title: "5.4 Voluntary Carbon Market Frameworks",
          content: `**Verra Verified Carbon Standard (VCS)**
- Largest voluntary carbon market registry
- Relevant methodologies:
  - VM0038: Methodology for Avoided Emissions from Recycling
  - AM0079: CDM methodology for recovery of steel from scrap (adaptable)
- No ship-specific methodology currently exists
- Potential for new methodology development

**Gold Standard**
- Premium voluntary carbon credits
- Strong sustainable development co-benefits requirements
- Currently no direct ship recycling methodology
- Potential through avoided emissions approach

**Carbon Credit Methodology Requirements (per GHG Protocol, 2011; ISO 14064):**
1. **Additionality:** Emissions reductions beyond business-as-usual
2. **Baseline Establishment:** Counterfactual emissions scenario
3. **Permanence:** Ensuring emissions reductions are lasting
4. **Leakage Assessment:** Accounting for emissions displacement
5. **Monitoring, Reporting, Verification (MRV):** Ongoing compliance

**Comparative Carbon Market Pricing (Aşıcı, 2024; Climate Focus, 2025):**
| Market | 2024 Price Range | 2025 Projection |
|--------|------------------|-----------------|
| EU ETS | EUR 65-90/tCO2 | EUR 70-100/tCO2 |
| India CCTS | Under development | INR 200-500/tCO2 (est.) |
| VCM (Average) | USD 2-15/tCO2 | USD 5-20/tCO2 |
| VCM (High Quality) | USD 15-50/tCO2 | USD 20-75/tCO2 |`
        }
      ]
    },
    {
      id: "monetization-pathways",
      title: "6. Monetization Pathways and Economic Analysis",
      subsections: [
        {
          title: "6.1 Carbon Credit Markets",
          content: `**Voluntary Carbon Market (VCM) Opportunity:**
Drawing upon Mishra (2024) "Monetizing Emissions Reductions in the Ship Recycling Industry" and Climate Focus (2025) market analysis:

**Current VCM Pricing Structure:**
| Credit Category | Price Range (2024-25) | Relevant to Ship Recycling |
|-----------------|----------------------|---------------------------|
| Renewable Energy | USD 1-5/tCO2 | Low relevance |
| Nature-based Solutions | USD 5-30/tCO2 | Low relevance |
| Industrial Avoided Emissions | USD 3-15/tCO2 | High relevance |
| Engineered Removals | USD 100-600/tCO2 | Not applicable |
| Circular Economy Credits | USD 5-25/tCO2 | High relevance |

**Revenue Potential per Ship (VLCC Example, 62,000 tCO2 avoided):**
| Carbon Price Scenario | Revenue per Ship (USD) | Annual Fleet (50 ships) |
|-----------------------|------------------------|-------------------------|
| Conservative ($5/t) | $310,000 | $15.5 million |
| Mid-range ($15/t) | $930,000 | $46.5 million |
| Optimistic ($30/t) | $1,860,000 | $93 million |
| Premium ($50/t) | $3,100,000 | $155 million |

**Challenges for Ship Recyclers Entering Carbon Markets:**
1. **Methodology Gap:** No standardized, registry-approved methodology specific to ship recycling
2. **Additionality Demonstration:** Ship recycling occurs regardless of carbon credits (common practice issue)
3. **Verification Costs:** USD 20,000-50,000 per project; economies of scale required
4. **Market Volatility:** VCM prices fluctuated significantly in 2023-24
5. **Integrity Concerns:** Post-2023 scrutiny of carbon credit quality

**Recommended Approach (Mishra, 2024; Ebenezer, 2024):**
- Aggregate multiple vessels for verification efficiency (programmatic approach)
- Partner with established carbon project developers
- Pursue VCS/Gold Standard programmatic crediting
- Engage with CCTS development for India-specific pathway
- Focus on co-benefits documentation (employment, circular economy, waste reduction)`
        },
        {
          title: "6.2 Compliance Market Integration",
          content: `**India CCTS Integration Pathway:**
The emerging India Carbon Credit Trading Scheme presents opportunities for ship recycling integration:

**Direct Integration (Medium-term):**
- Ship scrap as certified low-carbon input for obligated steel entities
- Documentation of recycled content for emissions accounting
- Potential for scrap-specific emission factors in CCTS methodology

**Indirect Benefit (Near-term):**
- Steel producers using ship scrap achieve lower emissions intensity
- Improved compliance position under CCTS targets
- Value passed through supply chain to recyclers

**EU ETS Considerations (Aşıcı, 2024):**
While India is not directly covered by EU ETS, ship recycling has indirect relevance:
- EU steel producers benefit from lower embodied carbon imports
- Carbon Border Adjustment Mechanism (CBAM) creates premium for low-carbon steel
- EU SRR-approved facilities could access EU market premiums

**Turkey ETS Comparison (Aşıcı, 2024):**
Turkey's emerging ETS, designed to mirror EU ETS for potential linkage, demonstrates:
- Activity-specific inclusion thresholds
- Alignment with NDC commitments
- Cap design considerations for Paris Agreement compliance

**Policy Recommendations for India CCTS:**
1. Explicit recognition of ship recycled steel as low-carbon input
2. Defined emission factors for ship-derived scrap
3. Simplified verification pathway for recyclers
4. Integration with existing PAT scheme infrastructure`
        },
        {
          title: "6.3 Green Steel Premium",
          content: `**Market Context and Demand Drivers:**
According to IRENA (2023) and industry surveys, global demand for green/low-carbon steel is driven by:
- Automotive OEM net-zero supply chain commitments (Scope 3 targets)
- Green building certifications (LEED, BREEAM, GRIHA in India)
- Government green procurement policies
- ESG investment mandates and disclosure requirements

**Premium Pricing by Market Segment:**
| Market Segment | Premium Range (USD/t) | Buyer Characteristics |
|----------------|----------------------|----------------------|
| Automotive (Export) | $50-150 | Global OEMs, Scope 3 targets |
| Automotive (Domestic) | $30-80 | Tata Motors, M&M, export-focused |
| Construction (Premium) | $20-50 | Green-certified projects |
| Infrastructure | $10-30 | Government green procurement |
| General Market | $0-10 | Limited premium willingness |

**Ship Recycled Steel Value Proposition:**
1. **Documented Circular Economy Origin:** Clear provenance from decommissioned vessels
2. **Lower Embodied Carbon:** With certification, 60-85% lower than primary steel
3. **ESG Reporting Support:** Enables buyer sustainability disclosures
4. **Marine Grade Quality:** Known metallurgical properties, high-quality steel

**Certification Pathways for Green Steel Premium:**
| Certification | Geographic Focus | Requirements | Timeline |
|---------------|-----------------|--------------|----------|
| ResponsibleSteel | International | Site certification, GHG reporting | 12-18 months |
| SteelZero | International | Commitment + reporting | Membership-based |
| EPD (Environmental Product Declaration) | International | ISO 14025 compliant LCA | 6-12 months |
| India Green Steel Standard | India (proposed) | Under development | TBD |

**Revenue Enhancement Calculation:**
At $30/tonne premium on 8.5 million tonnes (accelerated scenario, 2035):
**Annual Additional Revenue = USD 255 million industry-wide**`
        },
        {
          title: "6.4 Circular Economy Incentives",
          content: `**Government Schemes Available to Ship Recyclers:**

**1. Production Linked Incentive (PLI) - Specialty Steel**
- Incentive: 4-12% of incremental sales
- Eligible categories: Specialty steel production using scrap
- Application: Steel mills using ship-derived inputs
- Scheme period: 2021-2028

**2. MSME Support Mechanisms**
- Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)
- Technology Upgradation Fund Scheme (TUFS)
- Cluster development programs for ship recycling ecosystem
- Udyam Registration benefits

**3. Gujarat State Incentives**
- Capital investment subsidies for HKC compliance upgrades
- Interest subvention schemes (2-3% interest rate reduction)
- Land lease concessions for expanding operations
- Power tariff concessions for industrial users

**4. Customs and Tax Benefits**
- Zero duty on ships imported for recycling
- Duty exemption on imported recycling equipment
- GST input credit on capital equipment
- Depreciation benefits under Income Tax Act

**Circular Economy Revenue Streams (per VLCC):**
| Material Stream | Recovery | Value Range (USD) |
|-----------------|----------|-------------------|
| Non-ferrous metals (Cu, Al, Zn) | 2-3% LDT | $500,000-800,000 |
| Machinery & equipment | Variable | $300,000-500,000 |
| Marine spares & components | Variable | $200,000-400,000 |
| Refurbished items (pumps, valves) | Variable | $100,000-200,000 |
| Hazardous material disposal | Cost | ($50,000-100,000) |
| **Total Non-Steel Value** | - | **$1,050,000-1,800,000** |

**Alang Second-Hand Market Ecosystem:**
The Alang market represents one of the world's largest repositories of marine equipment:
- Inventory: O-rings to main engines, anchors to navigation equipment
- Refurbishment facilities for testing and certification
- Export networks to Africa, Middle East, Southeast Asia, Latin America
- Contribution to global maritime circular economy`
        },
        {
          title: "6.5 Integrated Monetization Strategy",
          content: `**Recommended Monetization Stack for Indian Ship Recyclers:**

**Tier 1: Base Value (Current Operations)**
- Steel sales at commodity market prices
- Non-ferrous metal recovery and sale
- Spare parts and equipment resale
- Establishes baseline profitability

**Tier 2: Green Premium (Near-term, 2025-2027)**
- Certification of recycled steel origin (chain of custody)
- Marketing to ESG-conscious buyers
- Green building and infrastructure tenders
- Potential value addition: 5-10%

**Tier 3: Carbon Credits (Medium-term, 2027-2030)**
- Participation in methodology development
- Pilot projects with carbon developers
- Aggregated/programmatic crediting programs
- Potential value addition: 10-20%

**Tier 4: Policy Integration (Long-term, 2030+)**
- CCTS integration and compliance value realization
- Green public procurement preferences
- International carbon market linkages (Article 6)
- Strategic positioning as essential infrastructure

**Implementation Roadmap:**
| Phase | Timeline | Key Actions | Investment |
|-------|----------|-------------|------------|
| Foundation | 2025-2026 | HKC compliance, data systems, MRV capability | INR 3-8 Cr/yard |
| Market Entry | 2026-2027 | Green premium sales, pilot carbon projects | INR 50-100 L/yard |
| Scale | 2027-2030 | Programmatic crediting, CCTS integration | Variable |
| Optimization | 2030+ | Full monetization stack, export markets | Ongoing |

**Total Monetization Potential (2035, Accelerated Scenario):**
| Revenue Stream | Annual Value (USD Million) | Share |
|----------------|---------------------------|-------|
| Base Steel Sales | 8,500-10,000 | 75-80% |
| Carbon Credits | 300-600 | 3-5% |
| Green Steel Premium | 200-400 | 2-4% |
| Non-Steel Materials | 800-1,200 | 8-10% |
| Government Incentives | 100-200 | 1-2% |
| **Total** | **9,900-12,400** | 100% |`
        }
      ]
    },
    {
      id: "implementation-guidance",
      title: "7. Implementation Guidance for Stakeholders",
      subsections: [
        {
          title: "7.1 For Ship Recyclers",
          content: `**Phase 1: Compliance Foundation (Year 1)**

1. **HKC Compliance Achievement/Maintenance**
   - Statement of Compliance (SoC) from DG Shipping
   - Ship Recycling Facility Plan (SRFP) implementation
   - Hazardous material handling protocols
   - Emergency response procedures

2. **Environmental Management System**
   - ISO 14001:2015 certification
   - Environmental monitoring and reporting
   - Waste management protocols
   - Pollution prevention measures

3. **Data Infrastructure Development**
   - Digital record-keeping for material flows
   - Weigh bridge integration and documentation
   - Energy consumption monitoring
   - Chain of custody tracking system

**Phase 2: Certification Readiness (Year 2)**

1. **GHG Accounting Capability**
   - Baseline emissions calculations (Scope 1, 2, 3)
   - ISO 14064-1 compliant inventory
   - Emission factor documentation
   - Annual GHG reporting

2. **Third-Party Verification Engagement**
   - Pre-verification assessment
   - Gap analysis and remediation
   - Formal verification audit
   - Certification issuance

**Phase 3: Market Access (Year 3+)**

1. **Green Buyer Development**
   - ESG-focused customer identification
   - Marketing collateral development
   - Sustainability reporting support for buyers
   - Long-term supply agreements

2. **Carbon Market Participation**
   - Carbon developer partnerships
   - Programmatic crediting enrollment
   - CCTS registration (when available)

**Investment Requirements:**
| Item | Estimated Cost (INR) | Priority |
|------|---------------------|----------|
| HKC Compliance Upgrades | 2-5 Crore | Essential |
| ISO 14001 Certification | 5-10 Lakh | High |
| ISO 14064 GHG Accounting | 10-20 Lakh | Medium |
| MRV Systems & Software | 15-30 Lakh | Medium |
| Third-party Verification | 5-15 Lakh/year | High |
| Staff Training | 3-5 Lakh/year | Essential |`
        },
        {
          title: "7.2 For Steel Producers",
          content: `**Strategic Integration of Ship Recycled Steel:**

**Procurement Strategy:**
1. **Supplier Qualification**
   - HKC-compliant facility requirement
   - ISO 14001 certification preference
   - Chain of custody documentation capability
   - Quality consistency track record

2. **Quality Parameters**
   - Steel grade specifications (marine grade typically high quality)
   - Contamination limits (coatings, attachments)
   - Size and preparation requirements
   - Testing and certification protocols

3. **Contract Structure**
   - Long-term supply agreements (3-5 years)
   - Price indexation to steel markets
   - Volume commitments with flexibility
   - Quality premium/penalty provisions

**Carbon Accounting for Ship Scrap Usage:**
1. **Recycled Content Documentation**
   - Percentage of ship-derived scrap in melt
   - Chain of custody from recycler to furnace
   - Third-party verification where required

2. **Emission Factor Application**
   - Apply lower emission factors for scrap-based production
   - Document in sustainability reporting (GRI, SASB, CDP)
   - Claim benefits under CCTS (when methodology available)

3. **Product Marketing**
   - "Circular Steel" product lines
   - Environmental Product Declarations (EPDs)
   - Green building certification support for customers

**Key Steel Producers to Engage:**
| Company | Relevance | Sustainability Commitment |
|---------|-----------|--------------------------|
| JSW Steel | Major scrap user | Net-zero by 2050 |
| Tata Steel | Green steel initiatives | Carbon neutrality by 2045 |
| ArcelorMittal Nippon Steel | Technology leader | Science-based targets |
| SAIL | Government backing | National steel policy alignment |
| Jindal Steel | Growing capacity | ESG focus increasing |`
        },
        {
          title: "7.3 For Policymakers",
          content: `**Policy Recommendations by Timeline:**

**Immediate Actions (2025-2026):**
1. **BIS Norms Revision**
   - Fast-track review of BIS standards for ship recycled steel
   - Enable direct use in construction and infrastructure
   - Quality certification pathway for ship-derived products

2. **CCTS Methodology Development**
   - Include ship recycling explicitly in CCTS scope
   - Develop emission factors for ship scrap inputs
   - Create simplified verification pathway for recyclers

3. **Green Procurement Framework**
   - Include recycled steel content requirements in government tenders
   - Preferential treatment for circular economy suppliers
   - Mandatory disclosure of embodied carbon in infrastructure projects

**Short-term (2026-2028):**
1. **India-Specific Carbon Credit Methodology**
   - Collaborate with Verra/Gold Standard for methodology development
   - Pilot program at Alang with 10-20 yards
   - Registry establishment for Indian carbon market

2. **EU SRR Mutual Recognition**
   - Diplomatic engagement for HKC-EU SRR equivalence
   - Technical assistance program for yards seeking EU approval
   - Market access facilitation for compliant facilities

3. **Financing Mechanisms**
   - Green finance window for HKC compliance upgrades
   - Credit guarantee scheme for small recyclers
   - Interest subvention for environmental investments

**Medium-term (2028-2030):**
1. **East Coast Ship Recycling Development**
   - Feasibility studies for Pipavav, Chennai, Paradip locations
   - Infrastructure investment planning
   - Regulatory framework extension

2. **International Carbon Market Linkages**
   - Article 6 of Paris Agreement engagement
   - Bilateral agreements for carbon credit recognition
   - Regional carbon market cooperation (ASEAN, BRICS)

3. **Research and Development Support**
   - Technology demonstration centers
   - Innovation funding for recycling processes
   - International best practice adoption programs

**Institutional Framework:**
| Institution | Role | Capacity Building Needs |
|-------------|------|------------------------|
| DG Shipping | HKC implementation | Technical staff, IT systems |
| GMB | Alang operations oversight | Environmental monitoring |
| MoEFCC | Carbon market regulation | MRV capacity |
| Ministry of Steel | Policy coordination | Circular economy integration |
| BEE | CCTS administration | Steel sector expertise |`
        }
      ]
    },
    {
      id: "case-studies",
      title: "8. Case Studies and Projections",
      subsections: [
        {
          title: "8.1 Detailed Case Study: VLCC Recycling",
          content: `**Vessel Profile:**
| Parameter | Value | Source |
|-----------|-------|--------|
| Vessel Type | Very Large Crude Carrier (VLCC) | |
| IMO Number | [Hypothetical] 9123456 | |
| Light Displacement Tonnage | 45,000 tonnes | Ship documentation |
| Age at Recycling | 28 years | |
| Flag State | Liberia | |
| Last Trading Route | Persian Gulf - Far East | |

**Material Recovery Analysis:**
| Material | Percentage | Quantity (tonnes) | Unit Value | Total Value (INR Cr) |
|----------|------------|-------------------|------------|---------------------|
| Steel (Melting) | 21.25% | 9,563 | INR 25,000/t | 23.9 |
| Steel (Re-rolling) | 21.25% | 9,563 | INR 27,000/t | 25.8 |
| Steel (Fabrication) | 42.5% | 19,125 | INR 30,000/t | 57.4 |
| Machinery | 8% | 3,600 | Variable | 12.0 |
| Non-ferrous | 3% | 1,350 | Variable | 8.1 |
| Other | 4% | 1,800 | Variable | 2.5 |
| **Total** | 100% | 45,000 | - | **129.7** |

**Environmental Impact Quantification:**
| Metric | Calculation | Result | Equivalent |
|--------|-------------|--------|------------|
| Total Steel Recovered | 45,000 × 85% × 88% | 33,660 tonnes | |
| CO2 Avoided (Mid-range) | 33,660 × 1.85 | 62,271 tonnes | 13,500 cars/year |
| CO2 Avoided (Progressive) | 33,660 × 2.24 | 75,398 tonnes | 16,400 cars/year |
| Iron Ore Saved | 33,660 × 1.4 | 47,124 tonnes | 24 ore trains |
| Coal Saved | 33,660 × 0.74 | 24,908 tonnes | 415 rail wagons |
| Energy Saved | 33,660 × 14 GJ | 471,240 GJ | 11,270 toe |
| Water Saved | 33,660 × 20 m³ | 673,200 m³ | 269 Olympic pools |

**Monetization Potential:**
| Revenue Stream | Conservative | Mid-range | Optimistic |
|----------------|--------------|-----------|------------|
| Base Material Value | $14.2M | $15.5M | $16.8M |
| Carbon Credits ($5-50/t) | $0.31M | $0.93M | $3.77M |
| Green Premium ($10-50/t) | $0.34M | $0.84M | $1.68M |
| **Total Revenue** | **$14.85M** | **$17.27M** | **$22.25M** |`
        },
        {
          title: "8.2 Industry-Wide Projections (2025-2040)",
          content: `**Scenario: Accelerated Growth Pathway**
Based on Climate Catalyst (2024), CareEdge (2024a), and industry projections:

**Assumptions:**
- Capacity expansion to 12 million LDT by 2035
- 85% average steel recovery rate
- Carbon price trajectory: $10 (2025) → $30 (2030) → $50 (2035)
- Green premium achievement: $20/t by 2028, $40/t by 2035
- Full HKC compliance across operating yards

**Volume and Material Projections:**
| Year | LDT Processed | Steel Recovered | Ships Recycled |
|------|---------------|-----------------|----------------|
| 2025 | 2.4 MT | 2.0 MT | ~80-100 |
| 2028 | 4.5 MT | 3.8 MT | ~150-180 |
| 2030 | 7.2 MT | 6.1 MT | ~240-280 |
| 2035 | 12.0 MT | 10.2 MT | ~400-450 |
| 2040 | 10.3 MT | 8.8 MT | ~340-380 |

**Environmental Impact at Peak (2035):**
| Metric | Annual Value | Cumulative (2025-2040) |
|--------|--------------|------------------------|
| CO2 Avoided | 18.9 MT | 150-180 MT |
| Iron Ore Saved | 14.3 MT | 115-140 MT |
| Coal Saved | 7.5 MT | 60-75 MT |
| Water Saved | 200+ million m³ | 1.5-2.0 billion m³ |

**Economic Value at Peak (2035):**
| Revenue Stream | Annual (USD Million) | Assumptions |
|----------------|----------------------|-------------|
| Base Steel Sales | 10,000-12,000 | Market prices |
| Carbon Credits | 400-600 | $40-50/tCO2 |
| Green Premium | 300-500 | $30-50/t steel |
| Non-Steel Materials | 1,000-1,500 | Commodity prices |
| **Total** | **11,700-14,600** | |

**Employment Projections:**
| Category | 2025 | 2030 | 2035 |
|----------|------|------|------|
| Direct (Alang) | 30,000 | 40,000 | 55,000 |
| Indirect (Gujarat) | 200,000 | 280,000 | 350,000 |
| Downstream (Steel) | Variable | Variable | Variable |

**Contribution to India's Climate Goals:**
- 2030 NDC: ~1.2-1.5% of required emission reductions
- 2070 Net-Zero: Consistent contribution pathway
- Steel sector decarbonization: Significant enabler
- Circular economy demonstration: Global best practice`
        }
      ]
    },
    {
      id: "conclusion",
      title: "9. Conclusion and Recommendations",
      content: `**Summary of Key Findings:**

This comprehensive analysis demonstrates that India's ship recycling industry, centered at Alang, Gujarat, represents a significant and undervalued opportunity for both environmental impact and economic value creation through green steel production.

**Quantified Environmental Benefits:**
1. Every tonne of steel recycled from ships avoids 1.5-2.24 tonnes CO2 emissions
2. Resource conservation: 1.4 tonnes iron ore, 0.74 tonnes coal, 0.12 tonnes limestone per tonne steel
3. Energy savings: 64-75% compared to primary steelmaking
4. Water savings: 40-65% compared to integrated steel production
5. At peak capacity (2035): 18.9 million tonnes CO2 avoided annually

**Monetization Potential:**
- Carbon credits: USD 300-600 million annually by 2035
- Green steel premium: USD 200-500 million annually
- Total industry value: USD 11-15 billion annually at maturity

**Key Recommendations:**

**For Industry:**
1. Invest in MRV infrastructure for carbon credit readiness
2. Pursue green steel certifications (ResponsibleSteel, EPD)
3. Engage with carbon project developers for pilot initiatives
4. Build long-term relationships with ESG-focused steel buyers
5. Participate in policy advocacy through industry associations

**For Government:**
1. Expedite BIS norms revision for ship recycled steel integration
2. Develop India-specific carbon credit methodology for ship recycling
3. Include ship recycled content in green public procurement
4. Negotiate EU SRR mutual recognition for HKC-compliant yards
5. Establish dedicated financing mechanisms for compliance upgrades

**For Investors and Financial Institutions:**
1. Recognize ship recycling as ESG-positive sector investment opportunity
2. Evaluate carbon credit co-investment potential
3. Support technology and infrastructure modernization
4. Engage in green steel value chain development
5. Consider climate finance instruments for sector transformation

**The Path Forward:**

The entry into force of the Hong Kong Convention, combined with India's emerging Carbon Credit Trading Scheme and global demand for green steel, creates a unique window of opportunity. India possesses the capacity, regulatory foundation, and market position to emerge as the global leader in sustainable ship recycling.

Realizing this potential requires coordinated action across stakeholders—recyclers investing in compliance and capability, steelmakers integrating circular economy principles, policymakers creating enabling frameworks, and investors providing patient capital for transformation.

The prize is substantial: a sector contributing USD 11-15 billion annually to India's economy while avoiding 15-20 million tonnes of CO2 emissions and conserving vast quantities of natural resources. This is the essence of circular economy at scale—turning end-of-life assets into sustainable value while protecting the planet for future generations.

The time for action is now.`
    }
  ],
  
  references: [
    // Core Steel & Emissions Sources
    { id: 1, citation: "World Steel Association (2024). Climate Change and the Production of Iron and Steel. World Steel Association, Brussels.", url: "https://worldsteel.org", category: "Steel & Emissions" },
    { id: 2, citation: "World Steel Association (2022). Life Cycle Inventory Study - 2022 Data Release. World Steel Association, Brussels.", url: "https://worldsteel.org", category: "Steel & Emissions" },
    { id: 3, citation: "International Energy Agency (IEA) (2023). Iron and Steel Technology Roadmap: Towards More Sustainable Steelmaking. IEA, Paris.", url: "https://www.iea.org", category: "Steel & Emissions" },
    { id: 4, citation: "International Energy Agency (IEA) (2022). Global Steel Review 2022. IEA, Paris.", url: "https://www.iea.org", category: "Steel & Emissions" },
    { id: 5, citation: "International Renewable Energy Agency (IRENA) (2023). Decarbonising Hard-to-Abate Sectors: Iron and Steel. IRENA, Abu Dhabi.", url: "https://www.irena.org", category: "Steel & Emissions" },
    
    // Ship Recycling & India Context
    { id: 6, citation: "Climate Catalyst (2024). Turning the Tide: Ship Recycling as a Source of Green Steel in India. Climate Catalyst.", url: "https://www.climatecatalyst.org", category: "Ship Recycling" },
    { id: 7, citation: "OECD (2019). Ship Recycling and the Environment. Organisation for Economic Co-operation and Development, Paris.", url: "https://www.oecd.org", category: "Ship Recycling" },
    { id: 8, citation: "Mishra, M. (2024). Monetizing Emissions Reductions in the Ship Recycling Industry. Research and Information System for Developing Countries (RIS).", url: "http://www.ris.org.in", category: "Ship Recycling" },
    { id: 9, citation: "GMS Inc. (2025). Alang Ship Recycling: Insights into Operations, Challenges, and Opportunities.", url: "https://www.gmsinc.net", category: "Ship Recycling" },
    { id: 10, citation: "Taylan, M. (2013). An Insight into Ship Recycling: Facts and Figures. 4th International Symposium on Maritime Safety, Security & Environmental Protection, Athens.", url: "https://web.itu.edu.tr/taylan/publications.html", category: "Ship Recycling" },
    
    // Academic Research
    { id: 11, citation: "Gulia, J., Garg, V., & Gupta, K. (2023). Steel Decarbonisation in India. JMK Research & IEEFA.", url: "https://jmkresearch.com", category: "Academic" },
    { id: 12, citation: "Hillman, K., Damgaard, A., Eriksson, O., Jonsson, D., & Flysjo, A. (2015). Climate Benefits of Material Recycling: Inventory of Average Greenhouse Gas Emissions for Denmark, Norway and Sweden. Nordic Council of Ministers, TemaNord 2015:547.", url: "https://norden.diva-portal.org", category: "Academic" },
    { id: 13, citation: "Choi, J.K., Kelley, D., Murphy, S., & Thangamani, D. (2016). Economic and Environmental Perspectives of End-of-Life Ship Management. Resources, Conservation and Recycling, 107, 82-91.", url: "https://doi.org/10.1016/j.resconrec.2015.12.007", category: "Academic" },
    { id: 14, citation: "Rahman, S.M.M. & Kim, J. (2020). Circular Economy, Proximity, and Shipbreaking: A Material Flow and Environmental Impact Analysis. Journal of Cleaner Production, 269, 122339.", url: "https://doi.org/10.1016/j.jclepro.2020.122339", category: "Academic" },
    { id: 15, citation: "Rahman, S.M.M. & Kim, J. (2021). Disruption in Circularity? Impact Analysis of COVID-19 on Ship Recycling Using Weibull Tonnage Estimation and Scenario Analysis Method. Resources, Conservation & Recycling, 164, 105139.", url: "https://doi.org/10.1016/j.resconrec.2020.105139", category: "Academic" },
    
    // Industry Reports
    { id: 16, citation: "CareEdge (2024a). India's Ship Recycling Industry Expected to Grow at 10% CAGR by 2028. CareEdge Ratings.", url: "https://careedge.in", category: "Industry" },
    { id: 17, citation: "CareEdge (2024b). Ship Recycling Sector Update: Alang Operations Assessment. CareEdge Ratings.", url: "https://careedge.in", category: "Industry" },
    { id: 18, citation: "Rasmussen, H.B. (2023). Ship Recycling Market Outlook and Trends. BIMCO.", url: "https://www.bimco.org", category: "Industry" },
    { id: 19, citation: "Sustainable Shipping Initiative (2023). The Role of Shipping in Achieving Net-Zero. SSI.", url: "https://www.sustainableshipping.org", category: "Industry" },
    
    // Regulatory Sources
    { id: 20, citation: "International Maritime Organization (IMO) (2009). Hong Kong International Convention for the Safe and Environmentally Sound Recycling of Ships. IMO, London.", url: "https://imo.org", category: "Regulatory" },
    { id: 21, citation: "European Commission (2013). Regulation (EU) No 1257/2013 on Ship Recycling (EU SRR). Official Journal of the European Union.", url: "https://eur-lex.europa.eu", category: "Regulatory" },
    { id: 22, citation: "Ministry of Shipping, Government of India (2019). The Recycling of Ships Act, 2019.", url: "https://dgshipping.gov.in", category: "Regulatory" },
    { id: 23, citation: "Ministry of Steel, Government of India (2019). Steel Scrap Recycling Policy.", url: "https://steel.gov.in", category: "Regulatory" },
    
    // Carbon Markets & GHG
    { id: 24, citation: "GHG Protocol (2011). Corporate Accounting and Reporting Standard. World Resources Institute (WRI) and World Business Council for Sustainable Development (WBCSD).", url: "https://ghgprotocol.org", category: "Carbon/GHG" },
    { id: 25, citation: "International Organization for Standardization (ISO) (2018). ISO 14064-1: Greenhouse Gases — Specification with Guidance at the Organization Level for Quantification and Reporting. ISO, Geneva.", url: "https://www.iso.org", category: "Carbon/GHG" },
    { id: 26, citation: "Bureau of Energy Efficiency (BEE) (2024). Carbon Credit Trading Scheme Framework. Ministry of Power, Government of India.", url: "https://www.beeindia.gov.in", category: "Carbon/GHG" },
    { id: 27, citation: "ICAP (2024). Indian Carbon Credit Trading Scheme. International Carbon Action Partnership.", url: "https://icapcarbonaction.com", category: "Carbon/GHG" },
    { id: 28, citation: "Aşıcı, A.A. (2024). A Preliminary Analysis of the Turkish Emissions Trading System. METU Studies in Development.", url: "https://dergipark.org.tr", category: "Carbon/GHG" },
    
    // India Context
    { id: 29, citation: "Gujarat Maritime Board (GMB) (2025). Alang-Sosiya Ship Recycling Yard: Regulations and Statistics.", url: "https://gmbports.org", category: "India" },
    { id: 30, citation: "International Labour Organization (ILO) (2019). Safety and Health in Shipbreaking: Guidelines for Asian Countries and Turkey. ILO, Geneva.", url: "https://www.ilo.org", category: "India" },
    { id: 31, citation: "Japan International Cooperation Agency (JICA) (2016). Study on Ship Recycling in India. JICA.", url: "https://www.jica.go.jp", category: "India" },
    { id: 32, citation: "MECON Ltd (2001). Ship Breaking Industry in India: Assessment Study.", url: "", category: "India" },
    { id: 33, citation: "UNEP (1997). Technical Guidelines on the Environmentally Sound Management of Full and Partial Dismantling of Ships. UNEP.", url: "https://www.unep.org", category: "India" },
    { id: 34, citation: "Dr. Joshua Ebenezer, NuCov Facilitrade Pvt Ltd (2024). Ship Recycling Carbon Credit Opportunities for India. Industry Presentation.", url: "https://www.nucov-facilitrade.com", category: "India" },
    
    // Additional Policy Sources
    { id: 35, citation: "OECD (2025). Steel Outlook 2025. OECD Publishing, Paris.", url: "https://www.oecd.org", category: "Policy" },
    { id: 36, citation: "Recycling Europe & EUROFER (2025). Strengthening the EU Ship Recycling Sector to Support Circularity and the Green Transition of the European Steel Industry.", url: "https://recyclingeurope.org", category: "Policy" },
    { id: 37, citation: "LSE Grantham Research Institute (2024). What Does the CCTS Mean for the Indian Steel Sector?", url: "https://researchonline.lse.ac.uk", category: "Policy" },
    { id: 38, citation: "Climate Focus (2025). Voluntary Carbon Market 2024 Review.", url: "https://climatefocus.com", category: "Carbon/GHG" }
  ],
  
  appendices: [
    {
      id: "appendix-a",
      title: "Appendix A: CO2 Calculation Worksheet",
      content: `**Step-by-Step CO2 Savings Calculation Template**

**Step 1: Ship Documentation**
- IMO Number: _____________
- Light Displacement Tonnage (LDT): _____________ tonnes
- Ship Type: _____________
- Steel Content Percentage (default 85%): _____________%

**Step 2: Recovery Parameters**
- Recovery Rate (default 88%): _____________%
- Steel Recovered = LDT × Steel Content % × Recovery Rate %
- Steel Recovered = _____________ tonnes

**Step 3: Emission Factor Selection**
| Scenario | Baseline (BF-BOF) | Scrap Route | Net Savings |
|----------|-------------------|-------------|-------------|
| Conservative | 2.20 t-CO2/t | 0.70 t-CO2/t | 1.50 t-CO2/t |
| Mid-range | 2.35 t-CO2/t | 0.50 t-CO2/t | 1.85 t-CO2/t |
| Progressive | 2.54 t-CO2/t | 0.30 t-CO2/t | 2.24 t-CO2/t |

Selected Scenario: _____________
Net Savings Factor: _____________ t-CO2/t

**Step 4: CO2 Avoided Calculation**
CO2 Avoided = Steel Recovered × Net Savings Factor
CO2 Avoided = _____________ tonnes CO2

**Step 5: Verification Requirements Checklist**
☐ Ship documentation verified
☐ Pre-recycling survey completed
☐ Material flow tracking established
☐ Third-party verification engaged
☐ Certification issued`
    },
    {
      id: "appendix-b",
      title: "Appendix B: Regulatory Compliance Checklist",
      content: `**Hong Kong Convention Compliance Checklist**

**Facility Requirements:**
☐ Ship Recycling Facility Plan (SRFP) approved
☐ Document of Authorization obtained
☐ Statement of Compliance (SoC) current
☐ Worker health and safety systems in place
☐ Environmental management system implemented
☐ Emergency preparedness procedures documented
☐ Training records maintained

**Ship-Specific Requirements:**
☐ Inventory of Hazardous Materials (IHM) received
☐ Ship Recycling Plan (SRP) developed
☐ Ready for Recycling Certificate obtained
☐ Notification to Flag State completed
☐ Final Survey arrangements made

**Indian Regulatory Requirements:**
☐ DG Shipping authorization current
☐ Gujarat Maritime Board lease compliant
☐ GPCB clearances obtained
☐ BIS quality certifications (where applicable)
☐ Labour law compliance documented

**Carbon Market Readiness:**
☐ ISO 14064-1 GHG inventory established
☐ ISO 14001 Environmental Management certified
☐ Third-party verification body engaged
☐ Chain of custody documentation system
☐ Annual reporting procedures established`
    },
    {
      id: "appendix-c",
      title: "Appendix C: Carbon Credit Methodology Comparison",
      content: `**Comparison of Applicable Carbon Credit Methodologies**

| Parameter | VCS VM0038 | Gold Standard | India CCTS | CDM AM0079 |
|-----------|------------|---------------|------------|------------|
| Registry | Verra | Gold Standard | India Registry | UNFCCC |
| Focus | Avoided emissions | Multiple benefits | Compliance | Steel scrap |
| Ship-specific | No | No | TBD | Adaptable |
| Additionality | Financial/Barrier | Financial + SD | Baseline | Investment |
| Crediting Period | 10 years | 5-10 years | Annual | 7-10 years |
| Verification | Annual | Annual/Biennial | Annual | Periodic |
| Typical Cost | $50-100k project | $75-150k project | TBD | $50-100k |
| Credit Value | $5-15/tCO2 | $15-40/tCO2 | TBD | Variable |
| Co-benefits | Optional | Required | Optional | CDM rules |
| Applicability | High | Medium | High (future) | Medium |

**Recommended Pathway for Indian Ship Recyclers:**
1. Near-term (2025-2027): Voluntary market pilot under VCS VM0038
2. Medium-term (2027-2030): India CCTS integration
3. Long-term (2030+): Multiple pathway optimization`
    },
    {
      id: "appendix-d",
      title: "Appendix D: Stakeholder Contact Directory",
      content: `**Government Agencies:**

| Organization | Contact | Role |
|--------------|---------|------|
| Directorate General of Shipping | dgship@nic.in | HKC implementation |
| Gujarat Maritime Board | cmd@gmbports.org | Alang operations |
| Ministry of Steel | steel@nic.in | Policy coordination |
| Bureau of Energy Efficiency | beedg@nic.in | CCTS administration |
| MoEFCC | moef@nic.in | Environmental regulation |

**Industry Associations:**

| Organization | Role |
|--------------|------|
| Ship Recycling Industries Association (India) | Industry advocacy |
| FICCI - Ship Recycling Committee | Policy engagement |
| Indian Steel Association | Steel sector coordination |
| ASSOCHAM | Industry representation |

**Verification Bodies:**

| Organization | Services |
|--------------|----------|
| Bureau Veritas India | ISO, GHG verification |
| DNV India | Carbon projects, certification |
| Indian Register of Shipping | Ship surveys, certification |
| TUV India | ISO, environmental audits |

**Carbon Project Developers:**

| Organization | Focus |
|--------------|-------|
| South Pole | VCM project development |
| Climate Bridge | India carbon projects |
| EKI Energy Services | Indian carbon credits |
| ReNew Power (Carbon) | Industrial decarbonization |

**Research Institutions:**

| Organization | Expertise |
|--------------|-----------|
| IIT Bombay | Sustainable materials |
| IIM Ahmedabad | Industry strategy |
| TERI | Climate policy |
| RIS | Trade & development |`
    }
  ],

  glossary: [
    { term: "BF-BOF", definition: "Blast Furnace-Basic Oxygen Furnace: Primary steelmaking route using iron ore and coal" },
    { term: "CCTS", definition: "Carbon Credit Trading Scheme: India's compliance carbon market mechanism" },
    { term: "EAF", definition: "Electric Arc Furnace: Steelmaking using electricity and scrap/DRI inputs" },
    { term: "EPD", definition: "Environmental Product Declaration: Standardized environmental impact disclosure" },
    { term: "GHG", definition: "Greenhouse Gas: Gases contributing to atmospheric warming" },
    { term: "HKC", definition: "Hong Kong Convention: IMO convention for safe and environmentally sound ship recycling" },
    { term: "IF", definition: "Induction Furnace: Electric furnace using electromagnetic induction for steelmaking" },
    { term: "IHM", definition: "Inventory of Hazardous Materials: Ship documentation required under HKC" },
    { term: "LCA", definition: "Life Cycle Assessment: Methodology for evaluating environmental impacts" },
    { term: "LDT", definition: "Light Displacement Tonnage: Weight of ship without cargo, fuel, or stores" },
    { term: "MRV", definition: "Monitoring, Reporting, and Verification: System for tracking and validating emissions data" },
    { term: "NDC", definition: "Nationally Determined Contribution: Country-specific climate commitments under Paris Agreement" },
    { term: "SoC", definition: "Statement of Compliance: HKC certification for ship recycling facilities" },
    { term: "SRFP", definition: "Ship Recycling Facility Plan: Documentation required for HKC compliance" },
    { term: "VCM", definition: "Voluntary Carbon Market: Non-compliance carbon credit trading system" },
    { term: "VCS", definition: "Verified Carbon Standard: Leading voluntary carbon credit certification program (Verra)" }
  ]
}

function TableOfContents({ sections, onNavigate }: { sections: typeof chapterContent.sections, onNavigate: (id: string) => void }) {
  return (
    <div className="space-y-1">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onNavigate(section.id)}
          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
        >
          {section.title}
        </button>
      ))}
    </div>
  )
}

function SectionContent({ section }: { section: typeof chapterContent.sections[0] }) {
  const [isExpanded, setIsExpanded] = useState(true)
  
  return (
    <div id={section.id} className="mb-8 scroll-mt-20">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 w-full text-left mb-4"
      >
        {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
        <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
      </button>
      
      {isExpanded && (
        <div className="pl-7 space-y-6">
          {section.content && (
            <div className="prose prose-sm max-w-none text-foreground/80">
              {section.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return <h3 key={i} className="text-lg font-semibold mt-4 mb-2 text-foreground">{paragraph.replace(/\*\*/g, '')}</h3>
                }
                if (paragraph.includes('|') && paragraph.split('|').length > 3) {
                  const rows = paragraph.split('\n').filter(row => row.trim() && !row.match(/^[\s|-]+$/))
                  const headers = rows[0]?.split('|').filter(cell => cell.trim())
                  const dataRows = rows.slice(1).filter(row => !row.match(/^[\s|-]+$/)).map(row => row.split('|').filter(cell => cell.trim()))
                  
                  if (headers && headers.length > 0) {
                    return (
                      <div key={i} className="overflow-x-auto my-4">
                        <table className="min-w-full text-sm border border-border">
                          <thead className="bg-muted">
                            <tr>
                              {headers.map((header, j) => (
                                <th key={j} className="px-3 py-2 text-left font-medium border-b border-border">{header.trim()}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {dataRows.map((row, j) => (
                              <tr key={j} className={j % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                                {row.map((cell, k) => (
                                  <td key={k} className="px-3 py-2 border-b border-border">{cell.trim()}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )
                  }
                }
                if (paragraph.match(/^[-•]\s/) || paragraph.match(/^\d+\.\s/)) {
                  const items = paragraph.split('\n').filter(item => item.trim())
                  return (
                    <ul key={i} className="list-disc pl-5 space-y-1 my-2">
                      {items.map((item, j) => (
                        <li key={j} className="text-foreground/80">
                          {item.replace(/^[-•\d.]\s*/, '').split('**').map((part, k) => 
                            k % 2 === 1 ? <strong key={k}>{part}</strong> : part
                          )}
                        </li>
                      ))}
                    </ul>
                  )
                }
                return (
                  <p key={i} className="text-foreground/80 leading-relaxed my-2">
                    {paragraph.split('**').map((part, j) => 
                      j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                    )}
                  </p>
                )
              })}
            </div>
          )}
          
          {section.subsections?.map((subsection, subIndex) => (
            <div key={subIndex} className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-foreground">{subsection.title}</h3>
              <div className="prose prose-sm max-w-none text-foreground/80">
                {subsection.content.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return <h4 key={i} className="text-base font-semibold mt-4 mb-2 text-foreground">{paragraph.replace(/\*\*/g, '')}</h4>
                  }
                  if (paragraph.includes('|') && paragraph.split('|').length > 3) {
                    const rows = paragraph.split('\n').filter(row => row.trim() && !row.match(/^[\s|-]+$/))
                    const headers = rows[0]?.split('|').filter(cell => cell.trim())
                    const dataRows = rows.slice(1).filter(row => !row.match(/^[\s|-]+$/)).map(row => row.split('|').filter(cell => cell.trim()))
                    
                    if (headers && headers.length > 0) {
                      return (
                        <div key={i} className="overflow-x-auto my-4">
                          <table className="min-w-full text-sm border border-border">
                            <thead className="bg-muted">
                              <tr>
                                {headers.map((header, j) => (
                                  <th key={j} className="px-3 py-2 text-left font-medium border-b border-border">{header.trim()}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {dataRows.map((row, j) => (
                                <tr key={j} className={j % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                                  {row.map((cell, k) => (
                                    <td key={k} className="px-3 py-2 border-b border-border">{cell.trim()}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )
                    }
                  }
                  if (paragraph.match(/^[-•☐]\s/) || paragraph.match(/^\d+\.\s/)) {
                    const items = paragraph.split('\n').filter(item => item.trim())
                    return (
                      <ul key={i} className="list-disc pl-5 space-y-1 my-2">
                        {items.map((item, j) => (
                          <li key={j} className="text-foreground/80">
                            {item.replace(/^[-•☐\d.]\s*/, '').split('**').map((part, k) => 
                              k % 2 === 1 ? <strong key={k}>{part}</strong> : part
                            )}
                          </li>
                        ))}
                      </ul>
                    )
                  }
                  return (
                    <p key={i} className="text-foreground/80 leading-relaxed my-2">
                      {paragraph.split('**').map((part, j) => 
                        j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                      )}
                    </p>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function IndiaChapterDocument() {
  const [activeTab, setActiveTab] = useState("document")
  
  const handleNavigate = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const generateMarkdown = () => {
    let md = `# ${chapterContent.title}\n\n`
    md += `## ${chapterContent.subtitle}\n\n`
    md += `**Version:** ${chapterContent.version} | **Date:** ${chapterContent.date}\n\n`
    md += `---\n\n`
    
    chapterContent.sections.forEach(section => {
      md += `## ${section.title}\n\n`
      if (section.content) {
        md += `${section.content}\n\n`
      }
      if (section.subsections) {
        section.subsections.forEach(sub => {
          md += `### ${sub.title}\n\n${sub.content}\n\n`
        })
      }
    })
    
    md += `## References\n\n`
    
    const categories = [...new Set(chapterContent.references.map(r => r.category))]
    categories.forEach(category => {
      md += `### ${category}\n\n`
      chapterContent.references
        .filter(r => r.category === category)
        .forEach(ref => {
          md += `${ref.id}. ${ref.citation}${ref.url ? ` Available at: ${ref.url}` : ''}\n\n`
        })
    })
    
    md += `## Glossary\n\n`
    chapterContent.glossary.forEach(item => {
      md += `**${item.term}:** ${item.definition}\n\n`
    })
    
    chapterContent.appendices.forEach(appendix => {
      md += `## ${appendix.title}\n\n${appendix.content}\n\n`
    })
    
    return md
  }

  const handleDownload = () => {
    const markdown = generateMarkdown()
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'India-Ship-Recycling-CO2-Monetization-Chapter.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="w-full">
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <CardTitle className="text-xl lg:text-2xl text-balance leading-tight">
                {chapterContent.title}
              </CardTitle>
              <p className="text-muted-foreground mt-2">{chapterContent.subtitle}</p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                <span>Version {chapterContent.version}</span>
                <span>{chapterContent.date}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid mb-6">
          <TabsTrigger value="document" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Chapter</span>
          </TabsTrigger>
          <TabsTrigger value="references" className="flex items-center gap-2">
            <Quote className="h-4 w-4" />
            <span className="hidden sm:inline">References</span>
          </TabsTrigger>
          <TabsTrigger value="glossary" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Glossary</span>
          </TabsTrigger>
          <TabsTrigger value="appendices" className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">Appendices</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="document">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-1 h-fit lg:sticky lg:top-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] lg:h-[600px]">
                  <TableOfContents sections={chapterContent.sections} onNavigate={handleNavigate} />
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardContent className="pt-6">
                <ScrollArea className="h-[800px] pr-4">
                  {chapterContent.sections.map((section) => (
                    <SectionContent key={section.id} section={section} />
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="references">
          <Card>
            <CardHeader>
              <CardTitle>References and Citations</CardTitle>
              <p className="text-sm text-muted-foreground">
                {chapterContent.references.length} sources cited, organized by category
              </p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[700px]">
                {[...new Set(chapterContent.references.map(r => r.category))].map(category => (
                  <div key={category} className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-foreground border-b pb-2">{category}</h3>
                    <div className="space-y-4">
                      {chapterContent.references
                        .filter(r => r.category === category)
                        .map(ref => (
                          <div key={ref.id} className="flex gap-3 text-sm">
                            <span className="text-muted-foreground font-mono w-6 shrink-0">[{ref.id}]</span>
                            <div>
                              <p className="text-foreground/80">{ref.citation}</p>
                              {ref.url && (
                                <a 
                                  href={ref.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline text-xs mt-1 inline-flex items-center gap-1"
                                >
                                  {ref.url} <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="glossary">
          <Card>
            <CardHeader>
              <CardTitle>Glossary of Terms</CardTitle>
              <p className="text-sm text-muted-foreground">
                Key terms and abbreviations used in this document
              </p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chapterContent.glossary.map((item, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg">
                      <dt className="font-semibold text-foreground">{item.term}</dt>
                      <dd className="text-sm text-muted-foreground mt-1">{item.definition}</dd>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appendices">
          <div className="space-y-6">
            {chapterContent.appendices.map((appendix) => (
              <Card key={appendix.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{appendix.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-foreground/80">
                    {appendix.content.split('\n\n').map((paragraph, i) => {
                      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return <h4 key={i} className="text-base font-semibold mt-4 mb-2 text-foreground">{paragraph.replace(/\*\*/g, '')}</h4>
                      }
                      if (paragraph.includes('|') && paragraph.split('|').length > 3) {
                        const rows = paragraph.split('\n').filter(row => row.trim() && !row.match(/^[\s|-]+$/))
                        const headers = rows[0]?.split('|').filter(cell => cell.trim())
                        const dataRows = rows.slice(1).filter(row => !row.match(/^[\s|-]+$/)).map(row => row.split('|').filter(cell => cell.trim()))
                        
                        if (headers && headers.length > 0) {
                          return (
                            <div key={i} className="overflow-x-auto my-4">
                              <table className="min-w-full text-sm border border-border">
                                <thead className="bg-muted">
                                  <tr>
                                    {headers.map((header, j) => (
                                      <th key={j} className="px-3 py-2 text-left font-medium border-b border-border">{header.trim()}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {dataRows.map((row, j) => (
                                    <tr key={j} className={j % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                                      {row.map((cell, k) => (
                                        <td key={k} className="px-3 py-2 border-b border-border">{cell.trim()}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )
                        }
                      }
                      if (paragraph.match(/^[-•☐]\s/) || paragraph.match(/^\d+\.\s/)) {
                        const items = paragraph.split('\n').filter(item => item.trim())
                        return (
                          <ul key={i} className="list-disc pl-5 space-y-1 my-2">
                            {items.map((item, j) => (
                              <li key={j} className="text-foreground/80">
                                {item.replace(/^[-•☐\d.]\s*/, '')}
                              </li>
                            ))}
                          </ul>
                        )
                      }
                      return (
                        <p key={i} className="text-foreground/80 leading-relaxed my-2">
                          {paragraph.split('**').map((part, j) => 
                            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                          )}
                        </p>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
