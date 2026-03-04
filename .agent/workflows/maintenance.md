---
description: Portfolio
---

This workflow ensures any new additions or modifications to the portfolio maintain the "Premium Luxury" design system established.

### 1. Style Adherence
When adding new components, ALWAYS use the following design tokens from `globals.css`:
- **Background**: `#020617` (Deep Navy)
- **Primary Accent**: `#D4AF37` (Muted Gold)
- **Secondary Accent**: `#1E293B` (Accent Blue)
- **Font**: "Plus Jakarta Sans"

### 2. Component Structure
// turbo
1. Use the `premium-card` class for any new content containers.
2. Use `section-container` for new root-level sections to maintain consistent padding.
3. Ensure all interactive elements have a `transition-all duration-500` or higher for smooth feel.

### 3. Navigation Management
If adding a new page:
1. Create a new directory in `frontend/src/app/[pagename]/page.tsx`.
2. Wrap the content in the standard layout:
```tsx
<main className="min-h-screen bg-background selection:bg-gold/30 selection:text-gold relative">
    <div className="noise-overlay" />
    <BackgroundGlow />
    <Navbar />
    <div className="pt-32 pb-20 relative z-10">
        {/* Your Component */}
    </div>
    <Footer />
</main>
```
3. Update the `LINKS` array in `frontend/src/components/layout/Navbar.tsx`.

### 4. Build Validation
// turbo
1. Run `npm run build` in the `frontend` directory to ensure CSS arbitrary values (like shadows) are correctly parsed.
2. Check for "Failed to compile" errors specifically related to Tailwind CSS rules.

### 5. Deployment
// turbo
1. Push changes to the main branch.
2. Ensure environment variables (if any) are configured in the hosting provider (e.g., Vercel, Netlify).