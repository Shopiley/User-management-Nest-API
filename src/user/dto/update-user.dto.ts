/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
// import { CreateEducationDto } from 'src/education/dto/create-education.dto';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    // readonly id: number;
    // readonly firstname: string;
    // readonly middlename?: string;
    // readonly lastname: string;
    // readonly nationality: string;
    // readonly address: string;
    // readonly education: CreateEducationDto;
    // readonly departmentId: number;
    // readonly roleId: number;
    // readonly isActive?: boolean;
}
