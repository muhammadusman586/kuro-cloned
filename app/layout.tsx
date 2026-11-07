import type { Metadata } from "next"
import { Fraunces, Manrope } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "Kuro",
  description: "Small-batch iced lattes, poured black first.",
  icons: { icon: "/favicon.svg" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(fraunces.variable, manrope.variable)}>
      <head>
        {/* Hide reveal targets before first paint so they don't flash in and out */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('kuro-reveal')" }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
