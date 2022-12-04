import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ExcerciseItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  calorieCount: number;

  @IsNotEmpty()
  @IsDate()
  dateOfExcercise: Date;
}
