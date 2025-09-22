import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://amormeco.pt'
  const currentDate = new Date()
  
  return [
    // Main homepage
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    // Hash-based section pages (for SEO purposes)
    {
      url: `${baseUrl}/#menu`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#reservations`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#events`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/#gallery`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/#reviews`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    // Non-hash pages
    {
      url: `${baseUrl}/pdfmenu`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]
}
