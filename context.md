# AK Digital Studio — Brand Context, Design System & Architecture Specification

## 1. Agency Overview & Geographic Positioning
- **Brand Name:** AK Digital Studio
- **Tagline:** Research-driven. Scale-focused.
- **Headquarters:** HITEC City / Gachibowli Tech Corridor, Hyderabad, Telangana, India.
- **Global Reach:** Serving enterprise teams and venture-backed startups across North America (SF, NYC), Europe (London, Berlin, Zurich), APAC (Singapore, Tokyo), and India.
- **Core Market Focus:**
  1. **B2B Enterprise UX:** Complex operational consoles, fintech workflows, logistics dashboards, multi-tenant SaaS.
  2. **Funded Startup MVPs:** Day-zero architecture, investor-ready UI/UX, lean validation, high-velocity design sprints.
  3. **Design System Engineering:** Multi-brand token architecture, component libraries, Figma-to-code alignment (React, Web Components, Tailwind).
- **Core Value Proposition:** We bridge the chasm between deep ethnographic user research and rigorous engineering execution. No decorative fluff, no orphaned Figma files—only battle-tested interfaces engineered for measurable business ROI.

---

## 2. Color System & Design Tokens
Derived from the Figma *Landing Page / System Atlas (Inter · Existing Palette)* specification:

### Primary (Navy Brand)
- `Primary/Dark`: `#071A32` — Pressed states, high-contrast dark surfaces, hero accents.
- `Primary/Default`: `#0B2545` — Main brand CTA, primary headings, active tabs, keyboard focus outlines.
- `Primary/Light`: `#A1C3EB` — Hairline borders on dark cards, disabled navy surface tint.

### Secondary (Turquoise / Teal Brand)
- `Secondary/Dark`: `#00534B` — High-contrast hover states, readable teal typography on light backdrops.
- `Secondary/Default`: `#00A896` — Primary vibrant accent, secondary actions, badge highlights, active progress nodes.
- `Secondary/Light`: `#8BD8D0` — Subtle hover tint, accent badge backgrounds, interactive pill glows.

### Accent (Reserved Marine Teal)
- `Accent/Dark`: `#013D46` — High-tier emphasis, dark badge typography.
- `Accent/Default`: `#028090` — Reserved accent, metric highlights, data visualization nodes.
- `Accent/Light`: `#92D4DD` — Tinted chart backgrounds, soft highlight fills.

### Neutral Surfaces & Editorial Canvas
- `Canvas / Off-White`: `#F8FAFC` (Slate 50) — Dominant page background (60% rule).
- `Surface / White`: `#FFFFFF` — Elevated card backgrounds, modal dialogs, input fields.
- `Border / Slate`: `#E2E8F0` — 1px crisp structural hairline borders (no heavy drop shadows).
- `Text / Off-Black`: `#0F172A` / `#111111` — Primary headlines and body copy (minimum 4.5:1 WCAG AA).
- `Text / Muted Slate`: `#64748B` — Secondary descriptors, metadata, form labels.

### Semantic / Contextual States
- `Success/Dark`: `#16A34A` | `Success/Light`: `#F0FDF4`
- `Warning/Dark`: `#D97706` | `Warning/Light`: `#FFFBEB`
- `Error/Dark`: `#DC2626` | `Error/Light`: `#FEF2F2`
- `Info/Dark`: `#3B82F6` | `Info/Light`: `#EFF6FF`

---

## 3. Typography Scale & Hierarchy (Inter)
Strict editorial type system with zero layout wrapping bugs and minimum 14px floor:

| Role / Style | Desktop (D) | Mobile (M) | Weight | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display (XL)** | 64px / 70.4px | 40px / 44px | 700 (Bold) | -2% | Primary hero headline; single per page |
| **Hero Display (L)** | 52px / 59.8px | 36px / 41.4px | 700 (Bold) | -2% | Secondary hero / CTA statement |
| **Section Heading (H1)** | 40px / 48px | 30px / 36px | 700 (Bold) | -1.5% | Major section header |
| **Subsection (H2)** | 32px / 40px | 24px / 30px | 600 (SemiBold)| -1% | Feature groups & category subheads |
| **Card / Topic (H3)** | 24px / 31.2px | 20px / 26px | 600 (SemiBold)| 0 | Case study titles, bento headers |
| **Feature Title (H4)** | 20px / 27px | 18px / 24.3px| 500 (Medium) | 0 | FAQ questions, capability titles |
| **Lead Intro Body** | 20px / 32px | 18px / 28.8px| 400 (Regular)| 0 | Hero subtext, section thesis |
| **Body Large** | 18px / 28.8px| 16px / 25.6px| 400 (Regular)| 0 | Case study summaries |
| **Body Standard** | 16px / 24px | 15px / 22.5px| 400 (Regular)| 0 | General copy, answers, form inputs |
| **Primary Button** | 18px / 21.6px| 16px / 19.2px| 600 (SemiBold)| +1% | Primary interactive action buttons |
| **Secondary Button** | 16px / 19.2px| 15px / 18px | 500 (Medium) | 0 | Supporting actions, filters, tabs |
| **Kicker / Overline** | 14px / 19.6px| 13px / 18.2px| 700 (Bold) | +8% | Section category eyebrow (UPPERCASE) |
| **Caption / Badge** | 14px / 19.6px| 13px / 18.2px| 500 (Medium) | 0 | Metadata, author, micro-labels |
| **Footer Meta** | 14px / 21px | 13px / 19.5px| 400 (Regular)| 0 | Legal notes, copyright, disclaimers |

---

## 4. Spacing, Radii & Surface Rules
- **Spacing Scale:** `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `80px`, `96px`.
- **Corner Radii:**
  - `4px`: Checkboxes, micro-indicators.
  - `8px`: Buttons, text input controls, dropdowns.
  - `12px`: Focus ring offset bounds, nested sub-panels.
  - `16px`: Cards, bento modules, modal containers, notification banners.
  - `9999px`: Pills & interactive badge filters.
- **Borders & Elevation:**
  - Standard baseline: `1px solid var(--color-border-slate)` (`#E2E8F0`).
  - Active/Featured highlight: `2px solid var(--color-primary-default)` or `var(--color-secondary-default)`.
  - Level 0 Elevation: Flat surfaces with crisp hairline boundaries; no blurry drop shadows.

---

## 5. Information Architecture & Sitemap
```
akdigitalstudio.com
├── Navigation Bar (Sticky 3-Zone Top Bar Contract)
├── 01. Hero Section (Research-driven. Scale-focused. + Hyderabad HQ & Global Reach Trust Markers)
├── 02. Authority Metrics & Global Client Presence (HITEC City to SF, London, Singapore)
├── 03. Bento Grid: Core Pillars (Enterprise B2B, Day-Zero MVPs, Design System Engineering)
├── 04. Proof of Work / Case Studies (Fintech Treasury, AI Route Logistics, Aurora Token Atlas)
├── 05. Strategic Differentiation (Cognitive Load, Code-Aligned Tokens, ROI, Principal Access)
├── 06. Agile Workflow: "Create. Strategize. Scale." (4-Step Sprint Model)
├── 07. Full Service Directory (6 Specialized Capabilities)
├── 08. Interactive Project Scoping & Velocity Estimator
├── 09. Frequently Asked Questions (Accordion addressing timelines, IP, timezones, redesigns)
├── 10. High-Conversion CTA Banner & Booking Modal ("Book a 30-Min Discovery Call")
├── 11. Footer (Direct Contact, Socials, Hyderabad Location Badge, Legal, Link to Design System)
└── /design-system.html (Living UI Component Library & System Atlas)
```

---

## 6. GitHub Pages & Static Deployment Compatibility
- Pure semantic HTML5 (`index.html`, `design-system.html`).
- Relative asset paths (`./assets/...`, `./styles.css`, `./script.js`).
- Zero external build tool lock-in: works directly out-of-the-box in GitHub Pages, Apache, Nginx, or local browsers.
