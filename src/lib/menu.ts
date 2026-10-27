// Prices and items are transcribed from the cafe's own posted menu images.
// They may be out of date, so the site tells visitors to confirm with the cafe.

export type Item = {
  name: string;
  /** One entry per column in the group's `cols`. null means not offered. */
  prices: (number | null)[];
  note?: string;
  /** Free-text price for items that don't fit the column layout. */
  display?: string;
};

export type Group = {
  title?: string;
  note?: string;
  cols?: string[];
  items: Item[];
};

export type Photo = {
  src: string;
  caption: string;
  aspect: string;
  pos?: string;
};

export type Category = {
  id: string;
  label: string;
  groups: Group[];
  photos: Photo[];
};

const HC = ["Hot", "Cold"];

export const MENU: Category[] = [
  {
    id: "coffee",
    label: "Coffee",
    groups: [
      {
        cols: HC,
        items: [
          { name: "Americano", prices: [140, 150] },
          { name: "Oolong Tea Americano", prices: [null, 185] },
          { name: "Cooling Blue Americano", prices: [null, 200] },
          { name: "Rose Americano", prices: [185, 195] },
          { name: "Orange Americano", prices: [null, 185] },
          { name: "Fresh Coconut Americano", prices: [null, 200] },
          { name: "Cappuccino", prices: [180, null] },
          { name: "Cafe Latte", prices: [170, 180] },
          { name: "Hazelnut Latte", prices: [185, 195] },
          { name: "Vanilla Latte", prices: [185, 195] },
          { name: "Coconut Latte", prices: [190, 200] },
          { name: "Mocha Latte", prices: [180, 190] },
          { name: "Spanish Latte", prices: [185, 195] },
          { name: "Caramel Machiatto", prices: [190, 200] },
          { name: "Oat Latte", prices: [200, 210] },
          { name: "Seasalt Oat Latte", prices: [210, 220] },
          { name: "Dirty Matcha", prices: [235, 250] },
        ],
      },
    ],
    photos: [
      {
        src: "/images/menu/rose-americano.webp",
        caption: "Rose Americano",
        aspect: "3/4",
        pos: "50% 15%",
      },
    ],
  },
  {
    id: "non-coffee",
    label: "Non-coffee",
    groups: [
      {
        cols: HC,
        items: [
          { name: "Signature Oat Choco", prices: [185, 195] },
          { name: "Strawberry Purr", prices: [null, 180] },
          { name: "Oreo Cloud", prices: [null, 185] },
          { name: "Biscoff Purr", prices: [null, 220] },
        ],
      },
    ],
    photos: [],
  },
  {
    id: "frappe",
    label: "Frappe",
    groups: [
      {
        title: "Non-coffee frappe",
        items: [
          { name: "Vanilla Frappe", prices: [175] },
          { name: "Ube Frappe", prices: [195] },
          { name: "Salted Caramel Frappe", prices: [185] },
          { name: "Strawberry Frappe", prices: [185] },
          { name: "Blueberry Frappe", prices: [185] },
          { name: "Melon Frappe", prices: [185] },
          { name: "Chocolate Frappe", prices: [185] },
          { name: "Oreo Frappe", prices: [195] },
          { name: "Matcha Frappe", prices: [230], note: "oat milk base" },
        ],
      },
      {
        title: "Coffee-base frappe",
        items: [
          { name: "Salted Caramel Frappe", prices: [200] },
          { name: "Java Chip Frappe", prices: [200] },
          { name: "Mocha Frappe", prices: [200] },
        ],
      },
    ],
    photos: [],
  },
  {
    id: "matcha",
    label: "Matcha",
    groups: [
      {
        title: "UJI Matcha",
        note: "Oat milk base",
        cols: ["Cold"],
        items: [
          { name: "UJI Matcha", prices: [275] },
          { name: "UJI Seasalt Matcha", prices: [285] },
          { name: "UJI Rose Matcha", prices: [320] },
        ],
      },
      {
        title: "Matcha series",
        note: "Oat milk base",
        cols: HC,
        items: [
          { name: "Matcha Latte", prices: [210, 220] },
          { name: "Seasalt Matcha", prices: [null, 230] },
          { name: "Strawberry Matcha", prices: [null, 230] },
          { name: "Blueberry Matcha", prices: [null, 230] },
          { name: "Oreo Matcha", prices: [null, 235] },
        ],
      },
    ],
    photos: [
      {
        src: "/images/menu/uji-rose-matcha.webp",
        caption: "UJI Rose Matcha",
        aspect: "3/4",
        pos: "50% 15%",
      },
      {
        src: "/images/menu/uji-matcha.webp",
        caption: "UJI Matcha",
        aspect: "3/4",
        pos: "50% 15%",
      },
    ],
  },
  {
    id: "special-blends",
    label: "Special blends",
    groups: [
      {
        note: "Oat milk base",
        items: [
          { name: "Whiskers Signature Coffee", prices: [265] },
          {
            name: "Biscoff Cloud Latte",
            prices: [],
            display: "₱235 full cream · ₱265 oat milk",
          },
          { name: "Cooling Coconut Latte", prices: [260] },
        ],
      },
    ],
    photos: [
      {
        src: "/images/menu/signature-coffee.webp",
        caption: "Whiskers Signature Coffee",
        aspect: "3/4",
        pos: "50% 10%",
      },
      {
        src: "/images/menu/biscoff-cloud-latte.webp",
        caption: "Biscoff Cloud Latte",
        aspect: "3/4",
        pos: "50% 10%",
      },
      {
        src: "/images/menu/cooling-coconut-latte.webp",
        caption: "Cooling Coconut Latte",
        aspect: "3/4",
        pos: "50% 10%",
      },
    ],
  },
  {
    id: "refreshers",
    label: "Refreshers",
    groups: [
      {
        note: "+₱30 for sinkers",
        cols: ["Soda", "Non-soda"],
        items: [
          { name: "Classic Lemonade", prices: [null, 150] },
          { name: "Huamei Lemon", prices: [200, null] },
          { name: "Lemon Yakult", prices: [null, 180] },
          { name: "Passion Fruit", prices: [null, 185] },
          { name: "Grapefruit", prices: [180, 165] },
          { name: "Peach Mango", prices: [180, 175] },
          { name: "Raspberry", prices: [180, 165] },
          { name: "Blueberry", prices: [180, 165] },
          { name: "Strawberry", prices: [180, 165] },
          { name: "Apple Zest", prices: [180, null] },
          { name: "Triple Peach", prices: [180, 165] },
        ],
      },
    ],
    photos: [
      {
        src: "/images/menu/huamei-lemon.webp",
        caption: "Huamei Lemon",
        aspect: "3/4",
        pos: "50% 10%",
      },
    ],
  },
  {
    id: "food",
    label: "Food",
    groups: [
      {
        title: "Pica-pica",
        items: [
          {
            name: "Fries",
            prices: [185],
            note: "cheese, sour cream, or barbeque",
          },
          { name: "Golden Mantou", prices: [160] },
          { name: "Nachos", prices: [295] },
          { name: "Chicken Poppers", prices: [260] },
          { name: "Chicken Pops & Fries", prices: [245] },
        ],
      },
      {
        title: "Rice bowls",
        items: [
          { name: "Honey Tocino", prices: [210] },
          { name: "Beef Tapa", prices: [215] },
          { name: "Chicken Katsu", prices: [235] },
          { name: "Spam Cubes", prices: [220] },
          { name: "Hungarian", prices: [200] },
          { name: "Cheesy Hungarian", prices: [215] },
          { name: "Taiwanese Sausage", prices: [250] },
        ],
      },
      {
        title: "Pasta",
        items: [
          { name: "Creamy Carbonara", prices: [295] },
          { name: "Chicken Pesto", prices: [320] },
          { name: "Italian Spaghetti", prices: [285] },
          { name: "Truffle Pasta", prices: [315] },
        ],
      },
      {
        title: "Chicken wings",
        items: [
          { name: "Teriyaki", prices: [265] },
          { name: "Hickory BBQ", prices: [265] },
          { name: "Spicy Korean BBQ", prices: [265] },
          { name: "Honey Siracha", prices: [280] },
        ],
      },
    ],
    photos: [
      {
        src: "/images/menu/chicken-poppers.webp",
        caption: "Chicken Poppers",
        aspect: "4/3",
      },
      {
        src: "/images/menu/chicken-katsu.webp",
        caption: "Chicken Katsu",
        aspect: "4/3",
      },
      {
        src: "/images/menu/carbonara.webp",
        caption: "Creamy Carbonara",
        aspect: "1/1",
        pos: "40% 45%",
      },
    ],
  },
  {
    id: "add-ons",
    label: "Add-ons",
    groups: [
      {
        items: [
          { name: "Espresso Shot", prices: [35] },
          { name: "Oat Milk", prices: [50] },
          { name: "Almond Milk", prices: [70] },
          { name: "Extra Syrup", prices: [30] },
          { name: "Extra Sauce", prices: [30] },
          { name: "Popping Boba", prices: [30] },
          { name: "Nata", prices: [30] },
          { name: "Egg", prices: [30] },
          { name: "Rice", prices: [50] },
          { name: "Nacho Dip", prices: [120] },
        ],
      },
    ],
    photos: [],
  },
];

export const peso = (n: number | null) => (n == null ? "–" : `₱${n}`);
