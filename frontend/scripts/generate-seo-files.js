import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Configuration - change this when domain changes
const DOMAIN = process.env.DOMAIN || 'https://mtgpau.github.io/mtgpau'

// Remove trailing slash if present
const baseDomain = DOMAIN.replace(/\/$/, '')

// Routes configuration
const routes = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly',
  },
  {
    path: '/about',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/events',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: '/contact',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/cr',
    priority: '0.9',
    changefreq: 'monthly',
  },
]

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const now = new Date()
  return now.toISOString().split('T')[0]
}

// Generate robots.txt
const generateRobotsTxt = () => {
  return `# Allow all search engines to crawl the site
User-agent: *
Allow: /

# Sitemap location
Sitemap: ${baseDomain}/sitemap.xml

# Crawl-delay for politeness
Crawl-delay: 1
`
}

// Generate sitemap.xml
const generateSitemap = () => {
  const currentDate = getCurrentDate()

  const urls = routes
    .map(
      (route) => `  <url>
    <loc>${baseDomain}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseDomain}${route.path}" />
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
}

// Write files
const publicDir = resolve(__dirname, '../public')

try {
  const robotsTxt = generateRobotsTxt()
  const sitemap = generateSitemap()

  writeFileSync(resolve(publicDir, 'robots.txt'), robotsTxt, 'utf-8')
  writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemap, 'utf-8')

  console.log('✅ SEO files generated successfully!')
  console.log(`📍 Domain: ${baseDomain}`)
  console.log(`📄 robots.txt created`)
  console.log(`📄 sitemap.xml created`)
  console.log(`📅 Last modified: ${getCurrentDate()}`)
} catch (error) {
  console.error('❌ Error generating SEO files:', error)
  process.exit(1)
}
