# SEO Files Generator

This script automatically generates `robots.txt` and `sitemap.xml` for the MTG Pau website.

## Usage

### Generate with default domain (GitHub Pages)

```bash
npm run generate-seo
```

This uses the default domain: `https://mtgpau.github.io/mtgpau`

### Generate with custom domain

When you switch to a custom domain, use:

```bash
DOMAIN=https://www.mtgpau.fr npm run generate-seo
```

Or:

```bash
DOMAIN=https://mtgpau.fr npm run generate-seo
```

### Automatic generation on build

The script runs automatically before every build thanks to the `prebuild` hook in `package.json`.

So when you run:
```bash
npm run build
```

It will:
1. Generate SEO files with the current domain
2. Type-check the TypeScript
3. Build the application

## Configuration

### Change the default domain

Edit `scripts/generate-seo-files.js` and change this line:

```javascript
const DOMAIN = process.env.DOMAIN || 'https://mtgpau.github.io/mtgpau'
```

### Add or modify routes

Edit the `routes` array in `scripts/generate-seo-files.js`:

```javascript
const routes = [
  {
    path: '/',
    priority: '1.0',      // 0.0 to 1.0 (1.0 = highest)
    changefreq: 'weekly', // always, hourly, daily, weekly, monthly, yearly, never
  },
  // ... add more routes
]
```

## GitHub Actions Integration

To use a custom domain in GitHub Actions, add this to your `.github/workflows/deploy.yml`:

```yaml
- name: Build
  run: |
    cd frontend
    DOMAIN=https://www.mtgpau.fr npm run build
  env:
    DOMAIN: ${{ secrets.CUSTOM_DOMAIN || 'https://mtgpau.github.io/mtgpau' }}
```

Or set it as a GitHub Actions secret:
1. Go to repository Settings → Secrets and variables → Actions
2. Add a new secret named `CUSTOM_DOMAIN`
3. Set value to your domain (e.g., `https://www.mtgpau.fr`)

## Output Files

The script generates:
- `public/robots.txt` - Search engine crawling instructions
- `public/sitemap.xml` - Site structure for search engines

These files are automatically copied to `dist/` during build and deployed to GitHub Pages.
