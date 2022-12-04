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
} from 'src/dto';
import { ExcerciseItemService } from './excercise-item.service';

@UseGuards(JwtGuard)
@Controller('excercise-items')
export class ExcerciseItemController {
  constructor(
    private excerciseItemService: ExcerciseItemService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  getOwnExcerciseItems(
    @GetUser('id') userId: number,
  ) {
    return this.excerciseItemService.getExcerciseItems(
      userId,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('me/latest')
  getOwnLatestExcerciseItems(
    @GetUser('id') userId: number,
  ) {
    return this.excerciseItemService.getLatestExcerciseItems(
      userId,
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('me')
  createExcerciseItem(
    @GetUser('id') userId: number,
    @Body() dto: ExcerciseItemDto,
  ) {
    return this.excerciseItemService.createExcerciseItemByUserId(
      userId,
      dto,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  updateExcerciseItemById(
    @GetUser('id') userId: number,
    @Body() updatedItem: ExcerciseItemUpdateDto,
  ) {
    return this.excerciseItemService.updateExcerciseItemById(
      userId,
      updatedItem,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteExcerciseItemById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) itemId: number,
  ) {
    return this.excerciseItemService.deleteExcerciseItemById(
      userId,
      itemId,
    );
  }
}
