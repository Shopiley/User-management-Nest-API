/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EducationEntity } from 'src/education/entities/education.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(EducationEntity)
    private educationRepository: Repository<EducationEntity>
  ) {}
  
  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    if (createUserDto.education){
      const newEducation = this.educationRepository.create(createUserDto.education);
      const education: EducationEntity = await this.educationRepository.save(newEducation);
      newUser.education = education;
    }
    return this.userRepository.save(newUser);
    //return 'This action adds a new user and education';
  }

  async findAll() {
    return await this.userRepository.find({
      relations: {
          education: true,
          department: true,
          roles: true,
      }
  })
    //return `This action returns all user`;
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where:{id:id},
      relations: {
        education: true,
        department: true,
        roles: true,
    }
    })
    //return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
    //return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
    //return `This action removes a #${id} user`;
  }

  //Working on relationships
  async setRoleById(userId: number, roleId: number){
    try{
      return await this.userRepository
        .createQueryBuilder()
        .relation(UserEntity, "roles")
        .of(userId)
        .add(roleId)
    } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a problem setting role for user: ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
  }
}

  async unsetRoleById(userId: number, roleId: number){
    try{
      return await this.userRepository
        .createQueryBuilder()
        .relation(UserEntity, "roles")
        .of(userId)
        .remove(roleId)
    } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a problem unsetting role for user: ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
  }
  }

  async setDepartmentById(userId: number, departmentId: number){
    try{
      return await this.userRepository
        .createQueryBuilder()
        .relation(UserEntity, "department")
        .of(userId)
        .set(departmentId)
    } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a problem setting department for users: ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
  }
}

  async unsetDepartmentById(userId: number){
  try{
    return await this.userRepository
      .createQueryBuilder()
      .relation(UserEntity, "department")
      .of(userId)
      .set(null)
  } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem unsetting department for users: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }
  }

  async setEducationById(userId: number, educationId: number){
    try{
      return await this.userRepository
        .createQueryBuilder()
        .relation(UserEntity, "education")
        .of(userId)
        .set(educationId)
    } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a problem setting education for users: ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
  }
}

  async unsetEducationById(userId: number){
    try{
      return await this.userRepository
        .createQueryBuilder()
        .relation(UserEntity, "education")
        .of(userId)
        .set(null)
    } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a problem unsetting education for users: ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
    }
}