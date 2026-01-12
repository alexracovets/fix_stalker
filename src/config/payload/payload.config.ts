// storage-adapter-import-placeholder
import {
  ParagraphFeature,
  BoldFeature,
  ItalicFeature,
  StrikethroughFeature,
  UnderlineFeature,
  FixedToolbarFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import { HorizontalRuleFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import path from 'path'

import { LOCALES, DEFAULT_LOCALE } from '@constants'

import {
  ResistanceTable,
  SectionsIcons,
  ElementsPages,
  DetaileTable,
  MainPages,
  Sections,
  Users,
  Media,
  Video,
} from '@collections'

import { SiteSettings, Navigation } from '@globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

import { en } from '@payloadcms/translations/languages/en'
import { uk } from '@payloadcms/translations/languages/uk'

export default buildConfig({
  i18n: {
    supportedLanguages: { en, uk },
  },
  localization: {
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
  },
  admin: {
    user: Users.slug,
    suppressHydrationWarning: true,
    dateFormat: 'yyyy-MM-dd',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    MainPages,
    Sections,
    Media,
    Video,
    Users,
    SectionsIcons,
    ElementsPages,
    ResistanceTable,
    DetaileTable,
  ],
  globals: [Navigation, SiteSettings],
  editor: lexicalEditor({
    features: [
      ParagraphFeature(),
      BoldFeature(),
      ItalicFeature(),
      StrikethroughFeature(),
      UnderlineFeature(),
      UnorderedListFeature(),
      FixedToolbarFeature(),
      HorizontalRuleFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET as string,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL as string,
    },
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: [MainPages.slug, Sections.slug, ElementsPages.slug],
      tabbedUI: true,
      uploadsCollection: ['media'],
    }),
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
        video: {
          prefix: 'video',
        },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || '',
        endpoint: process.env.S3_ENDPOINT || '',
      },
    }),
  ],
  email: nodemailerAdapter({
    transportOptions: {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.SMTP_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      },
    },
    defaultFromAddress: process.env.EMAIL_FROM as string,
    defaultFromName: 'Stalker CMS',
  }),
})
