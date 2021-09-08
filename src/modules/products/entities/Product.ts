import {
    IsNotEmpty,
    IsNumber
} from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    UpdateDateColumn
} from "typeorm";
import { MainEntity } from "../../../entities/MainEntity";


@Entity("products")
class Product extends MainEntity {

    @IsNotEmpty()
    @Column()
    product_name: string;

    @IsNotEmpty()
    @Column()
    bar_code: string;

    @IsNumber()
    @Column()
    price: number;

    @IsNumber()
    @Column()
    quantity_stock: number;

    @IsNumber()
    @Column()
    quantity_sold: number;

    @IsNotEmpty()
    @Column()
    due_date: Date;

    @IsNotEmpty()
    @Column()
    manufacturing_date: Date;

    @IsNotEmpty()
    @Column()
    description: string;
}

export { Product };