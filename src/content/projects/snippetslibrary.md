---
name: 'SnippetsLibrary'
description: 'A secure, lightning-fast code snippet manager to store, organize, and share your code with beautiful syntax highlighting.'
tags: ['react', 'vite', 'tailwindcss', 'typescript', 'bun', 'hono', 'drizzle-orm', 'postgresql', 'jwt', 'github-oauth', 'cloudflare-workers']
image: '../../../public/static/snippetslibrary.webp'
link: 'https://snippetslibrary.com'
startDate: '2025-07-23'
---

# SnippetsLibrary

Manage your personal and team code snippets with speed and confidence. SnippetsLibrary makes it easy to create, organize, search, and share snippets with first-class DX and beautiful syntax highlighting.

I have 50+ users and I'm working on a new version with a lot of new features.
And 200+ snippets.

## ✨ Highlights

- **Secure auth**: GitHub OAuth + JWT sessions
- **Sharing**: Public share links with SEO-friendly pages
- **Search & filter**: Language, visibility, keywords, pagination
- **Syntax highlighting**: 20+ languages, themes, copy-preserving formatting
- **Fast**: Bun runtime, Hono server, optimized client with Vite

## 🛠️ Tech Stack

- Frontend: React, Vite, Tailwind CSS, shadcn/ui
- Backend: Bun, Hono, JWT, Drizzle ORM, PostgreSQL
- Infra: Cloudflare Workers, GitHub Actions, Drizzle Kit

## 🚀 Quick Start

1. Clone the repo:
   ```bash
   git clone https://github.com/cojocaru-david/snippetslibrary.com
   cd snippetslibrary.com
   ```
2. Install deps: `bun install`
3. Configure `.env` in `server/` (DB, GitHub OAuth, JWT, FRONTEND_URL)
4. Migrate DB: `cd server && bun run db:migrate`
5. Start dev: `bun run dev` (client on 5173, server on 8000)

## 🔗 Links

- Live: https://snippetslibrary.com
- Repo: https://github.com/cojocaru-david/snippetslibrary.com


