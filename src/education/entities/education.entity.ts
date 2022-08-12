/* eslint-disable prettier/prettier */
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('education')
export class EducationEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    school: string;

    @Column()
    grade: string;

    @OneToOne(()=> UserEntity, user => user.education, {onDelete: 'CASCADE', cascade: true})
    user: UserEntity;
}
