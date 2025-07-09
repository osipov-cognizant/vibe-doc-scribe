# Animation Effects for APEX UI Components

This document outlines proposed animation effects for engaging web application components used throughout the APEX Process Excellence Analysis platform.

## Component Analysis & Animation Proposals

### 1. Landing Page Components

#### APEX Logo Background
**Component:** Large background text "APEX" (text-9xl)
**Current State:** Static large text with low opacity
**Proposed Animation:** 
- **Effect:** Subtle breathing/pulse effect
- **Duration:** 4000ms infinite
- **Transform:** `scale: 1 -> 1.02 -> 1`
- **Opacity:** `0.1 -> 0.15 -> 0.1`
- **Easing:** `ease-in-out`

#### Main Heading
**Component:** "Process Excellence Analysis" (text-2xl)
**Current State:** Static text
**Proposed Animation:**
- **Effect:** Gradient text shimmer
- **Duration:** 2000ms infinite
- **Background:** `linear-gradient(90deg, hsl(var(--foreground)) 25%, hsl(var(--primary)) 50%, hsl(var(--foreground)) 75%)`
- **Background-size:** `200% 100%`
- **Background-position:** `0% -> 200%`

#### URL Input Field
**Component:** Input field for company URL
**Current State:** Standard input with focus states
**Proposed Animation:**
- **Effect:** Glow effect on focus
- **Duration:** 300ms
- **Box-shadow:** `0 0 0 -> 0 0 20px hsl(var(--primary) / 0.3)`
- **Border:** Animated gradient border

#### "Let's Go" Button
**Component:** Submit button
**Current State:** Standard button with hover
**Proposed Animation:**
- **Effect:** Ripple effect on click + hover scale
- **Duration:** 600ms (ripple), 200ms (scale)
- **Transform:** `scale: 1 -> 1.05` on hover
- **Ripple:** Expanding circle from click point

### 2. Scope Page Components

#### Loading States
**Component:** Skeleton loading cards
**Current State:** Basic pulse animation
**Proposed Animation:**
- **Effect:** Wave shimmer across skeletons
- **Duration:** 1500ms infinite
- **Background:** `linear-gradient(110deg, hsl(var(--muted)) 8%, hsl(var(--muted-foreground) / 0.1) 18%, hsl(var(--muted)) 33%)`
- **Background-size:** `200% 100%`
- **Animation:** Wave motion from left to right

#### Company Name Reveal
**Component:** Dynamic company name heading
**Current State:** Appears instantly after loading
**Proposed Animation:**
- **Effect:** Type-writer effect with cursor
- **Duration:** 1000ms
- **Characters:** Appear one by one with blinking cursor
- **Easing:** `steps(n, end)` where n = character count

#### Activity Cards
**Component:** Process Excellence activity cards
**Current State:** Static cards with hover shadow
**Proposed Animation:**
- **Effect:** Staggered entrance + enhanced hover
- **Entrance Duration:** 400ms (staggered by 100ms per card)
- **Transform:** `translateY(20px) opacity(0) -> translateY(0) opacity(1)`
- **Hover:** `translateY(0) -> translateY(-4px)` + shadow enhancement
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)`

#### Active Card Indicator
**Component:** Primary colored border for "Agentify Customer Support"
**Current State:** Static border
**Proposed Animation:**
- **Effect:** Pulsing glow border
- **Duration:** 2000ms infinite
- **Box-shadow:** `0 0 0 hsl(var(--primary) / 0.3) -> 0 0 15px hsl(var(--primary) / 0.6)`

### 3. Support Queues Page Components

#### Tabs Animation
**Component:** Support Queues / AI Interventions tabs
**Current State:** Instant content switch
**Proposed Animation:**
- **Effect:** Slide transition between content
- **Duration:** 300ms
- **Transform:** `translateX(-20px) opacity(0) -> translateX(0) opacity(1)`

#### Relevance Matrix Toggles
**Component:** Circular toggle buttons in matrix
**Current State:** Instant color change
**Proposed Animation:**
- **Effect:** Bounce confirmation + color transition
- **Duration:** 400ms
- **Transform:** `scale(1) -> scale(1.2) -> scale(1)`
- **Color transition:** 200ms ease

#### Configuration Cards
**Component:** Support queue and intervention cards
**Current State:** Static layout
**Proposed Animation:**
- **Effect:** Hover lift with subtle rotation
- **Duration:** 200ms
- **Transform:** `translateY(0) rotate(0) -> translateY(-2px) rotate(0.5deg)`
- **Box-shadow:** Enhanced depth

### 4. Impact Rationale Page Components

#### Impact Percentage Inputs
**Component:** Number input fields for percentages
**Current State:** Standard inputs
**Proposed Animation:**
- **Effect:** Success flash on valid input
- **Duration:** 300ms
- **Background:** Brief flash of `hsl(var(--primary) / 0.1)`
- **Border:** Temporary glow

#### Rationale Cards
**Component:** Individual AI initiative impact cards
**Current State:** Static border cards
**Proposed Animation:**
- **Effect:** Expansion on focus + category color accent
- **Duration:** 250ms
- **Transform:** `scale(1) -> scale(1.02)`
- **Border-left:** `4px solid` with category color

#### Progress Indication
**Component:** Visual completion feedback
**Current State:** No progress indication
**Proposed Animation:**
- **Effect:** Progress bar fill animation
- **Duration:** 500ms
- **Width:** `0% -> percentage%` based on completed fields

### 5. Productivity Page Components

#### Statistics Cards
**Component:** Summary metric cards (scenarios count, etc.)
**Current State:** Static display
**Proposed Animation:**
- **Effect:** Count-up animation for numbers
- **Duration:** 1000ms
- **Numbers:** Animate from 0 to final value with easing
- **Easing:** `cubic-bezier(0.6, 0, 0.4, 1)`

#### Productivity Table Rows
**Component:** Final calculation table rows
**Current State:** Static table with hover background
**Proposed Animation:**
- **Effect:** Staggered row entrance + data highlight
- **Entrance Duration:** 600ms (staggered by 50ms per row)
- **Transform:** `translateX(-10px) opacity(0) -> translateX(0) opacity(1)`
- **Final Productivity:** Highlight animation on the calculated value

#### Methodology Accordion
**Component:** Calculation methodology explanation
**Current State:** Basic card
**Proposed Animation:**
- **Effect:** Smooth accordion expansion
- **Duration:** 400ms
- **Height:** Animated height expansion with content fade-in

### 6. Global Components

#### Breadcrumb Navigation
**Component:** Page navigation breadcrumbs
**Current State:** Static links
**Proposed Animation:**
- **Effect:** Active page highlight + hover underline
- **Duration:** 200ms
- **Underline:** Expand from center on hover
- **Transform:** `scaleX(0) -> scaleX(1)`

#### Toast Notifications
**Component:** Success/error toasts
**Current State:** Basic fade in/out
**Proposed Animation:**
- **Effect:** Slide in from top + exit to right
- **Entry Duration:** 300ms
- **Exit Duration:** 250ms
- **Entry:** `translateY(-100%) -> translateY(0)`
- **Exit:** `translateX(0) -> translateX(100%)`

#### Button Loading States
**Component:** All interactive buttons
**Current State:** Instant state changes
**Proposed Animation:**
- **Effect:** Spinner + pulse during loading
- **Duration:** Infinite while loading
- **Transform:** Spinner rotation + subtle button pulse

## Animation Timing & Easing Standards

### Standard Durations
- **Micro-interactions:** 150-200ms (hover, focus)
- **Element transitions:** 250-400ms (cards, inputs)
- **Page transitions:** 400-600ms (content changes)
- **Attention effects:** 1000-2000ms (shimmer, glow)

### Easing Functions
- **Standard:** `cubic-bezier(0.4, 0, 0.2, 1)` - Most UI transitions
- **Smooth:** `ease-in-out` - Breathing/pulse effects
- **Bounce:** `cubic-bezier(0.68, -0.55, 0.265, 1.55)` - Confirmation actions
- **Sharp:** `cubic-bezier(0.4, 0, 1, 1)` - Exit animations

## Implementation Notes

1. **Performance Considerations:**
   - Use `transform` and `opacity` for best performance
   - Avoid animating `width`, `height`, `top`, `left` when possible
   - Use `will-change` sparingly and remove after animation

2. **Accessibility:**
   - Respect `prefers-reduced-motion` for all animations
   - Provide instant alternatives for users with motion sensitivity
   - Ensure animations don't interfere with screen readers

3. **Progressive Enhancement:**
   - Base functionality works without animations
   - Animations enhance but don't break the experience
   - Graceful degradation for older browsers

4. **Semantic Design Tokens:**
   - Use CSS custom properties for animation values
   - Maintain consistency with design system colors
   - Easy theme switching support

This animation framework will create a polished, engaging user experience while maintaining professional functionality and accessibility standards.