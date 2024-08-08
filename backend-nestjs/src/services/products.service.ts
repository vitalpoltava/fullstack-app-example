import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma.service';
import {Product} from "@prisma/client";

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async getProducts(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      include: {
        stock: {
          select: {
            house: {
              select: {
                city: true
              }
            }
          }
        }
      }
    });
  }

  async postProduct(product: Omit<Product, "id">): Promise<Product> {
    return this.prismaService.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
      }
    })
  }

  async putProduct(product: Product): Promise<Product> {
    return this.prismaService.product.update({
      where: {
        id: product.id,
      },
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
      }
    })
  }

  async deleteProduct(productId: number): Promise<void> {
    await this.prismaService.product.delete({
      where: {
        id: productId,
      },
    })
  }
}
