import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class ClientServer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 60 })
    title: string;

    @Column({ length: 500 })
    description: string;

    @Column({ length: 500 })
    url: string;
}

export interface ClientServerInterface {
    id: number;
    title: string;
    description: string;
    url: string
}
