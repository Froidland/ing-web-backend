import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import {
  FoodItemDto,
  FoodItemUpdateDto,
} from 'src/dto';
import { FoodItemService } from './food-item.service';

@UseGuards(JwtGuard)
@Controller('food-items')
export class FoodItemController {
  constructor(
    private foodItemService: FoodItemService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  getOwnFoodItems(@GetUser('id') userId: number) {
    return this.foodItemService.getFoodItemsByUserId(
      userId,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('me/latest')
  getOwnLatestExcerciseItems(
    @GetUser('id') userId: number,
  ) {
    return this.foodItemService.getLatestFoodItemsByUserId(
      userId,
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('me')
  createExcerciseItem(
    @GetUser('id') userId: number,
    @Body() dto: FoodItemDto,
  ) {
    return this.foodItemService.createFoodItemByUserId(
      userId,
      dto,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  updateExcerciseItemById(
    @GetUser('id') userId: number,
    @GetUser('roleId') roleId: number,
    @Param('id') itemId: number,
    @Body() updatedItem: FoodItemUpdateDto,
  ) {
    return this.foodItemService.updateFoodItemById(
      userId,
      roleId,
      itemId,
      updatedItem,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteExcerciseItemById(
    @GetUser('id') userId: number,
    @GetUser('roleId') roleId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.foodItemService.deleteFoodItemById(
      userId,
      roleId,
      id,
    );
  }
}
