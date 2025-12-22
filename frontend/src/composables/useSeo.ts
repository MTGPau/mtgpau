import { onMounted, watchEffect } from 'vue'
import dataService from '@/services/dataService'

interface SeoConfig {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

export function useSeo(pageName: string, customConfig?: SeoConfig) {
  const updateMetaTags = () => {
    // Get SEO data from data.json
    const seoData = dataService.get(`seo.${pageName}`, {}) as Record<string, string | undefined>
    const general = dataService.get('general', {}) as Record<string, string | undefined>

    const config: SeoConfig = {
      title: customConfig?.title || seoData?.title || general?.name || '',
      description: customConfig?.description || seoData?.description || general?.description || '',
      keywords: customConfig?.keywords || seoData?.keywords || general?.keywords || '',
      image: customConfig?.image || general?.image || '',
      url: customConfig?.url || general?.url || '',
      type: customConfig?.type || 'website',
    }

    // Update document title
    if (config.title) {
      document.title = config.title
    }

    // Helper function to update or create meta tag
    const updateMetaTag = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement
      if (!element) {
        element = document.createElement('meta')
        if (selector.includes('property')) {
          const prop = selector.split('"')[1]
          if (prop) element.setAttribute('property', prop)
        } else if (selector.includes('name')) {
          const name = selector.split('"')[1]
          if (name) element.setAttribute('name', name)
        }
        document.head.appendChild(element)
      }
      element.setAttribute(attribute, value)
    }

    // Standard meta tags
    if (config.description) {
      updateMetaTag('meta[name="description"]', 'content', config.description)
    }
    if (config.keywords) {
      updateMetaTag('meta[name="keywords"]', 'content', config.keywords)
    }

    // Open Graph meta tags
    if (config.title) {
      updateMetaTag('meta[property="og:title"]', 'content', config.title)
    }
    if (config.description) {
      updateMetaTag('meta[property="og:description"]', 'content', config.description)
    }
    if (config.image) {
      updateMetaTag('meta[property="og:image"]', 'content', config.image)
    }
    if (config.url) {
      updateMetaTag('meta[property="og:url"]', 'content', config.url)
    }
    if (config.type) {
      updateMetaTag('meta[property="og:type"]', 'content', config.type)
    }
    updateMetaTag('meta[property="og:locale"]', 'content', 'fr_FR')

    // Twitter Card meta tags
    updateMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image')
    if (config.title) {
      updateMetaTag('meta[name="twitter:title"]', 'content', config.title)
    }
    if (config.description) {
      updateMetaTag('meta[name="twitter:description"]', 'content', config.description)
    }
    if (config.image) {
      updateMetaTag('meta[name="twitter:image"]', 'content', config.image)
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical && config.url) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    if (canonical && config.url) {
      canonical.setAttribute('href', config.url)
    }
  }

  onMounted(() => {
    updateMetaTags()
  })

  watchEffect(() => {
    updateMetaTags()
  })
}
