import { Module } from '@nestjs/common';
import { ExcerciseItemController } from './excercise-item.controller';
import { ExcerciseItemService } from './excercise-item.service';

@Module({
  controllers: [ExcerciseItemController],
  providers: [ExcerciseItemService],
})
export class ExcerciseItemModule {}
