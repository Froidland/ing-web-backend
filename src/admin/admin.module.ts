import { Module } from '@nestjs/common';
import { ExcerciseItemService } from 'src/excercise-item/excercise-item.service';
import { FoodItemService } from 'src/food-item/food-item.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [
    AdminService,
    FoodItemService,
    ExcerciseItemService,
  ],
})
export class AdminModule {}
