import { getAllPosts } from '../lib/posts'
import type { MetadataRoute } from 'next'

const BASE = 'https://www.elearning-tools.com'

const CATEGORIES: string[] = ["online-courses","lms","video-platforms","assessment","certifications","ai-learning","course-creation","language-learning","coding-bootcamps","virtual-classroom","webinars","flashcards","skill-development","kids-learning","tutoring","microlearning","corporate-training","edtech-tools","learning-community","instructional-design","audio-learning"]

const STATIC_PAGES = [
  '/about', '/contact', '/write-for-us', '/advertise',
  '/privacy-policy', '/cookie-policy', '/terms',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const articleUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const categoryUrls: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${BASE}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const staticUrls: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: `${BASE}${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }))

  return [
    {
      url: BASE + '/',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: BASE + '/all-articles',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: BASE + '/categories',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...articleUrls,
    ...categoryUrls,
    ...staticUrls,
  ]
}
