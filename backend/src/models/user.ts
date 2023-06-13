import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    BaseEntity,
} from "typeorm";
import { Role } from "./role";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 37, unique: true })
    UID: string;

    @Column({ length: 60 })
    firstName: string;

    @Column({ length: 60 })
    lastName: string;

    @Column({ length: 255, unique: true })
    email: string;

    @Column({ length: 255 })
    password: string;

    @Column({ default: false })
    isActive: boolean;

    @ManyToMany(() => Role, (role) => role.user, {
        nullable: true,
        cascade: true,
        onDelete: "SET NULL",
    })
    @JoinTable()
    role: Role[];
}
