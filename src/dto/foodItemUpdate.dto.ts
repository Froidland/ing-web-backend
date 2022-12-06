import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class FoodItemUpdateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  calorieCount: number;
}
