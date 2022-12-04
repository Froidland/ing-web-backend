import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  FoodItemDto,
  FoodItemUpdateDto,
} from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FoodItemService {
  constructor(private prisma: PrismaService) {}

  getFoodItemsByUserId(userId: number) {
    return this.prisma.foodItem.findMany({
      where: {
        userId,
      },
    });
  }

  // Get items from the last 24 hours.
  getLatestFoodItemsByUserId(userId: number) {
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

  createFoodItemByUserId(
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

  async updateFoodItemById(
    userId: number,
    roleId: number,
    itemId: number,
    updatedItem: FoodItemUpdateDto,
  ) {
    const item =
      await this.prisma.foodItem.findUnique({
        where: {
          id: itemId,
        },
      });

    if (!item) {
      throw new NotFoundException(
        `The item you are trying to update does not exist.`,
      );
    }

    if (roleId !== 2) {
      if (item?.userId !== userId) {
        throw new ForbiddenException(
          'The item you are trying to update does not belong to you.',
        );
      }
    }

    return this.prisma.foodItem.update({
      where: {
        id: itemId,
      },
      data: updatedItem,
    });
  }

  async deleteFoodItemById(
    userId: number,
    roleId: number,
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

    if (roleId !== 2) {
      if (item?.userId !== userId) {
        throw new ForbiddenException(
          'The item you are trying to delete does not belong to you.',
        );
      }
    }

    return this.prisma.foodItem.delete({
      where: {
        id: itemId,
      },
    });
  }
}
