/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CreateEducationDto {
  readonly id?: number;
  
  @IsNotEmpty()
  readonly school: string;

  @IsNotEmpty()
  readonly grade: string;
}
