import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FoodItemDto } from 'src/dto';
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

  // Get items from the last 24 hours.
  getLatestExcerciseItems(userId: number) {
    const date = new Date(
      Date.now() - 60 * 60 * 24 * 1000,
    ); // A day ago.

    return this.prisma.foodItem.findMany({
      where: {
        userId,
        createdAt: {
          gte: date,
        },
      },
    });
  }

  createExcerciseItemByUserId(
    userId: number,
    foodItem: FoodItemDto,
  ) {
    return this.prisma.foodItem.create({
      data: {
        userId,
        name: foodItem.name,
        calorieCount: foodItem.calorieCount,
        dateOfConsumption:
          foodItem.dateOfConsumption,
      },
    });
  }

  async deleteExcerciseItemById(
    userId: number,
    itemId: number,
  ) {
    const item =
      await this.prisma.foodItem.findUnique({
        where: {
          id: itemId,
        },
      });

    if (!item) {
      throw new NotFoundException(
        `Item with id ${itemId} not found.`,
      );
    }

    if (item?.userId !== userId) {
      throw new ForbiddenException(
        'The item you are trying to delete does not belong to you.',
      );
    }

    return this.prisma.excerciseItem.delete({
      where: {
        id: itemId,
      },
    });
  }
}
