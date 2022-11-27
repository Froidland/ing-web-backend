import { Module } from '@nestjs/common';
import { FoodItemController } from './food-item.controller';
import { FoodItemService } from './food-item.service';

@Module({
  controllers: [FoodItemController],
  providers: [FoodItemService],
})
export class FoodItemModule {}
