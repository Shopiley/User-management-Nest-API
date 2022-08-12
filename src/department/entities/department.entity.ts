/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('department')
export class DepartmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    department: string;

    @OneToMany(()=> UserEntity, (user)=> user.department)
    users: UserEntity[]
}
