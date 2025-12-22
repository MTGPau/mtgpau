import { writeFileSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Configuration - change this when domain changes
const DOMAIN = process.env.DOMAIN || 'https://mtgpau.github.io/mtgpau'

// Remove trailing slash if present
const baseDomain = DOMAIN.replace(/\/$/, '')

// Read routes from router configuration
const getRoutesFromRouter = () => {
  const routerPath = resolve(__dirname, '../src/router/index.ts')
  const routerContent = readFileSync(routerPath, 'utf-8')

  // Extract routes from the router file
  const routeRegex = /path:\s*['"]([^'"]+)['"]/g
  const paths = []
  let match

  while ((match = routeRegex.exec(routerContent)) !== null) {
    paths.push(match[1])
  }

  // Define priority and changefreq based on route type
  const getRouteConfig = (path) => {
    if (path === '/') {
      return { priority: '1.0', changefreq: 'weekly' }
    } else if (path === '/events') {
      return { priority: '0.9', changefreq: 'weekly' }
    } else if (path.startsWith('/cr') || path.includes('qualifier')) {
      return { priority: '0.9', changefreq: 'monthly' }
    } else if (path === '/about') {
      return { priority: '0.8', changefreq: 'monthly' }
    } else if (path === '/contact') {
      return { priority: '0.7', changefreq: 'monthly' }
    } else {
      return { priority: '0.8', changefreq: 'monthly' }
    }
  }

  return paths.map((path) => ({
    path,
    ...getRouteConfig(path),
  }))
}

// Routes configuration - dynamically loaded from router
const routes = getRoutesFromRouter()

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
  console.log(`📄 sitemap.xml created with ${routes.length} routes:`)
  routes.forEach((route) => {
    console.log(`   - ${route.path} (priority: ${route.priority}, changefreq: ${route.changefreq})`)
  })
  console.log(`📅 Last modified: ${getCurrentDate()}`)
} catch (error) {
  console.error('❌ Error generating SEO files:', error)
  process.exit(1)
}
