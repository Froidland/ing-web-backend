import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class FoodItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  calorieCount: number;

  @IsNotEmpty()
  @IsDate()
  dateOfConsumption: Date;
}
