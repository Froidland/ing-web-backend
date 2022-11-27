import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { FoodItemService } from './food-item.service';

@UseGuards(JwtGuard)
@Controller('food_items')
export class FoodItemController {
  constructor(
    private foodItemService: FoodItemService,
  ) {}

  @Get('me')
  getOwnFoodItems(@GetUser('id') userId: number) {
    return this.foodItemService.getFoodItems(
      userId,
    );
  }
}
