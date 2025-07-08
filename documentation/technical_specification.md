# APEX (Automated Process Excellence) - Technical Specification

## 1. Overview

APEX is a web-based application designed to streamline process excellence workflows. It leverages Large Language Models (LLMs) to analyze company websites, identify areas for improvement, and quantify the potential impact of AI-driven interventions. The application is built using React and TypeScript.

## 2. Application Architecture

-   **Frontend:** Next.js 15.3.3, React 19.0.0, Vite, TypeScript 5, Tailwind CSS 4, ShadCN UI, Radix UI, Lucide Icons
-   **Backend:** Node.js (assumed), responsible for LLM integration and business logic computation.
-   **LLM:** Google Gemini 2.5 Pro (or a compatible model).

## 3. User Experience and Workflow

The application uses a multi-tab, workflow-oriented interface. Each workflow is a separate, non-persistent session initiated from the landing page.

### 3.1. Landing Page

-   **Layout:** A minimalist design similar to a search engine. A single text input box is centered on the page. The "APEX" logo will be displayed subtly in the background (e.g., light gray).
-   **Functionality:**
    -   The text box prompts the user to enter a company website URL.
    -   A "Let's Go" button is positioned next to the text box.
-   **Input Validation:**
    -   The input must be a valid URL format.
    -   The URL must only contain the domain name (subdomains are permitted, e.g., `www.corp.ibm.com`).
    -   The URL must not contain any paths (e.g., `google.com/ads` is invalid).

### 3.2. Session Management

-   Each click on the "Let's Go" button initiates a new, independent session in a new tab.
-   Sessions are concurrent, allowing for parallel workflows.
-   Session state is not persistent and will be lost upon reloading the browser.

### 3.3. Core Workflow

The core workflow is guided by a breadcrumb navigation system.

#### 3.3.1. Scope Page

-   **Breadcrumb:** `Start ({url}) > Scope`
-   **Trigger:** Clicking "Let's Go" on the landing page.
-   **Backend Process:**
    -   The backend connects to the LLM.
    -   The LLM is prompted to crawl the provided URL to extract the legal company name (from "Terms & Conditions", "Privacy Policy", etc.) and generate a summary of the company's products and offerings.
-   **UI Components:**
    -   **Company Name:** Displayed as a title.
    -   **Scope Description:** An editable text area pre-filled with the LLM-generated summary of the company's products and offerings.
    -   **Activity Tiles:** A collection of square tiles representing different process excellence activities.
        -   **"Agentify Customer Support":** Active and clickable. Features a settings icon for configuration.
        -   **"Transform Go To Market":** Inactive (grayed out). Clicking it shows a "Coming Soon" message.
        -   **"+ Tile":** Inactive, for future expansion in order to enable addition of more process excellence activities. Clicking it shows a "Coming Soon" message.


#### 3.3.1.1 Tile Configuration (Agentify Customer Support)

-   **Trigger:** Clicking the settings icon on the "Agentify Customer Support" tile.
-   **Functionality:** A modal or separate page to configure the properties of AI interventions.
-   **Configurable Fields:**
    -   **Implementation Complexity:**
        -   `Quick Win`: 2-4 months
        -   `Moderate`: 4-6 months
        -   `High`: 6-9+ months
    -   **AI Initiative Category (Color-coded):**
        -   `Copilot Agent`: 10% Productivity, Blue
        -   `Autonomous Agent`: 40% Productivity, Green
        -   `Robotic Process Automation`: 20% Productivity, Light Red/Coral

#### 3.3.2. Support Queues Page (Agentify Customer Support)

-   **Breadcrumb:** `Start ({url}) > Scope (Agentify Customer Support) > Support Queues`
-   **Trigger:** Clicking the "Agentify Customer Support" tile.
-   **Backend Process:**
    -   The LLM is prompted to generate a list of potential customer support queues based on the company's scope description.
    -   The LLM is prompted to propose relevant AI interventions for the identified support queues.
-   **UI Components:**
    -   **Main Table:** A matrix with AI Interventions as rows and Support Queues as columns.
        -   By default, all interventions are relevant to all queues.
        -   Users can click a cell to "turn off" the relevance of an intervention for a specific queue, which sets its impact to 0.
    -   **Configuration Tabs (below the main table):**
        -   **Support Queues Tab:** Allows editing of a one-liner description for each queue.
        -   **AI Interventions Tab:** Allows editing of a one-liner description, implementation complexity, and category for each intervention.

#### 3.3.4. Impact Rationale Page

-   **Breadcrumb:** `Start ({url}) > Scope (Agentify Customer Support) > Support Queues ({count}) > Impact Rationale`
-   **Trigger:** Clicking "Next" on the Support Queues page.
-   **Backend Process:**
    -   The LLM is prompted to populate a table that estimates the impact of each relevant AI intervention on each support queue.
-   **UI Components:**
    -   **Impact Table:** An editable table with four columns:
        1.  `AI Initiative`
        2.  `Support Queue`
        3.  `Impact Percentage` (0-100%)
        4.  `Rationale` (text description of why the impact is what it is).

#### 3.3.5. Productivity Page

-   **Breadcrumb:** `Start ({url}) > Scope (Agentify Customer Support) > ... > Impact Rationale > Productivity`
-   **Trigger:** Clicking "Next" on the Impact Rationale page.
-   **Backend Process:**
    1.  **Softmax Calculation:** Compute a matrix of productivity impact factors from the user-edited `Impact Percentage` values. The softmax function is applied such that the sum of impacts for each AI initiative across all support queues equals 100%.
    2.  **Productivity Gain:** Apply a predefined productivity gain percentage based on the AI initiative's category (e.g., "Copilot Agent" might have a 10% gain).
    3.  **Final Calculation:** Multiply the productivity gain by the softmax impact factor matrix to generate a final productivity table.
-   **UI Components:**
    -   A read-only table displaying the final calculated productivity impact for each intervention on each queue.
