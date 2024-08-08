import {API_BASE_URL} from "./config";
import {EditProduct, NewProduct, Product, Warehouse} from "../types/products";

export const getCities = () => fetch(`${API_BASE_URL}/warehouse`).then((res) => res.json());

export const getProducts = () => fetch(`${API_BASE_URL}/products`).then((res) => res.json());
export const postProduct = (data: NewProduct): Promise<Product> => fetch(`${API_BASE_URL}/products`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}).then((res) => res.json());
export const deleteProduct = (productId: string) => fetch(`${API_BASE_URL}/products/`, {
  method: 'DELETE',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({productId})
});
export const updateProduct = (data: EditProduct) => fetch(`${API_BASE_URL}/products/`, {
  method: 'PUT',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}).then((res) => res.json());

export const postWarehouse = (productId: string, ids: string[]): Promise<Warehouse> => fetch(`${API_BASE_URL}/warehouse`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({productId, ids})
}).then((res) => res.json());
export const deleteWarehouse = (productId: string): Promise<Warehouse> => fetch(`${API_BASE_URL}/warehouse`, {
  method: 'DELETE',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({productId})
}).then((res) => res.json());
