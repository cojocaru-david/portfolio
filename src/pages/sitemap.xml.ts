import { SITE } from '@/consts'
import type { APIContext } from 'astro'
import { getAllPosts, getAllProjects, getAllTags } from '@/lib/data-utils'

export async function GET(context: APIContext) {
  try {
    const posts = await getAllPosts()
    const projects = await getAllProjects()
    const tags = await getAllTags()
    const site = context.site ?? SITE.href
    const baseUrl = site.toString().endsWith('/') ? site.toString().slice(0, -1) : site.toString()

    const staticPages = [
      {
        url: `${baseUrl}/`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: '1.0'
      },
      {
        url: `${baseUrl}/projects/`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.8'
      },
      {
        url: `${baseUrl}/blog/`,
        lastmod: posts.length > 0 ? posts[0].data.date.toISOString() : new Date().toISOString(),
        changefreq: 'daily',
        priority: '0.9'
      },
      {
        url: `${baseUrl}/tags/`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.6'
      }
    ]

    const blogPosts = posts.map(post => ({
      url: `${baseUrl}/blog/${post.id}/`,
      lastmod: post.data.date.toISOString(),
      changefreq: 'monthly',
      priority: '0.7'
    }))

    const projectPosts = projects.map(project => ({
      url: `${baseUrl}/projects/${project.id}/`,
      lastmod: (project.data.endDate ?? new Date()).toISOString(),
      changefreq: 'monthly',
      priority: '0.6'
    }))

    const tagUrls = Array.from(tags, ([tag, _]) => ({
      url: `${baseUrl}/tags/${tag}/`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.5'
    }))

    const allUrls = [...staticPages, ...projectPosts, ...blogPosts, ...tagUrls]

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrls
  .map(
    page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
}