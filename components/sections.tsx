"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowUpIcon, ArrowUpRightIcon, BeanIcon, MountainIcon, ShoppingBagIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatPrice } from "@/lib/brands"
import { useKuro } from "@/components/kuro-provider"
import { Eyebrow, headingClass, Ingredient, reveal, Words } from "@/components/kuro-ui"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const container = "mx-auto max-w-7xl px-5 sm:px-8"
const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crema"

export function Marquee() {
  const { brand } = useKuro()
  return (
    <div className="overflow-hidden border-y border-espresso/10 bg-crema py-4 text-espresso sm:py-5">
      <div className="kuro-marquee flex w-max">
        {/* four copies so the loop never shows a gap; animation shifts by half */}
        {[0, 1, 2, 3].map((copy) => (
          <ul key={copy} aria-hidden={copy > 0} className="flex shrink-0 items-center">
            {brand.flavors.map((f) => (
              <li
                key={f.id}
                className="flex items-center gap-6 pr-6 font-heading text-2xl font-medium tracking-[-0.02em] whitespace-nowrap font-soft sm:text-3xl"
              >
                <span>{f.name}</span>
                <BeanIcon className="size-5 text-espresso/45" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export function Story() {
  const { story } = useKuro().brand
  return (
    <section id="story" aria-labelledby="story-title" className="bg-cream text-espresso">
      <div className={cn(container, "grid items-center gap-14 py-24 lg:grid-cols-12 lg:gap-16 lg:py-32")}>
        <div {...reveal("image")} className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.4)]">
            <Image
              src={story.image}
              alt={story.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="kuro-reveal-media object-cover"
            />
          </div>
          <div
            {...reveal("fade-up", 450)}
            className="absolute right-4 -bottom-6 rounded-2xl bg-espresso px-5 py-4 text-cream shadow-[0_24px_50px_-20px_rgb(0_0_0/0.6)] sm:right-8"
          >
            <p className="font-heading text-3xl leading-none font-medium font-soft">{story.badge}</p>
            <p className="mt-1.5 text-xs text-cream/65">{story.badgeCaption}</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="max-w-2xl">
            <Eyebrow {...reveal("fade-up")} className="text-espresso/60">
              Our story
            </Eyebrow>
            <h2 id="story-title" className={cn("mt-4", headingClass)}>
              <Words text={story.title} />
            </h2>
          </div>
          <div className="mt-6 flex max-w-2xl flex-col gap-5 text-base leading-relaxed text-espresso/75 sm:text-lg">
            {story.body.map((p, i) => (
              <p key={i} {...reveal("fade-up", 200 + i * 120)}>
                {p}
              </p>
            ))}
          </div>
          <dl className="mt-10 grid max-w-2xl grid-cols-3 gap-4 border-t border-espresso/15 pt-8">
            {story.stats.map((s, i) => (
              <div key={i} {...reveal("fade-up", i * 120)} className="flex flex-col-reverse gap-2">
                <dt className="text-xs leading-snug text-espresso/65 sm:text-sm">{s.label}</dt>
                <dd className="font-heading text-4xl leading-none font-medium tracking-[-0.03em] font-soft sm:text-5xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function SectionIntro({
  id,
  eyebrow,
  title,
  intro,
  tone,
}: {
  id: string
  eyebrow: string
  title: string
  intro?: string
  tone: "dark" | "light"
}) {
  return (
    <div className="max-w-2xl">
      <Eyebrow {...reveal("fade-up")} className={tone === "dark" ? "text-crema" : "text-espresso/60"}>
        {eyebrow}
      </Eyebrow>
      <h2 id={id} className={cn("mt-4", headingClass)}>
        <Words text={title} />
      </h2>
      {intro && (
        <p {...reveal("fade-up", 260)} className="mt-5 text-base leading-relaxed text-cream/65 sm:text-lg">
          {intro}
        </p>
      )}
    </div>
  )
}

export function Menu() {
  const { brand, addToBag } = useKuro()
  return (
    <section id="menu" aria-labelledby="menu-title" className="bg-background py-24 text-cream lg:py-32">
      <div className={container}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro id="menu-title" eyebrow="The menu" title={brand.menu.title} intro={brand.menu.intro} tone="dark" />
          <div {...reveal("fade-up", 350)} className="shrink-0">
            <a
              href="#hero"
              className={cn(
                "inline-flex w-fit items-center gap-2 rounded-full border border-cream/15 px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-cream/10",
                focus
              )}
            >
              Spin the flavor wheel
              <ArrowUpRightIcon className="size-4" />
            </a>
          </div>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brand.flavors.map((f, i) => (
            <li key={f.id} {...reveal("image", (i % 3) * 110)}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-cream/10 bg-roast transition-colors duration-300 hover:border-cream/20">
                <div className="relative aspect-[4/5] overflow-hidden bg-espresso">
                  <Image
                    src={f.scene}
                    alt={f.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="kuro-reveal-media object-cover object-[50%_48%] transition-[scale] duration-700 ease-out group-hover:scale-105"
                  />
                  <Ingredient
                    cell={f.sprite}
                    className="absolute top-4 left-4 size-14 rounded-2xl bg-cream shadow-[0_16px_30px_-12px_rgb(0_0_0/0.8)] ring-1 ring-black/10"
                  />
                  <span className="absolute top-4 right-4 rounded-full bg-espresso/70 px-3 py-1.5 text-sm font-semibold text-cream tabular-nums backdrop-blur-md">
                    {formatPrice(f.price)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-heading text-2xl leading-tight font-medium tracking-[-0.02em] text-cream font-soft">
                    {f.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">{f.description}</p>
                  <ul aria-label={`${f.name} tasting notes`} className="mt-4 flex flex-wrap gap-1.5">
                    {f.notes.map((n) => (
                      <li key={n}>
                        <Badge variant="outline" className="h-auto border-cream/15 px-2.5 py-1 font-normal text-cream/75">
                          {n}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <Button
                      aria-label={`Add ${f.name} to your bag, ${formatPrice(f.price)}`}
                      onClick={() => addToBag(f.id)}
                      className="h-11 w-full rounded-full bg-cream font-semibold text-espresso hover:bg-white"
                    >
                      <ShoppingBagIcon data-icon="inline-start" />
                      Add to bag
                    </Button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div
          {...reveal("fade-up")}
          className="mt-16 grid gap-8 rounded-[1.75rem] border border-cream/10 bg-cream/[0.03] p-6 sm:grid-cols-3 sm:p-8 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:items-center"
        >
          <div className="sm:col-span-3 lg:col-span-1">
            <h3 className="font-heading text-2xl font-medium tracking-[-0.02em] font-soft">Make it yours</h3>
            <p className="mt-2 text-sm text-cream/60">Every swap is free. Just ask when you order.</p>
          </div>
          {[
            ["Milk", brand.menu.milk],
            ["Sweetness", "Full, Half, Unsweetened"],
            ["Size", "12 oz, 16 oz, 20 oz"],
          ].map(([k, v]) => (
            <div key={k}>
              <Eyebrow className="tracking-[0.18em] text-cream/45">{k}</Eyebrow>
              <p className="mt-2 text-sm text-cream/85">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Process() {
  const { process } = useKuro().brand
  return (
    <section id="process" aria-labelledby="process-title" className="bg-cream py-24 text-espresso lg:py-32">
      <div className={container}>
        <SectionIntro id="process-title" eyebrow="How it's made" title={process.title} tone="light" />
        <ol className="mt-14 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((s, i) => (
            <li key={i} {...reveal("image", i * 120)} className="flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-white shadow-[0_30px_60px_-40px_rgb(0_0_0/0.4)]">
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="kuro-reveal-media object-cover"
                />
                <span className="absolute top-4 left-4 grid size-10 place-items-center rounded-full bg-espresso text-sm font-semibold text-cream tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 font-heading text-2xl font-medium tracking-[-0.02em] font-soft">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-espresso/70 sm:text-base">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Origins() {
  const { origins } = useKuro().brand
  return (
    <section id="origins" aria-labelledby="origins-title" className="bg-background py-24 text-cream lg:py-32">
      <div className={container}>
        <SectionIntro id="origins-title" eyebrow="Where it grows" title={origins.title} intro={origins.intro} tone="dark" />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {origins.items.map((o, i) => (
            <article
              key={i}
              {...reveal("fade-up", i * 140)}
              style={{ "--contour-at": o.contourAt, "--reveal-delay": `${i * 140}ms` } as React.CSSProperties}
              className="kuro-contours relative flex flex-col overflow-hidden rounded-[1.75rem] border border-cream/10 bg-roast p-7 sm:p-10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Eyebrow className="text-crema">{o.share}</Eyebrow>
                  <h3 className="mt-3 font-heading text-4xl font-medium tracking-[-0.03em] font-soft sm:text-5xl">
                    {o.name}
                  </h3>
                  <p className="mt-1 text-cream/60">{o.region}</p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-cream/15 bg-espresso/60 text-crema">
                  <MountainIcon className="size-5" />
                </span>
              </div>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-cream/75 sm:text-base">{o.body}</p>
              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-cream/10 pt-6">
                {o.specs.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[0.6875rem] font-semibold tracking-[0.18em] text-cream/45 uppercase">{k}</dt>
                    <dd className="mt-1.5 text-sm font-medium text-cream">{v}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const joinTiles = [
  { cell: 1, className: "top-0 left-6 size-32 -rotate-12", delay: 300, float: "0s" },
  { cell: 2, className: "top-14 right-0 size-36 rotate-[9deg]", delay: 450, float: "-2.4s" },
  { cell: 4, className: "bottom-0 left-24 size-28 rotate-6", delay: 600, float: "-4.8s" },
]

export function Join() {
  const { brand } = useKuro()
  const [sent, setSent] = React.useState(false)
  return (
    <section id="join" aria-labelledby="join-title" className="bg-background px-3 pb-24 sm:px-6 lg:pb-32">
      <div
        {...reveal("fade-up")}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-crema px-6 py-16 text-espresso sm:px-12 sm:py-20 lg:px-16"
      >
        <div className="pointer-events-none absolute top-1/2 right-12 hidden h-80 w-96 -translate-y-1/2 lg:block xl:right-24">
          {joinTiles.map((t) => (
            <div key={t.cell} {...reveal("fade-up", t.delay)} className={cn("absolute", t.className)}>
              <span className="kuro-float block size-full" style={{ animationDelay: t.float }}>
                <Ingredient
                  cell={brand.flavors[t.cell].sprite}
                  className="size-full rounded-[24%] bg-cream shadow-[0_30px_50px_-24px_rgb(0_0_0/0.45)] ring-1 ring-black/10"
                />
              </span>
            </div>
          ))}
        </div>

        <div className="relative max-w-xl">
          <Eyebrow {...reveal("fade-up", 100)} className="text-espresso/60">
            Join the list
          </Eyebrow>
          <h2 id="join-title" className={cn("mt-4", headingClass)}>
            <Words text="Be first to taste what's next." delay={180} />
          </h2>
          <p {...reveal("fade-up", 360)} className="mt-5 text-base leading-relaxed text-espresso/75 sm:text-lg">
            New flavors land every season. Leave your email and we&apos;ll tell you the day they reach the menu.
          </p>
          <div {...reveal("fade-up", 480)}>
            <form
              className="mt-8 max-w-lg"
              onSubmit={(e) => {
                e.preventDefault()
                // shortcut: no backend; wire this to your mailing-list provider before launch
                setSent(true)
              }}
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="join-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="join-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-describedby="join-hint"
                  disabled={sent}
                  className="h-13 flex-1 rounded-full border-espresso/15 bg-cream px-5 text-base text-espresso placeholder:text-espresso/45 focus-visible:border-espresso focus-visible:ring-espresso/20 md:text-base"
                />
                <Button
                  type="submit"
                  disabled={sent}
                  className="h-13 rounded-full bg-espresso px-6 font-semibold text-cream hover:bg-black"
                >
                  {sent ? "You're on the list" : "Join the list"}
                </Button>
              </div>
              <p id="join-hint" role="status" className="mt-3 px-1 text-sm text-espresso/65">
                {sent ? "Thanks! We'll write when there's a new flavor." : "We only write when there's a new flavor."}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const { brand } = useKuro()
  const link = cn("rounded text-sm text-cream/75 transition-colors hover:text-cream", focus)
  return (
    <footer className="border-t border-cream/10 bg-espresso text-cream">
      <div className={cn(container, "pt-16 pb-10 lg:pt-20")}>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div {...reveal("fade-up")}>
            <a
              href="#hero"
              className="rounded-md font-heading text-4xl leading-none font-semibold tracking-[-0.04em] font-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crema"
            >
              {brand.wordmark}
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              {brand.tagline} Made in small batches, flavored fresh every morning.
            </p>
          </div>
          <nav {...reveal("fade-up", 120)} aria-labelledby="footer-explore">
            <h2 id="footer-explore" className="text-[0.6875rem] font-semibold tracking-[0.18em] text-cream/45 uppercase">
              Explore
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {[
                ["Story", "#story"],
                ["Menu", "#menu"],
                ["How it's made", "#process"],
                ["Origins", "#origins"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className={link}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div {...reveal("fade-up", 240)}>
            <h2 className="text-[0.6875rem] font-semibold tracking-[0.18em] text-cream/45 uppercase">Stay in touch</h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
              New flavors land every season. Be the first to know.
            </p>
            <a
              href="#join"
              className={cn("mt-4 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-crema transition-colors hover:text-cream", focus)}
            >
              Join the list
              <ArrowUpRightIcon className="size-4" />
            </a>
          </div>
        </div>
        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-cream/10 pt-6 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {brand.company}. All rights reserved.
          </p>
          <a href="#hero" className={cn("inline-flex w-fit items-center gap-1.5 rounded transition-colors hover:text-cream", focus)}>
            Back to top
            <ArrowUpIcon className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
