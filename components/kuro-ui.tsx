"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

import { useKuro } from "@/components/kuro-provider"

/** Splits a headline into masked words that rise in one after another. */
export function Words({
  text,
  delay = 80,
  soft,
  offset = 0,
}: {
  text: string
  delay?: number
  /** Blur-in variant used by the hero; plays on mount instead of on scroll */
  soft?: boolean
  offset?: number
}) {
  const words = text.split(" ")
  return (
    <span
      data-reveal={soft ? undefined : "words"}
      className={cn("kuro-words", soft && "kuro-words-soft")}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="kuro-word">
            <span className="kuro-word-inner" style={{ "--i": i + offset } as React.CSSProperties}>
              {w}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </span>
  )
}

export function reveal(kind: "fade-up" | "image", delay = 0) {
  return {
    "data-reveal": kind,
    style: { "--reveal-delay": `${delay}ms` } as React.CSSProperties,
  }
}

export function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-[0.6875rem] font-semibold tracking-[0.2em] uppercase", className)} {...props} />
}

export const headingClass =
  "font-heading font-soft text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] font-medium tracking-[-0.03em] text-balance"

/**
 * One cell of the 3×2 ingredient sprite. `keyed` uses the blue-screen sprite and
 * knocks the blue out with an SVG colour matrix, so the ingredient floats free.
 */
export function Ingredient({
  cell: [col, row],
  keyed,
  className,
}: {
  cell: [number, number]
  keyed?: boolean
  className?: string
}) {
  const { brand } = useKuro()
  const id = "kuro-cutout-" + React.useId().replace(/[^\w-]/g, "")
  return (
    <span className={cn("relative block overflow-hidden", className)}>
      {keyed && (
        <svg className="absolute size-0" aria-hidden>
          <filter id={id}>
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  6 6 -6 0 1.2" />
          </filter>
        </svg>
      )}
      <span className="absolute inset-0 block" style={keyed ? { filter: `url(#${id})` } : undefined}>
        <span
          className="absolute block"
          style={{ width: "390%", height: "260%", left: `-${15 + 130 * col}%`, top: `-${15 + 130 * row}%` }}
        >
          <Image
            src={keyed ? brand.spriteKey : brand.sprite}
            alt=""
            fill
            sizes="800px"
            className="object-cover"
          />
        </span>
      </span>
    </span>
  )
}

/** Marks [data-reveal] elements as revealed when they scroll into view. */
export function RevealObserver() {
  const { brand } = useKuro()
  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.setAttribute("data-revealed", "")
          io.unobserve(e.target)
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    )
    document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [brand.id])
  return null
}
