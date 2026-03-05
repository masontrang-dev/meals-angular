# WeekPrep Styling Guidelines

## Overview

This document defines the styling standards and conventions for the WeekPrep meal planning application. Following these guidelines ensures a consistent, modern, and maintainable UI across the entire application.

---

## 🎨 Design System

### CSS Variables

All styling uses CSS variables defined in `src/styles.css` for consistency and easy theming.

#### Spacing Scale
```css
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-5: 1.25rem;  /* 20px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-10: 2.5rem;  /* 40px */
--spacing-12: 3rem;    /* 48px */
```

**Usage:**
- Use spacing variables instead of hardcoded values
- Maintain consistent spacing throughout the app
- Example: `padding: var(--spacing-4);`

#### Typography Scale
```css
--font-size-xs: 0.75rem;   /* 12px */
--font-size-sm: 0.875rem;  /* 14px */
--font-size-base: 1rem;    /* 16px */
--font-size-lg: 1.125rem;  /* 18px */
--font-size-xl: 1.25rem;   /* 20px */
--font-size-2xl: 1.5rem;   /* 24px */
--font-size-3xl: 1.875rem; /* 30px */
--font-size-4xl: 2.25rem;  /* 36px */
```

**Font Weights:**
```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

**Line Heights:**
```css
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

#### Color Palette

**Primary Colors:**
```css
--color-primary: #007bff;
--color-primary-hover: #0056b3;
--color-primary-light: rgba(0, 123, 255, 0.1);
```

**Grayscale:**
```css
--color-white: #ffffff;
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827;
```

**Semantic Colors:**
```css
--color-success: #10b981;
--color-success-hover: #059669;
--color-danger: #ef4444;
--color-danger-hover: #dc2626;
--color-warning: #f59e0b;
--color-info: #3b82f6;
```

#### Border Radius
```css
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.375rem;  /* 6px */
--radius-lg: 0.5rem;    /* 8px */
--radius-xl: 0.75rem;   /* 12px */
--radius-2xl: 1rem;     /* 16px */
--radius-full: 9999px;  /* Fully rounded */
```

#### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

#### Transitions
```css
--transition-fast: 150ms ease-in-out;
--transition-base: 200ms ease-in-out;
--transition-slow: 300ms ease-in-out;
```

#### Z-Index Scale
```css
--z-base: 1;
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal-backdrop: 1040;
--z-modal: 1050;
--z-popover: 1060;
--z-tooltip: 1070;
```

---

## 📐 Layout Patterns

### Container Widths
```css
max-width: 1200px;  /* Main content container */
margin: 0 auto;     /* Center alignment */
padding: 0 var(--spacing-4); /* Horizontal padding */
```

### Grid Layouts
```css
display: grid;
gap: var(--spacing-4);
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
```

### Flexbox Patterns
```css
/* Horizontal centering */
display: flex;
justify-content: center;
align-items: center;

/* Space between items */
display: flex;
justify-content: space-between;
align-items: center;
gap: var(--spacing-3);
```

---

## 🎯 Component Patterns

### Buttons

**Primary Button:**
```css
.btn-primary {
  padding: var(--spacing-3) var(--spacing-5);
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
}

.btn-primary:hover {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-primary:active {
  transform: translateY(0);
}
```

**Secondary Button:**
```css
.btn-secondary {
  background: var(--color-gray-200);
  color: var(--color-gray-700);
}

.btn-secondary:hover {
  background: var(--color-gray-300);
}
```

**Danger Button:**
```css
.btn-danger {
  background: var(--color-danger);
  color: var(--color-white);
}

.btn-danger:hover {
  background: var(--color-danger-hover);
}
```

### Cards

```css
.card {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-4);
  transition: all var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Modals

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  backdrop-filter: blur(4px);
  animation: fadeIn var(--transition-base);
}

.modal-content {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp var(--transition-base);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

### Form Inputs

```css
.form-input {
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--color-gray-300);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  transition: all var(--transition-base);
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-light);
}

.form-label {
  display: block;
  margin-bottom: var(--spacing-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-700);
}
```

---

## 🎭 Animation Guidelines

### Hover Effects
- Use `transform: translateY(-1px)` for subtle lift
- Add `box-shadow` increase on hover
- Keep transitions smooth with `var(--transition-base)`

### Loading States
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading {
  animation: spin 1s linear infinite;
}
```

### Fade In/Out
```css
.fade-in {
  animation: fadeIn var(--transition-base);
}

.fade-out {
  animation: fadeOut var(--transition-base);
}
```

---

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile: < 768px */
/* Tablet: 768px - 1200px */
/* Desktop: > 1200px */

@media (max-width: 768px) {
  /* Mobile styles */
  .container {
    padding: var(--spacing-3);
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
}
```

### Mobile-First Approach
- Write base styles for mobile
- Use `@media (min-width: ...)` for larger screens
- Test on multiple device sizes

---

## ♿ Accessibility

### Focus States
```css
button:focus,
input:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### ARIA Labels
- Always include `aria-label` for icon-only buttons
- Use `aria-describedby` for additional context
- Include `role` attributes where appropriate

### Color Contrast
- Ensure text meets WCAG AA standards (4.5:1 ratio)
- Use `--color-gray-700` or darker for body text
- Use `--color-white` on dark backgrounds

---

## 🚫 Anti-Patterns (Avoid These)

### ❌ Don't Use:
- Hardcoded pixel values: `padding: 16px;`
- Inline styles: `style="color: blue;"`
- `!important` (except for utility classes)
- Magic numbers without comments
- Nested selectors more than 3 levels deep

### ✅ Do Use:
- CSS variables: `padding: var(--spacing-4);`
- Component classes: `class="btn-primary"`
- Specific selectors with low specificity
- Commented complex calculations
- Flat, maintainable selectors

---

## 📝 Naming Conventions

### BEM-Inspired
```css
.component-name { }
.component-name__element { }
.component-name--modifier { }
```

**Example:**
```css
.meal-slot { }
.meal-slot__content { }
.meal-slot--empty { }
.meal-slot--filled { }
```

### Utility Classes
```css
.text-center { text-align: center; }
.mt-4 { margin-top: var(--spacing-4); }
.flex { display: flex; }
.hidden { display: none; }
```

---

## 🔧 Tools & Workflow

### CSS Organization
1. **Variables** - At the top of `styles.css`
2. **Reset/Base** - Normalize styles
3. **Layout** - Grid, flexbox utilities
4. **Components** - Reusable component styles
5. **Utilities** - Helper classes
6. **Media Queries** - Responsive overrides

### File Structure
```
src/
├── styles.css (global variables & utilities)
├── app/
│   ├── app.css (app shell styles)
│   └── components/
│       └── component-name/
│           └── component-name.component.css
```

---

## 📚 Examples

### Complete Button Example
```css
.btn {
  padding: var(--spacing-3) var(--spacing-5);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
  font-family: inherit;
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn:active:not(:disabled) {
  transform: translateY(0);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Complete Card Example
```css
.recipe-card {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: all var(--transition-base);
  cursor: pointer;
}

.recipe-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.recipe-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.recipe-card__content {
  padding: var(--spacing-4);
}

.recipe-card__title {
  margin: 0 0 var(--spacing-2) 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
}
```

---

## 🎓 Best Practices

1. **Use CSS Variables** - Always prefer variables over hardcoded values
2. **Mobile-First** - Start with mobile styles, enhance for desktop
3. **Consistent Spacing** - Use the spacing scale consistently
4. **Smooth Transitions** - Add transitions to interactive elements
5. **Semantic Colors** - Use semantic color variables (success, danger, etc.)
6. **Accessibility** - Include focus states and ARIA labels
7. **Performance** - Avoid expensive properties (box-shadow on scroll, etc.)
8. **Maintainability** - Keep selectors simple and flat

---

## 🔄 Updates

This document should be updated when:
- New CSS variables are added
- New component patterns emerge
- Design system changes
- New best practices are discovered

**Last Updated**: March 2026
**Version**: 1.0.0
