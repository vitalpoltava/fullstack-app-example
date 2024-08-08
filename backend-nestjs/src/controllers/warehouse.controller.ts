import {Body, Controller, Delete, Get, Put, Post} from '@nestjs/common';
import {WarehouseService} from "../services/warehouse.service";
import {Prisma, Stock, Warehouse} from "@prisma/client";

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get()
  async getAllWarehouses(): Promise<Warehouse[]> {
    return this.warehouseService.getAllWarehouses()
  }

  @Post()
  async postWarehouse(@Body() postData: {productId: string, ids: string[]}): Promise<Prisma.BatchPayload> {
    const {productId, ids} = postData;
    return this.warehouseService.postStocks(parseInt(productId), ids.map((id) => parseInt(id)))
  }

  @Delete()
  async deleteWarehouse(@Body() deleteData: {productId: string}): Promise<Prisma.BatchPayload> {
    const {productId} = deleteData;
    return this.warehouseService.deleteStocks(parseInt(productId))
  }
}
