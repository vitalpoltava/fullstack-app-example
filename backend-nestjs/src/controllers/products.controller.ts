import {Body, Controller, Delete, Get, Put, Post, UsePipes} from '@nestjs/common';
import {ProductsService} from "../services/products.service";
import {Product} from "@prisma/client";
import type {RequestProduct} from "../types/product";
import {IntBodyPropsPipe} from "../pipes/int-body-props-pipe";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getProducts()
  }

  @Post()
  async postProduct(@Body() postData: Omit<Product, "id">): Promise<Product> {
    return this.productsService.postProduct(postData)
  }

  @Put()
  @UsePipes(IntBodyPropsPipe)
  async putProduct(@Body() putData: RequestProduct): Promise<Product> {
    const {id, price, name, description} = putData;
    return this.productsService.putProduct(
      {id, name, description, price}
    )
  }

  @Delete()
  @UsePipes(IntBodyPropsPipe)
  async deleteProduct(@Body() data: { productId: number }): Promise<void> {
    return this.productsService.deleteProduct(data.productId)
  }
}
