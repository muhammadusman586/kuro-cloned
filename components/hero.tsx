"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronDownIcon, ShoppingBagIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatPrice } from "@/lib/brands"
import { useKuro } from "@/components/kuro-provider"
import { Ingredient, Words } from "@/components/kuro-ui"
import { SiteHeader } from "@/components/site-header"

// Wheel slots -7..7: enough tiles that both edges of the arc stay filled at any rotation
const SLOTS = Array.from({ length: 15 }, (_, i) => i - 7)
const mod = (n: number, m: number) => ((n % m) + m) % m

export function Hero() {
  const { brand, selected, setSelected, goToFlavor, addToBag, announce } = useKuro()
  const sectionRef = React.useRef<HTMLElement>(null)
  const stageRef = React.useRef<HTMLDivElement>(null)
  const wheelRef = React.useRef<HTMLDivElement>(null)
  const count = brand.flavors.length
  const flavor = brand.flavors[selected]

  // Keep the outgoing scene underneath while the new one pours in from the top.
  const [current, setCurrent] = React.useState(selected)
  const [previous, setPrevious] = React.useState(selected)
  if (selected !== current) {
    setPrevious(current)
    setCurrent(selected)
  }

  React.useEffect(() => {
    const section = sectionRef.current!
    let rot = 0
    let target = 0
    let raf = 0
    let last = -1

    const tick = () => {
      rot += (target - rot) * 0.14
      if (Math.abs(target - rot) < 0.0005) rot = target
      wheelRef.current?.style.setProperty("--rot", rot.toFixed(4))
      const idx = Math.round(rot)
      if (idx !== last) setSelected((last = idx))
      raf = rot === target ? 0 : requestAnimationFrame(tick)
    }
    const onScroll = () => {
      const range = section.offsetHeight - window.innerHeight
      const p = Math.min(1, Math.max(0, (window.scrollY - section.offsetTop) / range))
      target = p * (count - 1)
      stageRef.current!.dataset.scrolled = String(p > 0.01)
      if (!raf) raf = requestAnimationFrame(tick)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [count, setSelected])

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative w-full"
      style={{ height: "calc(max(100svh, 40rem) + 275svh)" }}
    >
      <div
        ref={stageRef}
        className="kuro-stage group/stage sticky top-0 isolate h-svh min-h-[40rem] w-full touch-pan-y overflow-clip text-cream select-none sm:min-h-[37.5rem]"
      >
        <div className="kuro-scene pointer-events-none absolute top-(--scene-top) left-1/2 h-(--s) w-(--scene-w) -translate-x-1/2">
          {brand.flavors.map((f, i) => (
            <Image
              key={`${brand.id}-${f.id}`}
              src={f.scene}
              alt={i === current ? f.alt : ""}
              fill
              sizes="100vw"
              loading="eager"
              preload={i === 0}
              className={cn(
                "object-cover",
                i === current
                  ? "kuro-pour z-[2] opacity-100"
                  : i === previous
                    ? "z-[1] opacity-100"
                    : "z-0 opacity-0"
              )}
            />
          ))}
        </div>

        <SiteHeader />

        <h1
          id="hero-title"
          key={brand.id}
          className="pointer-events-none absolute inset-x-0 top-(--headline-top) z-10 px-5 text-center font-heading text-(length:--h-size) leading-[1.04] font-medium tracking-[-0.03em] text-cream [text-shadow:0_6px_40px_rgb(0_0_0/0.5)] font-soft sm:whitespace-nowrap"
        >
          <span className="block">
            <Words text="Choose your" soft delay={250} />
            <br className="sm:hidden" />{" "}
            <Words text={brand.drink} soft delay={250} offset={2} />
          </span>
        </h1>

        <div
          ref={wheelRef}
          role="group"
          aria-label="Flavors"
          className="kuro-wheel absolute top-(--wheel-y) left-1/2 z-20 size-0"
        >
          {SLOTS.map((v) => {
            const i = mod(v, count)
            const f = brand.flavors[i]
            return (
              <button
                key={v}
                type="button"
                aria-label={`Choose ${f.name}`}
                tabIndex={v >= 0 && v < count ? 0 : -1}
                onClick={() => goToFlavor(i)}
                style={{ "--v": v } as React.CSSProperties}
                className="kuro-tile group absolute top-[calc(var(--tile)/-2)] left-[calc(var(--tile)/-2)] size-(--tile) rounded-[24%] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crema"
              >
                <span className="kuro-float block size-full" style={{ animationDelay: `${-1.2 * i}s` }}>
                  <Ingredient
                    keyed
                    cell={f.sprite}
                    className="size-full rounded-[24%] transition-[scale] duration-300 ease-out group-hover:scale-[1.06] group-active:scale-95"
                  />
                </span>
              </button>
            )
          })}
        </div>

        <p className="pointer-events-none absolute inset-x-0 top-(--label-y) z-10 -translate-y-1/2 text-center font-heading text-(length:--label-size) leading-none font-medium tracking-[-0.02em] text-cream [text-shadow:0_2px_22px_rgb(0_0_0/0.6)] font-soft">
          <span key={flavor.label} className="inline-block animate-in duration-500 fade-in slide-in-from-bottom-2">
            {flavor.label}
          </span>
        </p>

        <button
          type="button"
          aria-label={`Add ${flavor.name} to your bag, ${formatPrice(flavor.price)}`}
          onClick={() => addToBag(flavor.id)}
          className="absolute top-(--chip-y) left-1/2 z-20 flex size-(--chip) -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-[30%] bg-cream text-espresso shadow-[0_20px_44px_-16px_rgb(0_0_0/0.85)] ring-1 ring-black/10 transition-[scale] duration-200 ease-out hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crema"
        >
          <span key={flavor.id} className="animate-in text-[0.6875rem] leading-none font-bold tabular-nums duration-300 fade-in">
            {formatPrice(flavor.price)}
          </span>
          <span className="grid size-[44%] place-items-center rounded-full bg-espresso text-cream">
            <ShoppingBagIcon className="size-4" />
          </span>
        </button>

        <div className="pointer-events-none absolute bottom-5 left-4 z-20 hidden max-sm:block sm:bottom-8 sm:left-8 lg:block">
          <p className="font-heading leading-none font-medium text-cream tabular-nums font-soft">
            <span className="text-2xl sm:text-3xl">{String(selected + 1).padStart(2, "0")}</span>
            <span className="text-sm text-cream/50"> / {String(count).padStart(2, "0")}</span>
          </p>
          <div className="mt-2.5 flex items-center gap-1">
            {brand.flavors.map((f, i) => (
              <span
                key={f.id}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  i === selected ? "w-6 bg-crema" : "w-2 bg-cream/25"
                )}
              />
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute right-4 bottom-5 z-20 hidden items-center gap-2 text-xs font-medium text-cream/70 transition-opacity duration-500 group-data-[scrolled=true]/stage:opacity-0 max-sm:flex sm:right-8 sm:bottom-8 lg:flex">
          <span>Scroll to taste</span>
          <span className="kuro-scroll-cue grid size-7 place-items-center rounded-full border border-cream/20">
            <ChevronDownIcon className="size-4" />
          </span>
        </div>

        <p role="status" className="sr-only">
          {`${flavor.name} selected, ${formatPrice(flavor.price)}`}
        </p>
        <p role="status" className="sr-only">
          {announce}
        </p>
      </div>
    </section>
  )
}
