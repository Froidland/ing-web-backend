import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as _ from 'lodash';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getUserInfoById(userId: number) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          foodItems: {
            where: {
              userId,
            },
          },
          excerciseItems: {
            where: {
              userId,
            },
          },
        },
      });

    return _.omit(user, 'hash');
  }
}
