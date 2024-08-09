import {Body, Controller, Delete, Get, Post, UsePipes} from '@nestjs/common';
import {WarehouseService} from "../services/warehouse.service";
import {Prisma, Warehouse} from "@prisma/client";
import {IntBodyPropsPipe} from "../pipes/int-body-props-pipe";

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {
  }

  @Get()
  async getAllWarehouses(): Promise<Warehouse[]> {
    return this.warehouseService.getAllWarehouses()
  }

  @Post()
  @UsePipes(IntBodyPropsPipe)
  async postWarehouse(@Body() postData: { productId: number, ids: number[] }): Promise<Prisma.BatchPayload> {
    const {productId, ids} = postData;
    return this.warehouseService.postStocks(productId, ids)
  }

  @Delete()
  @UsePipes(IntBodyPropsPipe)
  async deleteWarehouse(@Body() deleteData: { productId: number }): Promise<Prisma.BatchPayload> {
    const {productId} = deleteData;
    return this.warehouseService.deleteStocks(productId)
  }
}
