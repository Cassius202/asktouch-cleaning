import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',     // Apply to all crawlers
      allow: '/',         // Crawl everything
      disallow: '/admin', // Except the private folder
    },
    sitemap: 'https://asktouchcleaning.name.ng',
  }
}