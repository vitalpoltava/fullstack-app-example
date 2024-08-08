import { Module } from '@nestjs/common';
import {ProductsController} from "./controllers/products.controller";
import {WarehouseController} from "./controllers/warehouse.controller";
import {ProductsService} from "./services/products.service";
import {WarehouseService} from "./services/warehouse.service";
import {PrismaService} from "./prisma.service";


@Module({
  imports: [],
  controllers: [ProductsController, WarehouseController],
  providers: [ProductsService, WarehouseService, PrismaService],
})
export class AppModule {}
