/* eslint-disable prettier/prettier */
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('role')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string;

    @Column({default:true})
    isActive?: boolean;

    @ManyToMany(()=> UserEntity, (user)=>user.roles)
    users: UserEntity[]
}
