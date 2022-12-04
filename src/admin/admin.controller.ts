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
  ExcerciseItemDto,
  ExcerciseItemUpdateDto,
  FoodItemDto,
  FoodItemUpdateDto,
} from 'src/dto';
import { ExcerciseItemService } from 'src/excercise-item/excercise-item.service';
import { FoodItemService } from 'src/food-item/food-item.service';
import { AdminService } from './admin.service';

//TODO: Implement a Guard for the admin role | https://docs.nestjs.com/guards
@UseGuards(JwtGuard)
@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private foodItemsService: FoodItemService,
    private excerciseItemService: ExcerciseItemService,
  ) {}

  //! Users: Excercise items.
  @HttpCode(HttpStatus.OK)
  @Get('users/:id/excercise-items')
  getExcerciseItemsByUserId(
    @GetUser('roleId') roleId: number,
    @Param('id', ParseIntPipe) userId: number,
  ) {
    this.adminService.isAdministratorCheck(
      roleId,
    );

    return this.excerciseItemService.getExcerciseItemsByUserId(
      userId,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('users/:id/food-items/latest')
  getLatestExcerciseItemsByUserId(
    @GetUser('roleId') roleId: number,
    @Param('id', ParseIntPipe) userId: number,
  ) {
    this.adminService.isAdministratorCheck(
      roleId,
    );

    return this.excerciseItemService.getLatestExcerciseItemsByUserId(
      userId,
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('users/:id')
  createExcerciseItemByUserId(
    @Param('id') userId: number,
    @GetUser('roleId') roleId: number,
    @Body() dto: ExcerciseItemDto,
  ) {
    this.adminService.isAdministratorCheck(
      roleId,
    );

    return this.excerciseItemService.createExcerciseItemByUserId(
      userId,
      dto,
    );
  }

  //! Users: Food items.
  @HttpCode(HttpStatus.OK)
  @Get('users/:id/food-items')
  getFoodItemsByUserId(
    @GetUser('roleId') roleId: number,
    @Param('id', ParseIntPipe) userId: number,
  ) {
    this.adminService.isAdministratorCheck(
      roleId,
    );

    return this.foodItemsService.getFoodItemsByUserId(
      userId,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('users/:id/food-items/latest')
  getLatestFoodItemsByUserId(
    @GetUser('roleId') roleId: number,
    @Param('id', ParseIntPipe) userId: number,
  ) {
    this.adminService.isAdministratorCheck(
      roleId,
    );

    return this.foodItemsService.getLatestFoodItemsByUserId(
      userId,
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('users/:id')
  createFoodItemByUserId(
    @Param('id') userId: number,
    @GetUser('roleId') roleId: number,
    @Body() dto: FoodItemDto,
  ) {
    this.adminService.isAdministratorCheck(
      roleId,
    );

    return this.foodItemsService.createFoodItemByUserId(
      userId,
      dto,
    );
  }

  //! ExcerciseItems: general.
  @HttpCode(HttpStatus.OK)
  @Patch('excercise-items/:id')
  updateExcerciseItemById(
    @GetUser('id') userId: number,
    @GetUser('roleId') roleId: number,
    @Param('id') itemId: number,
    @Body() updatedItem: ExcerciseItemUpdateDto,
  ) {
    return this.excerciseItemService.updateExcerciseItemById(
      userId,
      roleId,
      itemId,
      updatedItem,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Delete('excercise-items/:id')
  deleteExcerciseItemById(
    @GetUser('id') userId: number,
    @GetUser('roleId') roleId: number,
    @Param('id', ParseIntPipe) itemId: number,
  ) {
    return this.excerciseItemService.deleteExcerciseItemById(
      userId,
      roleId,
      itemId,
    );
  }

  //! FoodItems: general.
  @HttpCode(HttpStatus.OK)
  @Patch('food-items/:id')
  updateFoodItemById(
    @GetUser('id') userId: number,
    @GetUser('roleId') roleId: number,
    @Param('id') itemId: number,
    @Body() updatedItem: FoodItemUpdateDto,
  ) {
    return this.foodItemsService.updateFoodItemById(
      userId,
      roleId,
      itemId,
      updatedItem,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Delete('food-items/:id')
  deleteFoodItemById(
    @GetUser('id') userId: number,
    @GetUser('roleId') roleId: number,
    @Param('id', ParseIntPipe) itemId: number,
  ) {
    return this.excerciseItemService.deleteExcerciseItemById(
      userId,
      roleId,
      itemId,
    );
  }
}
