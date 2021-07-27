import { MigrationInterface, QueryRunner, Table, Timestamp } from "typeorm";

export class CreateProducts1627346997858 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "product_name",
                        type: "varchar",
                    },
                    {
                        name: "bar_code",
                        type: "varchar",
                    },
                    {
                        name: "price",
                        type: "numeric",
                    },
                    {
                        name: "quantity_stock",
                        type: "numeric",
                    },
                    {
                        name: "quantity_sold",
                        type: "numeric",
                    },
                    {
                        name: "due_date",
                        type: "Timestamp",
                    },
                    {
                        name: "manufacturing_date",
                        type: "Timestamp",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products");
    }

}
