import {Body, Controller, Delete, Get, Put, Post} from '@nestjs/common';
import {ProductsService} from "../services/products.service";
import {Product} from "@prisma/client";

type RequestProduct = {
  id: string;
  name: string;
  description: string;
  price: string;
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getProducts()
  }

  @Post()
  async postProduct(@Body() postData: Omit<Product, "id">): Promise<Product> {
    return this.productsService.postProduct(postData)
  }

  @Put()
  async putProduct(@Body() putData: RequestProduct): Promise<Product> {
    const { id, price, name, description } = putData;
    return this.productsService.putProduct(
      {id: parseInt(id), name, description, price: parseInt(price)}
    )
  }

  @Delete()
  async deleteProduct(@Body() data: {productId: string}): Promise<void> {
    return this.productsService.deleteProduct(parseInt(data.productId))
  }
}
