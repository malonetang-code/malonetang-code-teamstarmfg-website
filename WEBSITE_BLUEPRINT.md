# Teamstar Manufacturing Website Blueprint

This document records the long-term website structure for Teamstar Manufacturing / 群新工业. It is intended to keep future Codex and OpenClaw edits aligned.

## Positioning

- Primary positioning: custom industrial knives and machine blades from drawings, samples, or equipment applications.
- Audience: procurement teams, engineers, equipment manufacturers, distributors, and industrial end users.
- Tone: concrete, factory-like, technical, and verifiable. Avoid vague marketing language.
- Core proof points from project materials:
  - Wei Qun group history begins in Taiwan, with 40+ years of industry background.
  - Shenzhen production base established in 1990.
  - Zhangzhou Qunxin established in 2024.
  - ISO 9001:2015 certification.
  - Product scope includes woodworking, food processing, plastic recycling, paper, textile/apparel, hand tools, stationery, and custom-shaped industrial knives.
  - Capability scope includes heat treatment, grinding, CNC machining, laser cutting, inspection lab, OEM/ODM, sample validation, and batch production.

## Information Architecture

Implemented multi-page structure:

1. `/` and `/en/` - Hero and positioning
   - Main value proposition
   - RFQ and product directory CTAs
   - High-level proof points

2. Gateway section
   - Product directory
   - Custom manufacturing
   - Manufacturing capabilities
   - Customer proof

3. `/products/` and `/en/products/` - Product directory
   - Six application-based category pages in both languages

4. Product detail pages - Custom manufacturing process
   - Requirement check
   - Material and process advice
   - Prototype validation
   - Batch production and records

5. `/capabilities/` and detail pages - Manufacturing capabilities
   - Heat treatment and laser
   - CNC and grinding
   - Inspection lab
   - Explicit placeholders for missing specs and report samples

6. `/quality/` and `/en/quality/` - Quality system
   - ISO
   - In-house heat treatment
   - Inspection equipment
   - Batch consistency

7. `/company/` and `/en/company/` - Company and base story
   - Timeline
   - Factory facts
   - Data points marked as pending confirmation when needed

8. `/customers/` and `/en/customers/` - Customer proof
   - Approved customer logo wall
   - Buyer and engineering testimonials
   - Publishable customer cases
   - Approval placeholders until real permission is confirmed

9. `/rfq/` and `/en/rfq/` - RFQ contact
   - Contact details
   - Formspree contact form
   - RFQ data checklist

## Implemented SEO Pages

- `/products/woodworking-knives/`
- `/products/food-processing-knives/`
- `/products/plastic-crusher-blades/`
- `/products/paper-slitting-knives/`
- `/products/textile-cutting-knives/`
- `/products/custom-industrial-blades/`
- `/capabilities/heat-treatment/`
- `/capabilities/precision-grinding/`
- `/capabilities/inspection-lab/`

Each route above has an English counterpart under `/en/`. The following remain future, evidence-led expansion candidates:

- `/materials/hss-vs-tool-steel-vs-carbide/`
- `/industries/woodworking/`
- `/industries/food-processing/`
- `/industries/plastic-recycling/`
- `/customers/`
- `/case-studies/`
- `/rfq/custom-industrial-knife-drawing-checklist/`

## Visual System

- Confirmed 2026-07-17 direction: Precision Catalog global shell + Modern Factory company storytelling + Engineering System capability/quality pages.
- Color system:
  - Ink: `#10181d`
  - Action orange: `#e64a2e`
  - Factory navy: `#0b2432`
  - Factory gold: `#d7b066`
  - Engineering green: `#173f31`
  - Engineering soft: `#e8eeea`
  - Border: `#d7ddda`
- Typography:
  - Latin: IBM Plex Sans
  - Chinese: Noto Sans SC
- Layout rules:
  - Use grid, borders, real photos, and restrained typography.
  - Avoid oversized rounded cards, decorative gradients, emoji icons, and excessive shadow.
  - Prefer concrete tables/cards with technical labels.

## Placeholder Rules

Use visible placeholders only when the information is not confirmed. Do not invent:

- Hardness ranges by material
- Heat treatment equipment specifications
- Inspection report samples
- Customer names or case results
- Customer logos, quotes, testimonials, or brand relationships without approval
- Delivery lead times
- Export percentages or market-share claims

Evidence boundaries in `src/` are intentional and should be changed only when real confirmed data is available.

## Multilingual and SEO Notes

- Chinese and English use separate URLs under `/` and `/en/`, with canonical and bidirectional `hreflang` annotations.
- The visible homepage no longer keeps a standalone SEO resource hub. Future search content should become real product, industry, capability, customer case, or RFQ guide pages instead of a generic resource section.
- Keep visible copy concrete and keyword-relevant, but do not keyword-stuff.
- Structured data covers Organization, WebSite, and page-level WebPage/Breadcrumb context. Add Product or FAQ schema only when the published claims and attributes are sufficiently specific.
