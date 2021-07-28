import { getConnection } from "typeorm";
import createConnection from "../../../database";
import { AppError } from "../../../middlewares/error/AppError";
import { CreateProductDto } from "../dtos/CreateProduct.dto";
import { CreateProductService } from "./CreateProductService";


describe("Create Product", () => {

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new product", async () => {
        const dueDAte = new Date("2021-07-27T18:27:56.000Z");
        const manufacturingDate = new Date("2020-07-27T18:24:56.000Z");

        const productData: CreateProductDto = {
            product_name: "Coca-Cola",
            bar_code: "123459498202",
            price: 10,
            quantity_stock: 40,
            quantity_sold: 0,
            due_date: dueDAte,
            manufacturing_date: manufacturingDate,
            description: "Coca-Cola 2l"
        }

        const product = await new CreateProductService()
            .execute(productData);

        expect(product).toHaveProperty("id");
        expect(product.product_name).toBe("Coca-Cola");
    });

    it("Should not be able to create a product with exists barcode", async () => {
        const dueDAte = new Date("2021-07-27T18:27:56.000Z");
        const manufacturingDate = new Date("2020-07-27T18:24:56.000Z");

        const productData: CreateProductDto = {
            product_name: "Coca-Cola",
            bar_code: "1238357298398202",
            price: 10,
            quantity_stock: 40,
            quantity_sold: 0,
            due_date: dueDAte,
            manufacturing_date: manufacturingDate,
            description: "Coca-Cola 2l"
        }

        const productService = new CreateProductService()

        await productService.execute(productData);

        await expect(productService.execute(productData)).rejects.toEqual(
            new AppError("Product already exists!")
        );
    });
});