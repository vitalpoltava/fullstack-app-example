import type {Stock} from "../types/products"

export const getPrice = (cents: number): string =>
  (cents / 100).toLocaleString("en-US", {style: "currency", currency: "USD"});

export const getAvailability = (stockData: Stock[]): string => {
  const availability: string[] = []

  if (stockData.length) {
    stockData.forEach((stock) => availability.push(stock.house.city))
  }

  return availability.join(', ');
}
