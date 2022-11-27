import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ExcerciseItemService } from './excercise-item.service';

@UseGuards(JwtGuard)
@Controller('excercise_items')
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
}
