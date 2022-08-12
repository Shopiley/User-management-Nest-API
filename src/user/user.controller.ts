/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  //working on relationships
  @Patch(':userId/role/:roleId')
  setRoleById(
    @Param('userId') userId: number,
    @Param ('roleId') roleId: number,
  ){
    return this.userService.setRoleById(+userId, +roleId);
  }

  @Delete(':userId/role/:roleId')
  unsetRoleById(
    @Param('userId') userId: number,
    @Param ('roleId') roleId: number,
  ){
    return this.userService.unsetRoleById(+userId, +roleId);
  }

  @Patch(':userId/department/:departmentId')
  setDepartmentById(
    @Param('userId') userId: number,
    @Param ('departmentId') departmentId: number,
  ){
    return this.userService.setDepartmentById(+userId, +departmentId);
  }

  @Delete(':userId/department')
  unsetDepartmentById(
    @Param('userId') userId: number,
  ){
    return this.userService.unsetDepartmentById(+userId);
  }

  @Patch(':userId/education/:educationId')
  setEducationById(
    @Param('userId') userId: number,
    @Param ('educationId') educationId: number,
  ){
    return this.userService.setEducationById(+userId, +educationId);
  }

  @Delete(':userId/education')
  unsetEducationById(
    @Param('userId') userId: number,
  ){
    return this.userService.unsetEducationById(+userId);
  }

}
