import { defineConfig } from 'astro/config'

import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'

import expressiveCode from 'astro-expressive-code'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkEmoji from 'remark-emoji'
import remarkMath from 'remark-math'
import remarkSectionize from 'remark-sectionize'
import rehypeDocument from 'rehype-document'

import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

import tailwindcss from '@tailwindcss/vite'

import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://ingvictorcvgithub.io',

  integrations: [
    expressiveCode({
      themes: ['catppuccin-latte', 'ayu-dark'],
      plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
      useDarkModeMediaQuery: true,
      defaultProps: {
        wrap: true,
        collapseStyle: 'collapsible-auto',
        overridesByLang: {
          'ansi,bat,bash,batch,cmd,console,powershell,ps,ps1,psd1,psm1,sh,shell,shellscript,shellsession,text,zsh':
            {
              showLineNumbers: true,
            },
        },
      },
    }),
    mdx(),
    react(),
    sitemap(),
    icon(),
  ],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["satori", "satori-html"],
      include: [
        "react",
        "react-dom",
        "clsx",
        "framer-motion",
        "lucide-react",
        "lodash.debounce",
        "@radix-ui/react-icons",
        "@radix-ui/react-avatar",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-scroll-area",
        "@radix-ui/react-separator",
        "@radix-ui/react-slot"
      ]
    },    
  },

  server: {
    port: 3000,
    host: true,
  },

  devToolbar: {
    enabled: false,
  },

  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypeDocument,
        {
          css: 'https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css',
        },
      ],
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noreferrer', 'noopener'],
        },
      ],
      rehypeHeadingIds,
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          theme: {
            light: 'catppuccin-latte',
            dark: 'ayu-dark',
          },
        },
      ],
    ],
    remarkPlugins: [remarkMath, remarkEmoji, remarkSectionize],
  },

  adapter: vercel()
})
