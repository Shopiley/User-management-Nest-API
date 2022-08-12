/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>
  ){}
  async create(createRoleDto: CreateRoleDto) {
    const newRole: RoleEntity = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(newRole);
    //return 'This action adds a new role';
  }

  async findAll() {
    return await this.roleRepository.find({
      relations: {
        users: true
      }
    });
    //return `This action returns all role`;
  }

  async findOne(id: number) {
    return await this.roleRepository.findOne({
      where:{id:id},
      relations: {users: true}
    });
    //return `This action returns a #${id} role`;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return await this.roleRepository.update(id, updateRoleDto);
    //return `This action updates a #${id} role`;
  }

  async remove(id: number) {
    return await this.roleRepository.delete(id);
    //return `This action removes a #${id} role`;
  }

  async setUserById(roleId: number, userId: number){
    try{
      return await this.roleRepository
        .createQueryBuilder()
        .relation(RoleEntity, "users")
        .of(roleId)
        .set(userId)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem setting user for role: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async unsetUserById(roleId: number) {
    try {
      return await this.roleRepository.createQueryBuilder()
        .relation(RoleEntity, "users")
        .of(roleId)
        .set(null)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem unsetting user for role: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  } 
}
