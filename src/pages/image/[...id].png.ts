import satori from 'satori'
import { html } from 'satori-html'
import { Resvg } from '@resvg/resvg-js'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'
import fs from 'fs'
import path from 'path'

const MontserratRegular = fs.readFileSync(
  path.resolve('./public/fonts2/_montserrat_regular.ttf'),
)
const MontserratBold = fs.readFileSync(
  path.resolve('./public/fonts2/_montserrat_bold.ttf'),
)

const dimensions = {
  width: 1200,
  height: 630,
}

const colors = {
  background: {
    from: '#2c2c2c',
    via: '#181818',
    to: '#000000',
  },
  text: {
    primary: '#ffffff',
    secondary: '#b8b8b8',
    muted: '#7a7a7a',
  },
  accent: {
    primary: 'rgba(112, 112, 112, 0.5)',
    secondary: 'rgba(21, 21, 21, 0.8)',
    highlight: 'rgba(255, 255, 255, 0.05)',
  },
}

interface Props {
  title: string
  date: Date
  description: string
  tags: string[]
}

export async function GET(context: APIContext) {
  const { title, date, description, tags } = context.props as Props

  const formattedDate = date.toLocaleDateString('en-US', { dateStyle: 'full' })

  const tagElements = tags
    .map(
      (tag) =>
        `<div style="background: rgba(21, 21, 21, 0.5); color: #e0e0e0; font-size: 14px; font-weight: 500; padding: 6px 14px; border-radius: 18px; margin: 4px; display: flex; border: 1px solid rgba(255, 255, 255, 0.1);">#${tag}</div>`,
    )
    .join('')

  const markup = html(
    `<div
      style="display: flex; flex-direction: column; width: 100%; height: 100%; border-radius: 24px; overflow: hidden; color: white; border: 1px solid rgba(255, 255, 255, 0.12); position: relative;background: #171717;"
    >
      
      <div style="position: absolute;display: flex; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.01); opacity: 0.6;"></div>

      
      <div style="position: absolute; width: 350px; height: 350px;display: flex; background: radial-gradient(circle, rgba(250, 255, 100, 0.12) 0%, transparent 70%); top: -100px; right: -50px; border-radius: 50%;"></div>

      
      <div style="flex: 4; padding: 48px 50px; display: flex; flex-direction: column; justify-content: center; position: relative;">
        <div style="color: ${colors.text.secondary}; font-size: 16px; display: flex; font-weight: 400; letter-spacing: 0.05em; text-transform: uppercase;">
          ${formattedDate}
        </div>

        <div
          style="font-size: 60px; display: flex; font-weight: 800; color: ${colors.text.primary}; line-height: 1.15; margin-top: 18px; letter-spacing: -0.01em; width: 95%;"
        >
          ${title}
        </div>

        <div style="width: 70px; height: 4px; display: flex; background: linear-gradient(90deg, rgba(255,255,255,0.7), rgba(255,255,255,0.2)); margin: 20px 0; border-radius: 2px;"></div>

        <div style="color: ${colors.text.secondary}; font-size: 20px;display: flex; margin-top: 16px; line-height: 1.6; width: 90%;">
          ${description}
        </div>

        <div style="display: flex; margin-top: 28px; flex-wrap: wrap;">
          ${tagElements}
        </div>
      </div>

      
      <div
        style="flex: 1; border-top: 1px solid rgba(255, 255, 255, 0.1); display: flex; padding: 32px 50px; align-items: center; justify-content: space-between; font-size: 20px; background: rgba(0,0,0,0.3); position: relative;"
      >
        <div style="display: flex; align-items: center;">
          <div style="width: 6px; height: 28px;display: flex; background: rgb(27,27,27); margin-right: 16px; border-radius: 3px;"></div>
          <span style="color: ${colors.text.secondary}; font-weight: 500; letter-spacing: 0.02em;">cojocarudavid.me</span>
        </div>

        <div style="display: flex; align-items: center; background: rgba(21,21,21, 0.8); border-radius: 18px; padding: 12px 22px; border: 1px solid rgba(255, 255, 255, 0.1);">
          <img src="https://res.cloudinary.com/dtkix7qix/image/upload/v1744410119/logo_wkn0ie.png" alt="Logo" style="width: 64px; height: 48px;" width="64" height="48" />
          <div style="display: flex; flex-direction: column; margin-left: 18px; border-left: 1px solid rgba(255, 255, 255, 0.12); padding-left: 18px;">
            <span style="color: ${colors.text.primary}; font-weight: 600; font-size: 18px;">David Cojocaru</span>
            <span style="color: ${colors.text.muted}; font-size: 14px;">cojocaru-david</span>
          </div>
        </div>
      </div>
    </div>`,
  ) as unknown as React.ReactNode

  const svg = await satori(markup, {
    fonts: [
      {
        name: 'Montserrat',
        data: MontserratRegular,
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Montserrat',
        data: MontserratBold,
        weight: 700,
        style: 'normal',
      },
    ],
    height: dimensions.height,
    width: dimensions.width,
    debug: false,
  })

  const image = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: dimensions.width,
    },
    font: {
      fontFiles: [
        MontserratRegular.toString('base64'),
        MontserratBold.toString('base64'),
      ],
      loadSystemFonts: true,
      defaultFontFamily: 'Montserrat',
    },
    logLevel: 'error',
    background: 'transparent',
    imageRendering: 1,
    shapeRendering: 2,
    textRendering: 1,
    dpi: 144,
  }).render()

  const pngData = image.asPng()

  return new Response(pngData as any, {
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': 'inline; filename="social-card.png"',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Length': pngData.length.toString(),
      'Surrogate-Key': tags.join(' '),
      'Query-String-Hash': title.toLowerCase().replace(/\s+/g, '-'),
      'Cache-Tag': 'social-image',
      'X-Content-Type-Options': 'nosniff',
      'Last-Modified': new Date().toUTCString(),
      Expires: new Date(Date.now() + 31536000000).toUTCString(),
      ETag: `"${pngData.length}-${Date.now()}"`,
      'Access-Control-Allow-Origin': '*',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    },
  })
}

export async function getStaticPaths() {
  const posts = await getCollection('blog')
  return posts.map((post) => ({
    params: {
      id: post.id,
    },
    props: {
      title: post.data.title,
      date: post.data.date,
      description: post.data.description,
      tags: post.data.tags,
    },
  }))
}
