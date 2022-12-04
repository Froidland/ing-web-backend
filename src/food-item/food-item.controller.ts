import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { FoodItemDto } from 'src/dto';
import { FoodItemService } from './food-item.service';

@UseGuards(JwtGuard)
@Controller('food-items')
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

  @Get('me/latest')
  getOwnLatestExcerciseItems(
    @GetUser('id') userId: number,
  ) {
    return this.foodItemService.getLatestExcerciseItems(
      userId,
    );
  }

  @Post('me')
  createExcerciseItem(
    @GetUser('id') userId: number,
    @Body() dto: FoodItemDto,
  ) {
    return this.foodItemService.createExcerciseItemByUserId(
      userId,
      dto,
    );
  }

  @Delete(':id')
  deleteExcerciseItemById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.foodItemService.deleteExcerciseItemById(
      userId,
      id,
    );
  }
}
