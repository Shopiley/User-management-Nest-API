/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { EducationEntity } from './entities/education.entity';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(EducationEntity)
    private educationRepository: Repository<EducationEntity>,
  ) {}
  create(createEducationDto: CreateEducationDto) {
    const newEducation: EducationEntity = this.educationRepository.create(createEducationDto);
    return this.educationRepository.save(newEducation);
    //return 'This action adds a new education';
  }

  async findAll() {
    return await this.educationRepository.find();
    //return `This action returns all education`;
  }

  // getAllAddressesWithUsers() {
  //   return this.addressRepository.find({ relations: ['user'] });
  // }

  async findOne(id: number) {
    return await this.educationRepository.findOne({where:{id:id}});
    //return `This action returns a #${id} education`;
  }

  async update(id: number, updateEducationDto: UpdateEducationDto) {
    return await this.educationRepository.update(id, updateEducationDto);
    //return `This action updates a #${id} education`;
  }

  async remove(id: number) {
    return await this.educationRepository.delete(id);
    //return `This action removes a #${id} education`;
  }
}
