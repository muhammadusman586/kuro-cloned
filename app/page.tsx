import { Hero } from "@/components/hero"
import { KuroProvider } from "@/components/kuro-provider"
import { RevealObserver } from "@/components/kuro-ui"
import { Footer, Join, Marquee, Menu, Origins, Process, Story } from "@/components/sections"
import { StickyNav } from "@/components/site-header"

export default function Page() {
  return (
    <KuroProvider>
      <StickyNav />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <Menu />
        <Process />
        <Origins />
        <Join />
      </main>
      <Footer />
      <RevealObserver />
    </KuroProvider>
  )
}
