# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MTG Pau is a landing page for a Magic: The Gathering association in Pau, France. The site is built with Vue 3, TypeScript, and Vite, and deployed to GitHub Pages.

## Development Commands

This project uses [just](https://github.com/casey/just) as a command runner. All commands should be run from the project root:

```bash
just install          # Install dependencies
just dev              # Run development server (frontend)
just build            # Build for production
just preview          # Preview production build locally
just lint             # Run ESLint
just format           # Format code with Prettier
just type-check       # Run TypeScript type checking
just check            # Run all checks (lint, format, type-check, build)
just clean            # Remove build artifacts and node_modules
```

### SEO File Generation

```bash
just generate-seo                              # Generate with default domain
just generate-seo-custom https://www.mtgpau.fr # Generate with custom domain
```

SEO files (robots.txt and sitemap.xml) are automatically generated before every build via the `prebuild` hook.

**Note**: All npm scripts run in the `frontend/` directory. Direct npm commands require `cd frontend` first.

## Architecture

### Data-Driven Content System

The entire site content is centralized in `/frontend/src/data/data.json`. This JSON file contains all text, event information, contact details, and SEO metadata for the application.

- **DataService** (`/frontend/src/services/dataService.ts`): Singleton service providing dot-notation access to data.json (e.g., `dataService.get('about.hero.title')`)
- Components and views fetch content via DataService rather than hardcoding text
- Photo gallery data is separate in `/frontend/src/data/photos.json`

### SEO & Structured Data

The site has comprehensive SEO support:

- **useSeo composable** (`/frontend/src/composables/useSeo.ts`): Manages meta tags (standard, Open Graph, Twitter Card) and canonical URLs dynamically per page
- **useStructuredData composable** (`/frontend/src/composables/useStructuredData.ts`): Provides JSON-LD schemas:
  - `useOrganizationSchema()`: Organization schema for the association
  - `useEventsSchema()`: Event schemas for regular events
  - `useCREventSchema()`: Specific schema for CR Aquitaine tournament
  - `useOpenQualifierEventSchema()`: Schema for Open Qualifier CDF

Views call these composables in their setup functions to inject structured data and meta tags.

### Routing & Views

- Router: `/frontend/src/router/index.ts`
- Views: `/frontend/src/views/` (HomeView, AboutView, EventsView, ContactView, CRView, OpenQualifierCDFView)
- Route meta includes page titles, which are applied via `router.afterEach()` hook
- Lazy-loaded routes (all except HomeView) for code splitting

### Component Structure

```
/frontend/src/
├── components/
│   ├── AppHeader.vue          # Main navigation header
│   ├── AppFooter.vue          # Site footer
│   ├── PhotoGallery.vue       # Gallery grid component
│   ├── PhotoLightbox.vue      # Full-screen photo viewer
│   └── SecondaryTournament.vue # Reusable extra tournament display
├── views/                     # Page-level components
├── composables/               # Vue composables (SEO, structured data)
├── services/                  # DataService singleton
├── types/                     # TypeScript interfaces
├── data/                      # JSON data files
└── assets/                    # Static assets (images, CSS)
```

#### SecondaryTournament Component

The `SecondaryTournament.vue` component is used in OpenQualifierCDFView to display flexible extra tournaments:

- **Data Source**: `openQualifierCDF.extraTournaments` array in data.json
- **Props**: Accepts `ExtraTournament` object with title, date, details (price, startTime, location), prizePool, and registration URL
- **Behavior**: Component is rendered via `v-for` loop; empty array hides section entirely
- **Styling**: Less prominent than main events (lighter backgrounds, subtle borders, no gradients)
- **Color Palette**:
  - Labels (Date, Participation, etc.): `--color-primary` (orange)
  - Values: `--color-text-soft` (grey)
  - Matches main event styling for consistency

### Type System

All data types are defined in `/frontend/src/types/data.ts`. Key interfaces:
- `Event`, `Hero`, `Feature`, `Format`
- `CRDetails`, `OpenQualifierDetails` (event-specific)
- `ExtraTournament`, `ExtraTournamentDetails` (extra tournaments)
- `PrizePool` (prize structure, supports both `number` and `string` for playerCount)
- `General`, `Contact` (site-wide metadata)
- `UnityLeague` (partnership information)
- `SideEvent`, `Sponsor`, `Prerequisite` (event components)

Photos use `/frontend/src/types/photo.ts` with `Photo` interface.

**Important**: When adding new data structures to data.json, always update TypeScript types first to maintain type safety.

## Build Configuration

- **Vite Config**: `/frontend/vite.config.ts`
  - Base path: `/mtgpau/` (for GitHub Pages)
  - Alias: `@` → `/frontend/src`
  - Output: `/frontend/dist`
- **TypeScript**: Standard Vue 3 + TypeScript setup with `vue-tsc` for type checking
- **Node Version**: Requires Node.js ≥24.0.0

## Deployment

Automatic deployment via GitHub Actions (`.github/workflows/*.yml`):
- Triggers on push to `main` branch
- Builds frontend with Node.js 24
- Deploys to GitHub Pages

**Important**: Do not manually deploy. Push to `main` triggers automatic deployment.

## Content Updates

To update site content:
1. Edit `/frontend/src/data/data.json` for text, events, or metadata
2. Edit `/frontend/src/data/photos.json` for photo gallery
3. TypeScript types in `/frontend/src/types/data.ts` provide structure validation
4. DataService automatically exposes changes to all components

### Managing Extra Tournaments

Extra tournaments on the Open Qualifier page are managed through data.json:

**Add a tournament**: Add object to `openQualifierCDF.extraTournaments` array
```json
{
  "title": "Tournoi Modern",
  "date": "9 Février 2026",
  "details": {
    "price": "15€",
    "startTime": "14h00",
    "location": {
      "name": "Salle Multi-Activité",
      "address": "49 rue Eugène Daure 64110 Gelos"
    }
  },
  "prizePool": [...],
  "registration": "https://..."
}
```

**Remove all extra tournaments**: Set to empty array `"extraTournaments": []`

The SecondaryTournament component will automatically render all tournaments or hide the section if empty.

## Notes

- The site is French-language (locale: `fr_FR`)
- All SEO and structured data is configured for the French market
- Photo gallery supports lightbox viewing with keyboard navigation
- Base URL path `/mtgpau/` is required for GitHub Pages deployment
