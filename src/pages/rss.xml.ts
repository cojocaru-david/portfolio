import { SITE } from '@/consts'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getAllPosts } from '@/lib/data-utils'

export async function GET(context: APIContext) {
  try {
    const posts = await getAllPosts()

    return rss({
      title: `${SITE.title} - Tech Blog`,
      description: SITE.description,
      site: context.site ?? SITE.href,
      trailingSlash: false,
      items: posts.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: `/blog/${post.id}/`,
        categories: post.data.tags || [],
        author: post.data.authors ? post.data.authors.join(', ') : SITE.author,
        customData: `
          <language>${SITE.locale}</language>
          <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
          ${post.data.tags ? `<category>${post.data.tags.join(', ')}</category>` : ''}
        `.trim(),
      })),
      customData: `
        <language>${SITE.locale}</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <ttl>60</ttl>
        <image>
          <url>${new URL('/ogImage.png', SITE.href).toString()}</url>
          <title>${SITE.title}</title>
          <link>${SITE.href}</link>
        </image>
      `.trim(),
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new Response('Error generating RSS feed', { status: 500 })
  }
}
