'use client'
import { usePathname } from 'next/navigation'
import Navbar from './components/navbar'
import Footer from './components/footer'

export default function ClientLayout({ children }) {
  const pathname = usePathname()
  const hideNavFooter = ['/signup', '/login', '/reset-password', '/request-reset-password'].includes(pathname)

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!hideNavFooter && <Footer />}
    </>
  )
}