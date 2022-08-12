import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationDto } from './create-education.dto';

export class UpdateEducationDto extends PartialType(CreateEducationDto) {
  readonly id: number;
  readonly school: string;
  readonly grade: string;
}
