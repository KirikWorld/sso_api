import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    BaseEntity,
} from "typeorm";
import { User } from "./user";

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 60, unique: true })
    title: string;

    @Column({ length: 500 })
    description: string;

    @ManyToMany(() => User, (user) => user.role, {
        nullable: true,
        onDelete: "SET NULL",
    })
    user: User[];
}

export interface RoleInterface {
    id: number;
    title: string;
    description: string;
    user: any;
}
