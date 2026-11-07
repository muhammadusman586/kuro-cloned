import { createCn } from "cn/config"

// `font-soft` sets variation axes, not a family; without its own group it evicts `font-heading`
export const cn = createCn({
  extend: { classGroups: { "font-variation": ["font-soft"] } },
})
