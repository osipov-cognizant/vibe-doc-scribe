# APEX Application - Page Layouts Documentation

This document provides ASCII art representations of the key user interface components and layouts for each page in the APEX Process Excellence Analysis application.

## Table of Contents
1. [Landing Page](#landing-page)
2. [Scope Page](#scope-page)
3. [Support Queues Page](#support-queues-page)
4. [Impact Rationale Page](#impact-rationale-page)
5. [Productivity Page](#productivity-page)

---

## Landing Page

The landing page serves as the entry point for the application where users input a company website URL to begin analysis.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FULL SCREEN LAYOUT                               │
│                                                                             │
│                                                                             │
│                         A   P   E   X                                      │
│                   (Large watermark background)                             │
│                                                                             │
│                                                                             │
│                   ┌─────────────────────────────┐                          │
│                   │   Process Excellence        │                          │
│                   │      Analysis               │                          │
│                   │                             │                          │
│                   │ Enter a company website     │                          │
│                   │ to begin analysis           │                          │
│                   │                             │                          │
│                   │ ┌─────────────┐ ┌────────┐ │                          │
│                   │ │company.com  │ │Let's Go│ │                          │
│                   │ └─────────────┘ └────────┘ │                          │
│                   │                             │                          │
│                   │ Enter only the domain name  │                          │
│                   │ (e.g., google.com)          │                          │
│                   └─────────────────────────────┘                          │
│                                                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Key Components:
- **Background Logo**: Large "APEX" text as watermark
- **Main Form**: Centered card with URL input and submit button
- **Input Field**: Text input for company domain
- **Submit Button**: "Let's Go" action button
- **Help Text**: Guidance for URL format

---

## Scope Page

The scope page displays company information and available process excellence activities after analyzing the provided URL.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Start (company.com) > Scope                                                │
│                                                                             │
│ COMPANY CORP                                                               │
│                                                                             │
│ Scope Description                                                           │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ [Large textarea with company description]                               │ │
│ │ Technology company offering various software solutions...               │ │
│ │                                                                         │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ Process Excellence Activities                                               │
│                                                                             │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐               │
│ │ Agentify        │ │ Transform       │ │ Add Activity    │               │
│ │ Customer Support│ │ Go To Market    │ │      +          │               │
│ │              ⚙️ │ │  (Coming Soon)  │ │  (Coming Soon)  │               │
│ │                 │ │                 │ │                 │               │
│ │ Transform cust- │ │ Optimize sales  │ │ Add more process│               │
│ │ omer support... │ │ and marketing...│ │ excellence...   │               │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Key Components:
- **Breadcrumb Navigation**: Shows current path
- **Company Name**: Large heading with generated company name
- **Scope Description**: Editable textarea with AI-generated description
- **Activity Cards**: Three cards showing available process excellence activities
  - Active card (Agentify) with settings button
  - Inactive cards (grayed out) for future features
- **Settings Button**: Gear icon for configuration

---

## Support Queues Page

The support queues page allows configuration of support queues and AI interventions with a relevance matrix. Users can add and delete both support queues and AI interventions dynamically.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Start (company.com) > Scope > Support Queues                    [Next] │
│                                                                             │
│ Support Queues & AI Interventions                                          │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │                    Intervention Relevance Matrix                        │ │
│ │                                                                         │ │
│ │ AI Intervention    │Technical│Billing│General│Enterprise│              │ │
│ │ ───────────────────┼─────────┼───────┼───────┼──────────┤              │ │
│ │ 🔵 AI Chatbot      │    ✓    │   ✓   │   ✓   │    ✓     │              │ │
│ │ 🟢 Smart Routing   │    ✓    │   ✓   │   ✓   │    ✓     │              │ │
│ │ 🔴 Auto Responses  │    ✓    │   ✓   │   ✓   │    ✓     │              │ │
│ │ 🟢 Sentiment       │    ✓    │   ✓   │   ✓   │    ✓     │              │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌─Support Queues─┐ ┌─AI Interventions─┐                                    │
│ │                │ │                  │                                    │
│ │ ┌─────────────┐ │ │ ┌──────────────┐ │                                    │
│ │ │ Technical ❌│ │ │ │ 🔵 AI Chat❌ │ │                                    │
│ │ │ Support     │ │ │ │ Description  │ │                                    │
│ │ │ [desc...]   │ │ │ │ Complexity   │ │                                    │
│ │ └─────────────┘ │ │ │ Category     │ │                                    │
│ │                 │ │ │ Badges       │ │                                    │
│ │ ┌─────────────┐ │ │ └──────────────┘ │                                    │
│ │ │ Billing  ❌ │ │ │                  │                                    │
│ │ │ Inquiries   │ │ │ ┌──────────────┐ │                                    │
│ │ │ [desc...]   │ │ │ │ 🟢 Smart  ❌ │ │                                    │
│ │ └─────────────┘ │ │ │ Routing...   │ │                                    │
│ │                 │ │ └──────────────┘ │                                    │
│ │ ┌─────────────┐ │ │                  │                                    │
│ │ │   Add New   │ │ │ ┌──────────────┐ │                                    │
│ │ │ Queue   +   │ │ │ │   Add New    │ │                                    │
│ │ │             │ │ │ │Intervention +│ │                                    │
│ │ └─────────────┘ │ │ └──────────────┘ │                                    │
│ └─────────────────┘ │ └──────────────┘ │                                    │
│                     └──────────────────┘                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Key Components:
- **Header**: Title with "Next" button
- **Relevance Matrix**: Interactive grid showing AI intervention applicability to support queues
  - Automatically updates when queues or interventions are added/deleted
- **Tabs**: Toggle between "Support Queues" and "AI Interventions"
- **Support Queue Cards**: 
  - Editable descriptions for each queue
  - Delete button (❌) to remove queue and its matrix column
  - "Add New Queue" card with plus icon for creating new queues
- **AI Intervention Cards**: 
  - Color-coded by category (🔵 Copilot, 🟢 Autonomous, 🔴 RPA)
  - Editable descriptions, complexity, and category
  - Delete button (❌) to remove intervention and its matrix row
  - "Add New Intervention" card with plus icon for creating new interventions
  - Badges showing timeline and productivity impact

### Dynamic Functionality:
- **Add Support Queue**: Creates new queue with default name and description
- **Delete Support Queue**: Removes queue and corresponding matrix column
- **Add AI Intervention**: Creates new intervention with selectable category
- **Delete AI Intervention**: Removes intervention and corresponding matrix row
- **Matrix Synchronization**: Relevance matrix automatically adjusts when items are added/deleted

---

## Impact Rationale Page

The impact rationale page provides detailed assessment of how each AI intervention affects each support queue.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Start > Scope > Support Queues (4) > Impact Rationale            [Next] │
│                                                                             │
│ Impact Rationale                                                           │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │                    AI Initiative Impact Assessment                      │ │
│ │                                                                         │ │
│ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ 🔵 AI Chatbot on Technical Support                                  │ │ │
│ │ │                                                                     │ │ │
│ │ │ Impact: [45]% │ Rationale: [Large textarea]                        │ │ │
│ │ │               │ Can handle 45% of common technical queries...      │ │ │
│ │ │               │                                                     │ │ │
│ │ └─────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                         │ │
│ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ 🔵 AI Chatbot on Billing Inquiries                                 │ │ │
│ │ │                                                                     │ │ │
│ │ │ Impact: [60]% │ Rationale: [Large textarea]                        │ │ │
│ │ │               │ Most billing questions are straightforward...       │ │ │
│ │ │               │                                                     │ │ │
│ │ └─────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                         │ │
│ │ [Additional intervention cards continue...]                             │ │
│ │                                                                         │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Key Components:
- **Impact Cards**: Each card represents one AI intervention on one support queue
- **Header Row**: Shows intervention name with category indicator and target queue
- **Impact Percentage**: Numeric input field (0-100%)
- **Rationale**: Large textarea for detailed explanation
- **Color Coding**: Consistent with previous pages for AI categories

---

## Productivity Page

The final productivity page displays calculated results using softmax normalization and productivity gains.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Start > Scope > Support Queues > Impact > Productivity  [Start New Analysis]│
│                                                                             │
│ Final Productivity Analysis                                                │
│                                                                             │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐               │
│ │     16     │ │     8      │ │     4      │ │     4      │               │
│ │  Impact    │ │Autonomous  │ │  Copilot   │ │    RPA     │               │
│ │ Scenarios  │ │  Agents    │ │  Agents    │ │ Solutions  │               │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘               │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │               Final Productivity Impact Calculation                     │ │
│ │                                                                         │ │
│ │ AI Initiative     │Support Queue │Category │Impact%│Gain%│Final Result │ │
│ │ ──────────────────┼──────────────┼─────────┼───────┼─────┼─────────────│ │
│ │ 🔵 AI Chatbot     │Technical     │Copilot  │  45   │ 10  │    4.50%   │ │
│ │ 🔵 AI Chatbot     │Billing       │Copilot  │  60   │ 10  │    6.00%   │ │
│ │ 🔵 AI Chatbot     │General       │Copilot  │  70   │ 10  │    7.00%   │ │
│ │ 🔵 AI Chatbot     │Enterprise    │Copilot  │  25   │ 10  │    2.50%   │ │
│ │ 🟢 Smart Routing  │Technical     │Auto     │  80   │ 40  │   32.00%   │ │
│ │ 🟢 Smart Routing  │Billing       │Auto     │  90   │ 40  │   36.00%   │ │
│ │ [Additional rows continue...]                                           │ │
│ │                                                                         │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │                      Calculation Methodology                           │ │
│ │                                                                         │ │
│ │ 1. Softmax Normalization                                               │ │
│ │    Impact percentages normalized across support queues                 │ │
│ │                                                                         │ │
│ │ 2. Productivity Gain Application                                       │ │
│ │    🔵 Copilot: 10%  🟢 Autonomous: 40%  🔴 RPA: 20%                  │ │
│ │                                                                         │ │
│ │ 3. Final Calculation                                                   │ │
│ │    Final = (Normalized Impact × Productivity Gain) ÷ 100              │ │
│ │                                                                         │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Key Components:
- **Summary Cards**: Four metric cards showing totals by category
- **Results Table**: Comprehensive table with all calculations
  - AI Initiative with category indicator
  - Support Queue name
  - Category badge
  - Impact percentage
  - Productivity gain percentage
  - Final calculated result
- **Methodology Card**: Explanation of calculation approach
- **Start New Button**: Link to begin another analysis

---

## Common Elements Across All Pages

### Breadcrumb Navigation
```
Start (company.com) > Scope > Support Queues > Impact Rationale > Productivity
```
- Shows full navigation path
- Each step is clickable (except current page)
- Company URL shown in first breadcrumb

### Loading States
```
┌─────────────────────────────────────────────────┐
│                                                 │
│          ████████████████████                  │
│          Analyzing and generating...            │
│                                                 │
│  ████  ████████████████  ████████████████      │
│                                                 │
│  Status message describing current operation    │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Color Coding System
- **🔵 Blue**: Copilot Agent (10% productivity gain)
- **🟢 Green**: Autonomous Agent (40% productivity gain)
- **🔴 Red**: Robotic Process Automation (20% productivity gain)

### Typography Hierarchy
- **Page Titles**: Large, bold headings
- **Section Titles**: Medium headings
- **Card Titles**: Smaller headings with icons
- **Body Text**: Regular weight, readable size
- **Muted Text**: Secondary information and help text

This documentation provides a comprehensive overview of the visual structure and key interface components for each page in the APEX application.