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
import { ExcerciseItemDto } from 'src/dto';
import { ExcerciseItemService } from './excercise-item.service';

@UseGuards(JwtGuard)
@Controller('excercise-items')
export class ExcerciseItemController {
  constructor(
    private excerciseItemService: ExcerciseItemService,
  ) {}

  @Get('me')
  getOwnExcerciseItems(
    @GetUser('id') userId: number,
  ) {
    return this.excerciseItemService.getExcerciseItems(
      userId,
    );
  }

  @Get('me/latest')
  getOwnLatestExcerciseItems(
    @GetUser('id') userId: number,
  ) {
    return this.excerciseItemService.getLatestExcerciseItems(
      userId,
    );
  }

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

  @Delete(':id')
  deleteExcerciseItemById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.excerciseItemService.deleteExcerciseItemById(
      userId,
      id,
    );
  }
}
