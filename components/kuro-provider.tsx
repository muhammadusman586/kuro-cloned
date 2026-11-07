"use client"

import * as React from "react"

import { brands, type Brand, type BrandId } from "@/lib/brands"

type BagLine = { brand: BrandId; flavorId: string; qty: number }

type KuroState = {
  brand: Brand
  setBrand: (id: BrandId) => void
  selected: number
  setSelected: (i: number) => void
  /** Scroll the hero so the wheel lands on flavor i */
  goToFlavor: (i: number) => void
  paused: boolean
  togglePaused: () => void
  bag: BagLine[]
  addToBag: (flavorId: string) => void
  setQty: (line: BagLine, qty: number) => void
  clearBag: () => void
  /** Increments on every add, so the bag icon can replay its bump */
  bagBumps: number
  announce: string
}

const KuroContext = React.createContext<KuroState | null>(null)

export function useKuro() {
  const ctx = React.useContext(KuroContext)
  if (!ctx) throw new Error("useKuro must be used inside <KuroProvider>")
  return ctx
}

export function KuroProvider({ children }: { children: React.ReactNode }) {
  const [brandId, setBrandId] = React.useState<BrandId>("coffee")
  const [selected, setSelected] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const [bag, setBag] = React.useState<BagLine[]>([])
  const [bagBumps, setBagBumps] = React.useState(0)
  const [announce, setAnnounce] = React.useState("")
  const brand = brands[brandId]

  const setBrand = React.useCallback((id: BrandId) => {
    const html = document.documentElement
    html.dataset.brandSwitching = "true"
    html.dataset.brand = id
    setBrandId(id)
    window.setTimeout(() => delete html.dataset.brandSwitching, 700)
  }, [])

  const togglePaused = React.useCallback(() => {
    setPaused((p) => {
      document.documentElement.dataset.motion = p ? "running" : "paused"
      return !p
    })
  }, [])

  const goToFlavor = React.useCallback((i: number) => {
    const hero = document.getElementById("hero")
    if (!hero) return
    const range = hero.offsetHeight - window.innerHeight
    const last = brands.coffee.flavors.length - 1
    window.scrollTo({ top: hero.offsetTop + (range * i) / last, behavior: "smooth" })
  }, [])

  const addToBag = React.useCallback(
    (flavorId: string) => {
      setBag((lines) => {
        const hit = lines.find((l) => l.brand === brandId && l.flavorId === flavorId)
        if (hit) return lines.map((l) => (l === hit ? { ...l, qty: l.qty + 1 } : l))
        return [...lines, { brand: brandId, flavorId, qty: 1 }]
      })
      setBagBumps((n) => n + 1)
      const name = brand.flavors.find((f) => f.id === flavorId)?.name
      setAnnounce(`${name} added to your bag`)
    },
    [brand, brandId]
  )

  const setQty = React.useCallback((line: BagLine, qty: number) => {
    setBag((lines) =>
      qty <= 0
        ? lines.filter((l) => l !== line)
        : lines.map((l) => (l === line ? { ...l, qty } : l))
    )
  }, [])

  const value: KuroState = {
    brand,
    setBrand,
    selected,
    setSelected,
    goToFlavor,
    paused,
    togglePaused,
    // each brand keeps its own bag; only the active one is shown
    bag: bag.filter((l) => l.brand === brandId),
    addToBag,
    setQty,
    clearBag: () => setBag([]),
    bagBumps,
    announce,
  }

  return <KuroContext.Provider value={value}>{children}</KuroContext.Provider>
}
