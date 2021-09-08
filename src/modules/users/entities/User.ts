import {
    Column,
    Entity,
} from "typeorm";
import {
    Exclude
} from "class-transformer";
import {
    IsBoolean,
    IsEmail,
    IsNotEmpty
} from "class-validator";
import { MainEntity } from "../../../entities/MainEntity";


@Entity("users")
class User extends MainEntity {

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
}

export { User };