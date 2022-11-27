import { Injectable } from '@nestjs/common';
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
}
