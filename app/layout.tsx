import type { Metadata } from "next"
import { Figtree, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SmoothScroll } from "@/components/smooth-scroll"
import { PageLoader } from "@/components/page-loader"

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  style: ["normal", "italic"],
})
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "J & J Cleaning Services - Premium Cleaning Service",
  description: "Exquisite cleaning services for discerning homeowners.",
  icons: {
    icon: "/logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${figtree.variable} ${playfair.variable} ${figtree.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageLoader>
            <SmoothScroll>
              {children}
              <Toaster />
            </SmoothScroll>
          </PageLoader>
        </ThemeProvider>
      </body>
    </html>
  )
}
