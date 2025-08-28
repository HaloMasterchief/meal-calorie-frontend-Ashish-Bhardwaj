import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/components/providers/auth-provider'
import { QueryProvider } from '@/components/providers/query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Meal Calorie Count Generator',
    template: '%s | Meal Calorie Count Generator',
  },
  description: 'Calculate calories for your meals using USDA data. Track your nutrition with our comprehensive calorie counting tool.',
  keywords: [
    'calorie counter',
    'meal tracker',
    'nutrition',
    'USDA',
    'food database',
    'health',
    'diet',
    'fitness',
  ],
  authors: [{ name: 'Meal Calorie Count Generator Team' }],
  creator: 'Meal Calorie Count Generator',
  publisher: 'Meal Calorie Count Generator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Meal Calorie Count Generator',
    description: 'Calculate calories for your meals using USDA data. Track your nutrition with our comprehensive calorie counting tool.',
    siteName: 'Meal Calorie Count Generator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Meal Calorie Count Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meal Calorie Count Generator',
    description: 'Calculate calories for your meals using USDA data. Track your nutrition with our comprehensive calorie counting tool.',
    images: ['/og-image.png'],
    creator: '@mealcalorieapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider>
              <div className="min-h-screen bg-background font-sans antialiased">
                {children}
                <Toaster />
              </div>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

