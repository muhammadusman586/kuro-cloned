"use client"

import * as React from "react"
import {
  CheckIcon,
  CoffeeIcon,
  InfoIcon,
  LayoutGridIcon,
  LeafIcon,
  MenuIcon,
  MinusIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  ShoppingBagIcon,
  ShuffleIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { brands, formatPrice, type BrandId } from "@/lib/brands"
import { useKuro } from "@/components/kuro-provider"
import { Eyebrow, Ingredient } from "@/components/kuro-ui"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const glass = "border border-cream/10 bg-espresso/45 backdrop-blur-md"
const iconButton =
  "grid size-9 place-items-center rounded-[0.85rem] text-cream/75 transition-colors duration-200 hover:bg-cream/10 hover:text-cream aria-expanded:bg-cream/10 aria-expanded:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crema sm:size-10"
const panel =
  "max-h-[min(34rem,calc(100svh-6rem))] w-[min(23rem,calc(100vw-2rem))] gap-0 overflow-y-auto rounded-[1.75rem] border border-cream/10 bg-roast/95 p-2 text-cream ring-0 shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9)] backdrop-blur-xl"
const thumb = "size-11 shrink-0 rounded-xl bg-cream"
const panelEyebrow = "tracking-[0.18em] text-cream/50"

const navLinks = [
  ["Story", "#story"],
  ["Menu", "#menu"],
  ["How it's made", "#process"],
  ["Origins", "#origins"],
] as const

export function SiteHeader() {
  const { brand, setBrand, paused, togglePaused } = useKuro()
  const other: BrandId = brand.id === "coffee" ? "matcha" : "coffee"

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav
        aria-label="Main"
        className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 pt-4 sm:gap-3 sm:px-8 sm:pt-6"
      >
        <a
          href="#hero"
          className="animate-in justify-self-start rounded-md font-heading text-[1.5rem] leading-none font-semibold tracking-[-0.04em] text-cream duration-700 font-soft fade-in slide-in-from-left-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crema sm:text-[1.75rem]"
        >
          {brand.wordmark}
        </a>

        <div
          className={cn(
            "flex animate-in items-center gap-1 rounded-[1.15rem] p-1 shadow-[0_12px_32px_-14px_rgb(0_0_0/0.7)] duration-700 fade-in slide-in-from-top-2",
            glass
          )}
        >
          <FlavorsPopover />
          <NotesPopover />
          <SurpriseButton />
          <BagPopover />
        </div>

        <div className="flex animate-in items-center gap-1.5 justify-self-end duration-700 fade-in slide-in-from-right-2 sm:gap-2">
          <BrandToggle className={cn("hidden lg:inline-flex", glass)} />
          <button
            type="button"
            aria-label={`Switch to ${other}`}
            onClick={() => setBrand(other)}
            className={cn(iconButton, glass, "text-crema lg:hidden")}
          >
            {brand.id === "coffee" ? <LeafIcon className="size-4" /> : <CoffeeIcon className="size-4" />}
          </button>
          <button
            type="button"
            aria-label={paused ? "Play motion" : "Pause motion"}
            aria-pressed={paused}
            onClick={togglePaused}
            className={cn(iconButton, glass, "hidden size-10 rounded-[0.9rem] sm:grid")}
          >
            {paused ? <PlayIcon className="size-4" /> : <PauseIcon className="size-4" />}
          </button>
          <SiteMenu />
        </div>
      </nav>
    </header>
  )
}

function BrandToggle({ className }: { className?: string }) {
  const { brand, setBrand } = useKuro()
  return (
    <ToggleGroup
      aria-label="Menu"
      value={[brand.id]}
      onValueChange={(v) => v[0] && setBrand(v[0] as BrandId)}
      spacing={1}
      className={cn("rounded-full p-1", className)}
    >
      {(Object.keys(brands) as BrandId[]).map((id) => (
        <ToggleGroupItem
          key={id}
          value={id}
          className="h-8 rounded-full px-3 text-xs font-semibold text-cream/70 hover:bg-transparent hover:text-cream aria-pressed:bg-cream aria-pressed:text-espresso"
        >
          {id === "coffee" ? <CoffeeIcon data-icon="inline-start" /> : <LeafIcon data-icon="inline-start" />}
          {brands[id].name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

function FlavorsPopover() {
  const { brand, selected, goToFlavor } = useKuro()
  const [open, setOpen] = React.useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger aria-label="All flavors" className={iconButton}>
        <LayoutGridIcon className="size-4" />
      </PopoverTrigger>
      <PopoverContent sideOffset={14} className={panel}>
        <PopoverTitle render={<Eyebrow className={cn("px-3 pt-2 pb-2", panelEyebrow)} />}>
          All flavors
        </PopoverTitle>
        <ul className="flex flex-col gap-0.5">
          {brand.flavors.map((f, i) => (
            <li key={f.id}>
              <button
                type="button"
                onClick={() => {
                  goToFlavor(i)
                  setOpen(false)
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl p-2 text-left transition-colors hover:bg-cream/[0.06] focus-visible:outline-2 focus-visible:outline-crema",
                  i === selected && "bg-cream/[0.06]"
                )}
              >
                <Ingredient cell={f.sprite} className={thumb} />
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-lg leading-tight font-soft">{f.name}</span>
                  <span className="block truncate text-sm text-cream/60">{f.notes.join(", ")}</span>
                </span>
                <span className="text-sm font-medium tabular-nums">{formatPrice(f.price)}</span>
                <CheckIcon className={cn("size-4 text-crema", i !== selected && "invisible")} />
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}

function NotesPopover() {
  const { brand, selected, addToBag } = useKuro()
  const f = brand.flavors[selected]
  return (
    <Popover>
      <PopoverTrigger aria-label="Tasting notes" className={iconButton}>
        <InfoIcon className="size-4" />
      </PopoverTrigger>
      <PopoverContent sideOffset={14} className={panel}>
        <div className="flex items-center gap-4 p-2">
          <Ingredient cell={f.sprite} className="size-16 shrink-0 rounded-2xl bg-cream" />
          <div>
            <Eyebrow className={panelEyebrow}>Tasting notes</Eyebrow>
            <PopoverTitle className="mt-1 font-heading text-2xl leading-tight font-medium font-soft">
              {f.name}
            </PopoverTitle>
          </div>
        </div>
        <p className="mt-2 px-2 text-[0.9375rem] leading-relaxed text-cream/70">{f.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5 px-2">
          {f.notes.map((n) => (
            <li key={n}>
              <Badge variant="outline" className="h-7 border-cream/15 px-3 text-sm font-normal text-cream/80">
                {n}
              </Badge>
            </li>
          ))}
        </ul>
        <dl className="mx-2 mt-5 grid grid-cols-3 divide-x divide-cream/10 rounded-2xl bg-cream/[0.04] py-3 text-center">
          {[
            ["Size", "16 oz iced"],
            ["Caffeine", f.caffeine],
            ["Price", formatPrice(f.price)],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col-reverse gap-1">
              <dd className="font-medium tabular-nums">{v}</dd>
              <dt className="text-xs text-cream/50">{k}</dt>
            </div>
          ))}
        </dl>
        <Button
          onClick={() => addToBag(f.id)}
          className="mt-3 h-11 w-full rounded-full bg-cream text-base font-semibold text-espresso hover:bg-white"
        >
          <ShoppingBagIcon data-icon="inline-start" />
          Add to bag
          <span className="text-espresso/50 tabular-nums">{formatPrice(f.price)}</span>
        </Button>
      </PopoverContent>
    </Popover>
  )
}

function SurpriseButton() {
  const { brand, selected, goToFlavor } = useKuro()
  return (
    <button
      type="button"
      aria-label="Surprise me"
      className={iconButton}
      onClick={() => {
        const n = brand.flavors.length
        goToFlavor((selected + 1 + Math.floor(Math.random() * (n - 1))) % n)
      }}
    >
      <ShuffleIcon className="size-4" />
    </button>
  )
}

function BagPopover({ triggerClassName }: { triggerClassName?: string }) {
  const { brand, bag, setQty, clearBag, bagBumps } = useKuro()
  const count = bag.reduce((n, l) => n + l.qty, 0)
  const lines = bag.map((l) => ({ line: l, flavor: brand.flavors.find((f) => f.id === l.flavorId)! }))
  const subtotal = lines.reduce((s, { line, flavor }) => s + line.qty * flavor.price, 0)
  const drinks = `${count} ${count === 1 ? "drink" : "drinks"}`

  return (
    <Popover>
      <PopoverTrigger
        aria-label={count ? `Your bag, ${drinks}` : "Your bag, empty"}
        className={cn(
          iconButton,
          "relative text-cream aria-expanded:bg-black aria-expanded:ring-1 aria-expanded:ring-cream/25",
          triggerClassName
        )}
      >
        <ShoppingBagIcon className="size-4" />
        {count > 0 && (
          <span
            key={bagBumps}
            aria-hidden
            className="kuro-bump absolute -top-1.5 -right-1.5 grid h-[1.125rem] min-w-[1.125rem] place-items-center rounded-full bg-crema px-1 text-[0.625rem] leading-none font-bold text-espresso tabular-nums ring-2 ring-espresso"
          >
            {count}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent sideOffset={14} className={panel}>
        <div className="flex items-baseline justify-between px-3 pt-2 pb-3">
          <PopoverTitle render={<Eyebrow className={panelEyebrow} />}>Your bag</PopoverTitle>
          {count > 0 && <span className="text-xs text-cream/55">{drinks}</span>}
        </div>
        {count === 0 ? (
          <Empty className="py-8">
            <EmptyHeader>
              <EmptyTitle className="font-heading text-xl font-soft">Your bag is empty</EmptyTitle>
              <EmptyDescription className="text-cream/60">
                Pick a flavor from the wheel to get started.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <>
            <ul className="flex flex-col gap-3 px-2">
              {lines.map(({ line, flavor }) => (
                <li key={flavor.id} className="flex items-center gap-3">
                  <Ingredient cell={flavor.sprite} className={thumb} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-heading text-lg leading-tight font-soft">{flavor.name}</p>
                    <p className="text-sm text-cream/55 tabular-nums">{formatPrice(line.qty * flavor.price)}</p>
                  </div>
                  <div className="flex h-11 items-center rounded-full border border-cream/15 px-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Remove one ${flavor.name}`}
                      onClick={() => setQty(line, line.qty - 1)}
                      className="rounded-full hover:bg-cream/10"
                    >
                      <MinusIcon />
                    </Button>
                    <span className="w-7 text-center tabular-nums">{line.qty}</span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Add one ${flavor.name}`}
                      onClick={() => setQty(line, line.qty + 1)}
                      className="rounded-full hover:bg-cream/10"
                    >
                      <PlusIcon />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <Separator className="mx-2 mt-4 w-auto bg-cream/10" />
            <div className="flex items-baseline justify-between px-3 py-5">
              <span className="text-cream/70">Subtotal</span>
              <span className="font-heading text-2xl font-medium tabular-nums font-soft">
                {formatPrice(subtotal)}
              </span>
            </div>
            <Button variant="ghost" onClick={clearBag} className="mb-1 w-full text-cream/70 hover:bg-transparent">
              Clear bag
            </Button>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}

/** Compact bar that slides in once the hero has scrolled away. */
export function StickyNav() {
  const { brand, setBrand } = useKuro()
  const [shown, setShown] = React.useState(false)
  const other: BrandId = brand.id === "coffee" ? "matcha" : "coffee"
  const soft = "border-transparent bg-cream/[0.06]"

  React.useEffect(() => {
    const hero = document.getElementById("hero")!
    const onScroll = () => setShown(window.scrollY > hero.offsetTop + hero.offsetHeight - 120)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      inert={!shown}
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-[translate,opacity] duration-500 ease-out sm:px-6",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[1.25rem] border border-cream/10 bg-espresso/80 py-2 pr-2 pl-5 text-cream shadow-[0_18px_40px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl"
      >
        <a
          href="#hero"
          className="rounded-md font-heading text-[1.625rem] leading-none font-semibold tracking-[-0.04em] font-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crema"
        >
          {brand.wordmark}
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-cream/70 transition-colors hover:bg-cream/[0.07] hover:text-cream focus-visible:outline-2 focus-visible:outline-crema"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <BrandToggle className={cn("hidden border sm:inline-flex", soft)} />
          <button
            type="button"
            aria-label={`Switch to ${other}`}
            onClick={() => setBrand(other)}
            className={cn(iconButton, "size-10 border text-crema sm:hidden", soft)}
          >
            {brand.id === "coffee" ? <LeafIcon className="size-4" /> : <CoffeeIcon className="size-4" />}
          </button>
          <a
            href="#join"
            className="hidden rounded-full bg-cream px-4 py-2.5 text-sm font-semibold text-espresso transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crema sm:inline-flex"
          >
            Join the list
          </a>
          <BagPopover triggerClassName="size-10 rounded-[0.9rem] bg-cream/[0.06]" />
          <SiteMenu className={cn("lg:hidden", soft)} />
        </div>
      </nav>
    </header>
  )
}

function SiteMenu({ className }: { className?: string }) {
  const { brand } = useKuro()
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Open menu"
        className={cn(iconButton, glass, "size-10 rounded-[0.9rem] text-cream/80", className)}
      >
        <MenuIcon className="size-4" />
      </SheetTrigger>
      <SheetContent className="border-cream/10 bg-espresso text-cream">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="font-heading text-3xl font-semibold tracking-[-0.04em] text-cream font-soft">
            {brand.wordmark}
          </SheetTitle>
          <SheetDescription className="text-cream/60">{brand.tagline}</SheetDescription>
        </SheetHeader>
        <nav aria-label="Sections" className="flex flex-col px-6">
          {navLinks.map(([label, href]) => (
            <SheetClose
              key={href}
              render={<a href={href} />}
              className="border-b border-cream/10 py-4 font-heading text-3xl font-medium tracking-[-0.02em] text-cream/85 transition-colors font-soft hover:text-cream"
            >
              {label}
            </SheetClose>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-4 p-6">
          <BrandToggle className="border border-cream/10" />
          <SheetClose
            render={<a href="#join" />}
            className="inline-flex h-12 items-center justify-center rounded-full bg-cream text-sm font-semibold text-espresso transition-colors hover:bg-white"
          >
            Join the list
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
