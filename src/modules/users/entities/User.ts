import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";
import {
    Exclude
} from "class-transformer";
import {
    IsBoolean,
    IsEmail,
    IsNotEmpty
} from "class-validator";
import { v4 as uuid } from "uuid";


@Entity("users")
class User {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsBoolean()
    isAdmin: boolean;

    @Column()
    @Exclude()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { User };