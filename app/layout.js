import { Inter } from 'next/font/google'
import './globals.css'
import ProtectedRoute from './potectedRoutes'
import ClientLayout from './ClientLayout'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
  variable: '--font-inter',
})

export const metadata = {
  title: {
    default: "Techlyn Academy | Modern Learning Platform",
    template: "%s | Techlyn Academy"
  },
  description: "Transform your future with our cutting-edge tech education platform. Learn from industry experts and track your progress.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2322c55e'><path d='M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z'/></svg>"
        />
      </head>
      <body className="antialiased flex flex-col min-h-screen bg-indigo-50">
        <ProtectedRoute>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ProtectedRoute>
      </body>
    </html>
  )
}
