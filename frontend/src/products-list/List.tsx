import React, {useEffect, useState} from "react";
import {getProducts} from "../fetchers/http";
import {Product} from "../types/products";
import ProductsTable from "./Table";

const List = () => {
  const [list, setList] = useState<Product[] | null>(null)

  useEffect(() => {
    getProducts().then((products) => setList(products)).catch(() => setList([]))
  }, [])

  return (
    <>{!list ? <div>Loading products...</div> : <ProductsTable list={list}/>}</>
  )
}

export default List;
