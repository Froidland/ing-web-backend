import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FoodItemService {
  constructor(private prisma: PrismaService) {}

  getFoodItems(userId: number) {
    return this.prisma.foodItem.findMany({
      where: {
        userId,
      },
    });
  }
}
