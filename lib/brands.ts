export type BrandId = "coffee" | "matcha"

export type Flavor = {
  id: string
  name: string
  /** Short name shown under the cup in the hero */
  label: string
  price: number
  caffeine: string
  description: string
  notes: string[]
  scene: string
  alt: string
  /** Cell in the 3×2 ingredient sprite: [column, row] */
  sprite: [number, number]
}

export type Brand = {
  id: BrandId
  name: string
  wordmark: string
  company: string
  drink: string
  sprite: string
  spriteKey: string
  flavors: Flavor[]
  story: {
    image: string
    alt: string
    badge: string
    badgeCaption: string
    title: string
    body: string[]
    stats: { value: string; label: string }[]
  }
  menu: { title: string; intro: string; milk: string }
  process: {
    title: string
    steps: { title: string; body: string; image: string; alt: string }[]
  }
  origins: {
    title: string
    intro: string
    items: {
      share: string
      name: string
      region: string
      body: string
      specs: [string, string][]
      contourAt: string
    }[]
  }
  tagline: string
}

export const brands: Record<BrandId, Brand> = {
  coffee: {
    id: "coffee",
    name: "Coffee",
    wordmark: "kuro",
    company: "Kuro Coffee",
    drink: "coffee",
    sprite: "/images/ingredients.jpg",
    spriteKey: "/images/ingredients-key.jpg",
    flavors: [
      {
        id: "original",
        name: "Kuro Original",
        label: "Original",
        price: 5.4,
        caffeine: "150 mg",
        description:
          "A double shot of our house espresso poured over ice and cold whole milk. Bold, smooth and quietly sweet.",
        notes: ["Dark cocoa", "Toasted almond", "Brown sugar"],
        scene: "/images/scenes/original.jpg",
        alt: "Iced Kuro Original latte in a clear cup, espresso swirling into cold milk, standing on a mound of ground coffee",
        sprite: [0, 0],
      },
      {
        id: "caramel",
        name: "Salted Caramel",
        label: "Caramel",
        price: 5.9,
        caffeine: "150 mg",
        description:
          "Slow-cooked caramel stirred into espresso and cold milk, finished with a pinch of flaky sea salt.",
        notes: ["Burnt sugar", "Butterscotch", "Sea salt"],
        scene: "/images/scenes/caramel-latte.jpg",
        alt: "The same iced latte turned golden amber with caramel stirred through it",
        sprite: [1, 0],
      },
      {
        id: "vanilla",
        name: "Vanilla Cream",
        label: "Vanilla",
        price: 5.7,
        caffeine: "150 mg",
        description:
          "Madagascar vanilla bean syrup swirled into a mellow espresso latte. Soft, round and creamy.",
        notes: ["Vanilla bean", "Fresh cream", "Wildflower honey"],
        scene: "/images/scenes/vanilla-latte.jpg",
        alt: "The same iced latte turned pale and creamy with vanilla stirred through it",
        sprite: [2, 0],
      },
      {
        id: "hazelnut",
        name: "Toasted Hazelnut",
        label: "Hazelnut",
        price: 5.9,
        caffeine: "150 mg",
        description:
          "House-roasted hazelnut syrup stirred into espresso and cold milk. Nutty, toasty and smooth.",
        notes: ["Roasted hazelnut", "Praline", "Milk chocolate"],
        scene: "/images/scenes/hazelnut-latte.jpg",
        alt: "The same iced latte turned a warm tan with hazelnut stirred through it",
        sprite: [0, 1],
      },
      {
        id: "mocha",
        name: "Dark Mocha",
        label: "Mocha",
        price: 6.2,
        caffeine: "165 mg",
        description:
          "70% dark chocolate melted into a double shot and cold milk. Deep, rich and velvety.",
        notes: ["Dark chocolate", "Black cherry", "Cocoa nib"],
        scene: "/images/scenes/mocha-latte.jpg",
        alt: "The same iced latte turned deep chocolate brown with dark chocolate stirred through it",
        sprite: [1, 1],
      },
      {
        id: "cinnamon",
        name: "Brown Sugar Cinnamon",
        label: "Cinnamon",
        price: 5.9,
        caffeine: "150 mg",
        description:
          "Brown sugar syrup and Ceylon cinnamon shaken with espresso and cold milk. Warm, spiced and mellow.",
        notes: ["Molasses", "Ceylon cinnamon", "Toffee"],
        scene: "/images/scenes/cinnamon-latte.jpg",
        alt: "The same iced latte turned a warm reddish brown with brown sugar and cinnamon stirred through it",
        sprite: [2, 1],
      },
    ],
    story: {
      image: "/images/story/bean.jpg",
      alt: "A single dark roasted coffee bean",
      badge: "7 days",
      badgeCaption: "Every roast rests before we brew it",
      title: "Kuro means black. The rest is up to you.",
      body: [
        "We started with one stubborn idea: a perfect black espresso is the foundation of every great iced latte. So we roast two single origin coffees in small batches and pull every shot to order.",
        "Then we make our flavors the slow way, every morning, from real caramel, real vanilla bean, toasted hazelnuts and dark chocolate. Pick one above, or keep it classic. Either way, it starts black.",
      ],
      stats: [
        { value: "2", label: "Single origins, roasted every week" },
        { value: "6", label: "Flavors made in house each morning" },
        { value: "0", label: "Powders or artificial syrups" },
      ],
    },
    menu: {
      title: "Six iced lattes. One perfect shot.",
      intro:
        "Every drink starts with a double shot of Kuro espresso over ice and cold milk, then one of our house-made flavors.",
      milk: "Whole, Oat, Almond",
    },
    process: {
      title: "From green bean to your cup in four careful steps.",
      steps: [
        {
          title: "Roast",
          body: "Every Tuesday we roast small batches to a deep medium-dark, chasing cocoa sweetness without the bitterness.",
          image: "/images/process/roast.jpg",
          alt: "Six coffee beans in a row, from pale green to dark roasted",
        },
        {
          title: "Rest",
          body: "Fresh beans rest for seven days so the gases settle and every shot pulls smooth and balanced.",
          image: "/images/process/rest.jpg",
          alt: "Roasted coffee beans poured into a golden coffee bag",
        },
        {
          title: "Pull",
          body: "Each drink gets its own double shot, pulled to order with 18 grams in and 36 grams out.",
          image: "/images/process/pull.jpg",
          alt: "Espresso dripping from a portafilter spout",
        },
        {
          title: "Pour",
          body: "The shot meets ice, cold milk and a house-made flavor, then goes straight into your hand.",
          image: "/images/process/pour.jpg",
          alt: "Milk being poured into a glass of iced coffee",
        },
      ],
    },
    origins: {
      title: "Two origins, blended for depth.",
      intro:
        "Our house espresso pairs a chocolate-heavy Colombian with a bright, floral Ethiopian, so it holds its own under milk, ice and every flavor on the menu.",
      items: [
        {
          share: "60% of the blend",
          name: "Huila",
          region: "Colombia",
          body: "Grown around 1,700 meters on the Andean slopes of southern Colombia, this washed coffee gives the blend its cocoa backbone and a long caramel finish.",
          specs: [
            ["Altitude", "1,700 m"],
            ["Process", "Washed"],
            ["Notes", "Cocoa, red apple"],
          ],
          contourAt: "85% 115%",
        },
        {
          share: "40% of the blend",
          name: "Sidama",
          region: "Ethiopia",
          body: "From smallholder farms near 2,000 meters, this natural process coffee adds a lift of jasmine and blueberry that keeps every latte bright.",
          specs: [
            ["Altitude", "2,000 m"],
            ["Process", "Natural"],
            ["Notes", "Jasmine, blueberry"],
          ],
          contourAt: "15% -15%",
        },
      ],
    },
    tagline: "Small-batch iced lattes, poured black first.",
  },
  matcha: {
    id: "matcha",
    name: "Matcha",
    wordmark: "midori",
    company: "Midori Matcha",
    drink: "matcha",
    sprite: "/images/matcha/ingredients-v2.jpg",
    spriteKey: "/images/matcha/ingredients-v2-key.jpg",
    flavors: [
      {
        id: "original",
        name: "Midori Original",
        label: "Original",
        price: 5.9,
        caffeine: "70 mg",
        description:
          "Ceremonial grade matcha whisked to order and poured over ice and cold milk. Grassy, sweet and silky.",
        notes: ["Fresh grass", "Sweet cream", "Umami"],
        scene: "/images/matcha/scenes/original.jpg",
        alt: "Iced Midori matcha latte in a clear cup, vivid green matcha swirling into cold milk, standing on a mound of matcha powder",
        sprite: [0, 0],
      },
      {
        id: "blueberry",
        name: "Wild Blueberry",
        label: "Blueberry",
        price: 6.4,
        caffeine: "70 mg",
        description:
          "Wild blueberry compote stirred into cold milk under a layer of whisked matcha. Mellow and berry sweet.",
        notes: ["Wild blueberry", "Vanilla", "Green tea"],
        scene: "/images/matcha/scenes/blueberry.jpg",
        alt: "The same iced matcha latte with lavender blueberry milk swirling beneath the green",
        sprite: [2, 0],
      },
      {
        id: "cherry",
        name: "Dark Cherry",
        label: "Cherry",
        price: 6.6,
        caffeine: "70 mg",
        description:
          "Dark cherry syrup and a pinch of sakura salt beneath whisked matcha and cold milk.",
        notes: ["Dark cherry", "Sakura", "Almond"],
        scene: "/images/matcha/scenes/cherry.jpg",
        alt: "The same iced matcha latte with deep cherry red milk swirling beneath the green",
        sprite: [1, 1],
      },
      {
        id: "coconut",
        name: "Coconut Cream",
        label: "Coconut",
        price: 6.2,
        caffeine: "70 mg",
        description:
          "Toasted coconut milk and a touch of cane sugar make this our creamiest, softest matcha.",
        notes: ["Toasted coconut", "Cane sugar", "Matcha"],
        scene: "/images/matcha/scenes/coconut.jpg",
        alt: "The same iced matcha latte turned pale and creamy with coconut milk",
        sprite: [2, 1],
      },
      {
        id: "blackberry",
        name: "Blackberry Bramble",
        label: "Blackberry",
        price: 6.4,
        caffeine: "70 mg",
        description:
          "Tart blackberries muddled with wildflower honey, layered under matcha and oat milk.",
        notes: ["Blackberry", "Wildflower honey", "Green tea"],
        scene: "/images/matcha/scenes/blackberry.jpg",
        alt: "The same iced matcha latte with deep plum blackberry milk swirling beneath the green",
        sprite: [0, 1],
      },
      {
        id: "strawberry",
        name: "Strawberry Cloud",
        label: "Strawberry",
        price: 6.4,
        caffeine: "70 mg",
        description:
          "Crushed ripe strawberries and cold milk under a layer of whisked matcha. Bright, jammy and soft.",
        notes: ["Ripe strawberry", "Cream", "Green tea"],
        scene: "/images/matcha/scenes/strawberry.jpg",
        alt: "The same iced matcha latte with soft pink strawberry milk swirling beneath the green",
        sprite: [1, 0],
      },
    ],
    story: {
      image: "/images/matcha/story/tea.jpg",
      alt: "A cup of green tea on a saucer beside a sprig of leaves",
      badge: "21 days",
      badgeCaption: "Our tea grows in shade before harvest",
      title: "Midori means green. We take that seriously.",
      body: [
        "Our matcha comes from shaded tea gardens in Uji and Nishio, stone-milled into a fine, vivid powder just weeks before it reaches the counter.",
        "We whisk every cup to order and pair it with real fruit, never syrup from a bottle. Pick a flavor above, or keep it pure. Either way, it starts green.",
      ],
      stats: [
        { value: "2", label: "Tea gardens in Japan we source from" },
        { value: "6", label: "Fruit pairings made fresh each morning" },
        { value: "0", label: "Added colors or powdered mixes" },
      ],
    },
    menu: {
      title: "Six iced matchas. One perfect whisk.",
      intro:
        "Every drink starts with ceremonial matcha whisked to order over ice and cold milk, then one of our fresh fruit pairings.",
      milk: "Whole, Oat, Coconut",
    },
    process: {
      title: "From shaded leaf to your cup in four careful steps.",
      steps: [
        {
          title: "Shade",
          body: "For three weeks before harvest the tea bushes grow under shade cloth, which deepens their color and sweetness.",
          image: "/images/matcha/process/shade.jpg",
          alt: "Rows of tea bushes under black shade cloth on a hillside in Japan",
        },
        {
          title: "Grind",
          body: "The dried leaves are slowly stone-milled, about 40 grams an hour, into a silky, vivid powder.",
          image: "/images/matcha/process/grind.jpg",
          alt: "A wooden scoop of bright green matcha powder over a glass of matcha",
        },
        {
          title: "Whisk",
          body: "Each drink gets two grams of matcha whisked by hand with a bamboo whisk until smooth and foamy.",
          image: "/images/matcha/process/whisk.jpg",
          alt: "Hands whisking matcha in a ceramic bowl with a bamboo whisk",
        },
        {
          title: "Pour",
          body: "The matcha meets ice, cold milk and a fresh fruit pairing, then goes straight into your hand.",
          image: "/images/matcha/process/pour.jpg",
          alt: "An iced matcha latte in a glass with a glass straw",
        },
      ],
    },
    origins: {
      title: "Two gardens, blended for balance.",
      intro:
        "We pair a deep, savory Uji matcha with a brighter Nishio harvest, so every drink stays vivid under milk, ice and fruit.",
      items: [
        {
          share: "60% of the blend",
          name: "Uji",
          region: "Kyoto, Japan",
          body: "Grown in the misty hills south of Kyoto, where tea has been shaded and stone-milled for centuries, Uji matcha gives the blend its deep umami and creamy body.",
          specs: [
            ["Harvest", "First flush"],
            ["Shading", "21 days"],
            ["Notes", "Umami, sweet grass"],
          ],
          contourAt: "85% 115%",
        },
        {
          share: "40% of the blend",
          name: "Nishio",
          region: "Aichi, Japan",
          body: "From the river plains of Aichi, Nishio matcha adds a bright jade color and a clean, lightly floral finish that stays vivid under fruit.",
          specs: [
            ["Harvest", "First flush"],
            ["Shading", "20 days"],
            ["Notes", "Floral, sweet pea"],
          ],
          contourAt: "15% -15%",
        },
      ],
    },
    tagline: "Ceremonial matcha, whisked to order.",
  },
}

export const formatPrice = (n: number) => `$${n.toFixed(2)}`
