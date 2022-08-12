/* eslint-disable prettier/prettier */
  import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { EducationEntity } from 'src/education/entities/education.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, EducationEntity])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
