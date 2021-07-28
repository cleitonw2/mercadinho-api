import {
    IsNotEmpty,
    IsNumber
} from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";
import { v4 as uuid } from "uuid";


@Entity("products")
class Product {

    @PrimaryColumn()
    id: string;

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) this.id = uuid();
    }
}

export { Product };