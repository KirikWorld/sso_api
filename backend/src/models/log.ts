import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Log extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: number;

    @Column({ length: 60 })
    title: string;

    @Column({ length: 500 })
    description: string;
}

export interface LogInterface {
    id: number;
    code: number;
    title: string;
    description: string;
}
