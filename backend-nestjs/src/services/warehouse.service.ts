import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma.service';
import {Warehouse, Stock, Prisma} from "@prisma/client";

@Injectable()
export class WarehouseService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async getAllWarehouses(): Promise<Warehouse[]> {
    return this.prismaService.warehouse.findMany()
  }

  async postStocks(productId: number, warehouseIds: number[]): Promise<Prisma.BatchPayload> {
    const data: Stock[] = warehouseIds.map((houseId) => ({productId, houseId}))
    return this.prismaService.stock.createMany({data})
  }

  async deleteStocks(productId: number): Promise<Prisma.BatchPayload> {
    return this.prismaService.stock.deleteMany({
      where: {
        productId
      }
    })
  }
}
