# Kochbloggers Website - AI Agent Instructions

## Project Overview

This is a German recipe and cooking website for the domain `kochbloggers.de`. Currently a simple static HTML/CSS site with plans to evolve into a full recipe-hosting platform.

## Architecture & Structure

- **Static website**: Pure HTML/CSS, no framework dependencies
- **German-first content**: All user-facing text in German, maintain authentic German cooking terminology
- **Single page application**: Current design uses anchor navigation (`#home`, `#recipes`, etc.)
- **Mobile-responsive**: CSS Grid and Flexbox-based layout with mobile-first approach

## Key Files & Responsibilities

- `index.html`: Main page with semantic HTML5 structure, includes hero, recipes grid, about, contact
- `styles.css`: Complete styling with CSS custom properties, responsive breakpoints at 768px
- `DEPLOYMENT.md`: Strato.de-specific deployment instructions and troubleshooting

## Development Patterns

- **Color scheme**: Primary red `#e74c3c`, dark blue `#2c3e50`, light gray `#ecf0f1`
- **Typography**: System fonts (`Segoe UI` family) for consistency and performance
- **Recipe cards**: Grid layout with hover animations, consistent 300px min-width
- **German content structure**: Use cooking emoji (🍳), German recipe terminology, metric measurements

## Deployment Workflow

- **Target platform**: Strato.de shared hosting
- **Upload location**: `www/` or `public_html/` directory via FTP or file manager
- **File permissions**: 644 for files, 755 for directories
- **No build process**: Direct file upload, no compilation needed

## Content Guidelines

- **Language**: German language for all user content, English for code/technical docs
- **Recipe focus**: Use authentic German recipe names and cooking methods
- **Placeholder images**: Currently using placeholder.com, replace with real recipe photos
- **SEO considerations**: German meta descriptions, cooking-related keywords

## Future Architecture Notes

- **Planned evolution**: Recipe database, user submissions, search functionality
- **Content management**: Currently static, consider headless CMS integration later
- **Performance**: Keep images optimized, consider lazy loading for recipe galleries
- **Accessibility**: Maintain semantic HTML, ensure keyboard navigation works

## Common Tasks

- **Adding recipes**: Duplicate `.recipe-card` structure in `index.html`
- **Styling updates**: Modify CSS custom properties for global color changes
- **Mobile testing**: Check responsive behavior at 768px breakpoint
- **German localization**: Ensure all new content follows German grammar and cooking conventions

## External Dependencies

- None currently (intentionally dependency-free for simplicity)
- Placeholder images from via.placeholder.com (replace in production)
- Consider Google Fonts integration for custom typography if needed
