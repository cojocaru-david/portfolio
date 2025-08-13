import { SITE } from '@/consts';
import { getCollection } from 'astro:content';
import { getAllTags } from '@/lib/data-utils';
import type { APIRoute } from 'astro';

const MAX_URLS_PER_SITEMAP = 50000;

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export const GET: APIRoute = async (context) => {
  const requestUrl = new URL(context.request.url);
  const pathname = requestUrl.pathname;
  const baseUrl = SITE.href.replace(/\/$/, '');

  const [blogPosts, projects, tagsMap] = await Promise.all([
    getCollection('blog'),
    getCollection('projects'),
    getAllTags()
  ]);

  const now = new Date();
  const latestBlogDate = blogPosts.reduce((max, post) => {
    if (!post.data.draft && post.data.date > max) return post.data.date;
    return max;
  }, new Date(0)) || now;

  const latestProjectDate = projects.reduce((max, project) => {
    const projectDate = project.data.endDate || project.data.startDate || now;
    return projectDate > max ? projectDate : max;
  }, new Date(0)) || now;

  const latestTagsDate = latestBlogDate;

  const urls: { loc: string; lastmod: string; changefreq?: string; priority?: number }[] = [];

  urls.push({
    loc: `${baseUrl}/`,
    lastmod: formatDate(now),
    changefreq: 'weekly',
    priority: 1.0
  });

  urls.push({
    loc: `${baseUrl}/blog/`,
    lastmod: formatDate(latestBlogDate),
    changefreq: 'weekly',
    priority: 0.9
  });

  urls.push({
    loc: `${baseUrl}/projects/`,
    lastmod: formatDate(latestProjectDate),
    changefreq: 'weekly',
    priority: 0.9
  });

  urls.push({
    loc: `${baseUrl}/tags/`,
    lastmod: formatDate(latestTagsDate),
    changefreq: 'weekly',
    priority: 0.9
  });

  for (const post of blogPosts) {
    if (post.data.draft) continue;
    urls.push({
      loc: `${baseUrl}/blog/${encodeURIComponent(post.id)}/`,
      lastmod: formatDate(post.data.date),
      changefreq: 'monthly',
      priority: 0.8
    });
  }

  for (const project of projects) {
    const projectDate = project.data.endDate || project.data.startDate || now;
    urls.push({
      loc: `${baseUrl}/projects/${encodeURIComponent(project.id)}/`,
      lastmod: formatDate(projectDate),
      changefreq: 'yearly',
      priority: 0.6
    });
  }

  for (const tag of tagsMap.keys()) {
    urls.push({
      loc: `${baseUrl}/tags/${encodeURIComponent(tag)}/`,
      lastmod: formatDate(now),
      changefreq: 'monthly',
      priority: 0.7
    });
  }

  const chunks: typeof urls[] = [];
  for (let i = 0; i < urls.length; i += MAX_URLS_PER_SITEMAP) {
    chunks.push(urls.slice(i, i + MAX_URLS_PER_SITEMAP));
  }

  const numSitemaps = chunks.length;

  if (pathname === '/sitemap.xml') {
    if (numSitemaps > 1) {
      const indexXml = generateSitemapIndex(numSitemaps, baseUrl);
      return new Response(indexXml, {
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=86400'
        }
      });
    } else {
      const sitemapXml = generateSitemapXml(chunks[0]);
      return new Response(sitemapXml, {
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=86400'
        }
      });
    }
  } 
  else if (pathname.startsWith('/sitemap-') && pathname.endsWith('.xml')) {
    const indexStr = pathname.slice('/sitemap-'.length, -'.xml'.length);
    const index = parseInt(indexStr, 10);
    if (isNaN(index) || index < 0 || index >= numSitemaps) {
      return new Response('Not Found', { status: 404 });
    }
    const sitemapXml = generateSitemapXml(chunks[index]);
    return new Response(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400'
      }
    });
  } else {
    return new Response('Not Found', { status: 404 });
  }
};

function generateSitemapXml(urls: { loc: string; lastmod: string; changefreq?: string; priority?: number }[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map((url) => `
    <url>
      <loc>${escapeXml(url.loc)}</loc>
      <lastmod>${url.lastmod}</lastmod>
      ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
      ${url.priority !== undefined ? `<priority>${url.priority.toFixed(1)}</priority>` : ''}
    </url>`)
    .join('\n  ')}
</urlset>`;
}

function generateSitemapIndex(count: number, baseUrl: string): string {
  const now = formatDate(new Date());
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${Array.from({ length: count }, (_, i) => `
    <sitemap>
      <loc>${escapeXml(`${baseUrl}/sitemap-${i}.xml`)}</loc>
      <lastmod>${now}</lastmod>
    </sitemap>`).join('\n  ')}
</sitemapindex>`;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}