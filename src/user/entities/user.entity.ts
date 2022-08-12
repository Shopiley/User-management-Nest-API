/* eslint-disable prettier/prettier */
import { DepartmentEntity } from "src/department/entities/department.entity";
import { EducationEntity } from "src/education/entities/education.entity";
import { RoleEntity } from "src/role/entities/role.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    firstname: string;

    @Column({nullable:true})
    middlename: string;
  
    @Column()
    lastname: string;
  
    @Column()
    nationality: string;
  
    @Column()
    address: string;

    @OneToOne(()=> EducationEntity, (education)=> education.user)
    @JoinColumn()
    education: EducationEntity;

    @Column({nullable: true})
    educationId: number;

    @ManyToOne(()=> DepartmentEntity, (department)=> department.users)
    @JoinColumn()
    department: DepartmentEntity;

    @Column({nullable: true})
    departmentId: number;

    @ManyToMany(()=> RoleEntity, (role)=> role.users , {eager: true})
    @JoinTable()
    roles: RoleEntity[];

    @Column({nullable: true})
    roleId: number;

    @Column({default: true})
    isActive: boolean;


}
