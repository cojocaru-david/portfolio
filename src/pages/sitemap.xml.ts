// Deprecated custom sitemap. Rely on @astrojs/sitemap integration to avoid duplicates.
export async function GET() {
  return new Response('Moved to sitemap-index.xml', {
    status: 301,
    headers: { Location: '/sitemap-index.xml' }
  })
}