import {Module} from '@nestjs/common';
import {ProductsController} from "./controllers/products.controller";
import {WarehouseController} from "./controllers/warehouse.controller";
import {ProductsService} from "./services/products.service";
import {WarehouseService} from "./services/warehouse.service";
import {PrismaService} from "./prisma.service";
import {IntBodyPropsPipe} from "./pipes/int-body-props-pipe";


@Module({
  imports: [],
  controllers: [ProductsController, WarehouseController],
  providers: [ProductsService, WarehouseService, PrismaService, IntBodyPropsPipe],
})
export class AppModule {
}
