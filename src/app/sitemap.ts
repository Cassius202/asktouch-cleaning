// app/sitemap.ts
import { MetadataRoute } from 'next'
import { navLinks } from '@/constants/consts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://asktouchcleaning.name.ng'

  const allRoutes = navLinks.flatMap((link) => {
    const mainRoute = {
      url: `${baseUrl}${link.href}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }

    if (link.dropDown) {
      const subRoutes = link.dropDown.map((sub) => ({
        url: `${baseUrl}${sub.href}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
      return [mainRoute, ...subRoutes]
    }

    return [mainRoute]
  })

  const uniqueRoutes = Array.from(
    new Map(allRoutes.map((route) => [route.url, route])).values()
  )

  return uniqueRoutes
}
