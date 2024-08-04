import type {Stock} from "../types/products";

export const isChecked = (stock: Stock[], city: string): boolean =>
  !!stock.find((item) => item.house.city === city)
