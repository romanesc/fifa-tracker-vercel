import './globals.css'
import Providers from '@/lib/providers'
import { ThemeProvider } from '@/context/ThemeContext'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Providers>
            {children}
            <ThemeToggle />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}