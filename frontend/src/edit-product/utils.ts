import type {City, Stock} from "../types/products";

export const getCityIds = (stock: Stock[], cities: City[]) => stock.map((item) => {
  const selected = cities.find((city) => (item.house.city === city.city))
  return selected?.id || ''
})

export const getPrice = (cents: number): string => (cents / 100).toString();
