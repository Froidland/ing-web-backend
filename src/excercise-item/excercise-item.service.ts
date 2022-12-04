import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ExcerciseItemDto,
  ExcerciseItemUpdateDto,
} from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExcerciseItemService {
  constructor(private prisma: PrismaService) {}

  getExcerciseItems(userId: number) {
    return this.prisma.excerciseItem.findMany({
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

    return this.prisma.excerciseItem.findMany({
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
    excerciseItem: ExcerciseItemDto,
  ) {
    return this.prisma.excerciseItem.create({
      data: {
        userId,
        name: excerciseItem.name,
        calorieCount: excerciseItem.calorieCount,
        dateOfExcercise:
          excerciseItem.dateOfExcercise,
      },
    });
  }

  async updateExcerciseItemById(
    userId: number,
    updatedItem: ExcerciseItemUpdateDto,
  ) {
    const item =
      await this.prisma.excerciseItem.findUnique({
        where: {
          id: updatedItem.id,
        },
      });

    if (!item) {
      throw new NotFoundException(
        `The item you are trying to update does not exist.`,
      );
    }

    if (item?.userId !== userId) {
      throw new ForbiddenException(
        'The item you are trying to update does not belong to you.',
      );
    }

    return this.prisma.excerciseItem.update({
      where: {
        id: item.id,
      },
      data: updatedItem,
    });
  }

  async deleteExcerciseItemById(
    userId: number,
    itemId: number,
  ) {
    const item =
      await this.prisma.excerciseItem.findUnique({
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
