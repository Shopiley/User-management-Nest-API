/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentEntity } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity) private departmentRepository: Repository<DepartmentEntity>
  ){}
  async create(createDepartmentDto: CreateDepartmentDto) {
    const newDepartment: DepartmentEntity = this.departmentRepository.create(createDepartmentDto)
    return await this.departmentRepository.save(newDepartment);
    //return 'This action adds a new department';
  }

  async findAll() {
    return await this.departmentRepository.find({
      relations: {
        users: true
      }
    });
    //return `This action returns all department`;
  }

  async findOne(id: number) {
    return await this.departmentRepository.findOne({
      where: {id: id},
      relations: {users: true}
    });
    //return `This action returns a #${id} department`;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return await this.departmentRepository.update(id, updateDepartmentDto);
    //return `This action updates a #${id} department`;
  }

  async remove(id: number) {
    return await this.departmentRepository.delete(id);
    //return `This action removes a #${id} department`;
  }

  async setUserById(departmentId: number, userId: number){
    try{
      return await this.departmentRepository
        .createQueryBuilder()
        .relation(DepartmentEntity, "users")
        .of(departmentId)
        .add(userId)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem setting user for department: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async unsetUserById(departmentId: number) {
    try {
      return await this.departmentRepository.createQueryBuilder()
        .relation(DepartmentEntity, "users")
        .of(departmentId)
        .remove(departmentId)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem unsetting user for department: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  } 
}
