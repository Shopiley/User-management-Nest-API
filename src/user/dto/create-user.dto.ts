/* eslint-disable prettier/prettier */
import { CreateEducationDto } from "src/education/dto/create-education.dto";

export class CreateUserDto {
    readonly id?: number;
    readonly firstname: string;
    readonly middlename?: string;
    readonly lastname: string; 
    // readonly dateOfBirth: Date;
    readonly nationality: string;
    readonly address: string;
    readonly education?: CreateEducationDto;
    readonly departmentId?: number;
    // readonly roleId?: number;
    readonly isActive?: boolean;
}
