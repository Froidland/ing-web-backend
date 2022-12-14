import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ExcerciseItemUpdateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  calorieCount: number;
}
