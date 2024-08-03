export type Stock = {
  house: {
    city: string
  }
}

export type Product = {
  id: string
  name: string
  description: string
  price: number
  stock: Stock[]
}

export type NewProduct = Omit<Product, "id" | "stock">

export type City = {
  id: string,
  city: string,
}

export type Warehouse = {
  productId: string,
  houseId: string,
}

