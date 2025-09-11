# DD_TryBeforeBy Design Guidelines

## Design Approach
**System-Based Approach**: Using ViennaUI design system with Raiffeisen Bank branding to maintain consistency across enterprise application components while ensuring professional, data-focused interface design.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Raiffeisen Yellow: `45 100% 50%` (primary brand color)
- Deep Black: `0 0% 8%` (primary text and headers)
- Pure White: `0 0% 100%` (backgrounds and contrast)

**Supporting Colors:**
- Light Gray: `0 0% 96%` (subtle backgrounds)
- Medium Gray: `0 0% 64%` (secondary text)
- Border Gray: `0 0% 88%` (dividers and borders)
- Success Green: `142 76% 36%` (status indicators)
- Warning Orange: `25 95% 53%` (alerts)
- Error Red: `0 84% 60%` (validation errors)

### B. Typography
- **Primary Font**: System fonts via ViennaUI (Roboto/Inter fallbacks)
- **Headings**: Semi-bold weights (600) for section titles
- **Body Text**: Regular weight (400) for content
- **Labels**: Medium weight (500) for form labels and table headers

### C. Layout System
**Spacing Units**: Consistent 8px grid system using Tailwind units of 2, 4, 6, and 8
- `p-2` (8px): Tight spacing within components
- `p-4` (16px): Standard component padding
- `p-6` (24px): Section spacing
- `p-8` (32px): Major layout divisions

### D. Component Library

**Navigation:**
- Fixed left sidebar (240px width) with yellow accent stripe
- Menu items with hover states and active indicators
- Collapsible sub-menus for hierarchical navigation

**Data Tables:**
- Clean row dividers with alternating backgrounds
- Sortable column headers with ViennaUI icons
- Multi-select checkboxes with yellow accent color
- Status badges with semantic colors
- Pagination controls at bottom

**Forms:**
- ViennaUI input components with proper spacing
- Consistent label placement above inputs
- Yellow focus states matching brand
- Clear validation messaging

**Buttons:**
- Primary: Yellow background with dark text
- Secondary: White background with yellow border
- Danger: Red background for destructive actions

**Status Indicators:**
- Color-coded badges for different states
- Consistent sizing and typography
- Clear visual hierarchy

### E. Layout Structure

**Authentication Page:**
- Centered login form with Raiffeisen branding
- Clean white background with subtle shadows
- Yellow CTA button for login action

**Main Application:**
- Fixed left sidebar navigation
- Main content area with consistent padding
- Breadcrumb navigation below header
- Table views with filters and search functionality

**Data Management:**
- List views with consistent table layouts
- Filter panels that can expand/collapse
- Action buttons positioned consistently
- Export and bulk action capabilities

### Visual Hierarchy
- Use yellow sparingly for primary actions and brand elements
- Maintain high contrast for readability
- Consistent spacing between related elements
- Clear visual separation between different content sections

### Interaction Patterns
- Hover states for all interactive elements
- Loading states for data fetching
- Clear feedback for user actions
- Consistent iconography from ViennaUI library

This design approach ensures a professional, enterprise-grade application that maintains Raiffeisen's brand identity while providing excellent usability for procurement management tasks.