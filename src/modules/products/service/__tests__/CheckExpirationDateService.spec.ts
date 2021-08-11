import { getConnection } from "typeorm";
import createConnection from "../../../../database";
import { AppError } from "../../../../middlewares/error/AppError";
import { CreateProductDto } from "../../dtos/CreateProduct.dto";
import { Product } from "../../entities/Product";
import { CheckExpirationDateService } from "../CheckExpirationDateService";
import { CreateProductService } from "../CreateProductService";


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

    it("Should be able to check product expiration date", async () => {
        const dueDate = new Date("2020-07-27T18:27:56.000Z");
        const manufacturingDate = new Date("2020-07-27T18:24:56.000Z");

        const productExpired: CreateProductDto = {
            product_name: "Coca-Cola",
            bar_code: "1234598202",
            price: 10,
            quantity_stock: 40,
            quantity_sold: 0,
            due_date: dueDate,
            manufacturing_date: manufacturingDate,
            description: "Coca-Cola 2l"
        }

        const product = await new CreateProductService().execute(productExpired);

        const checkExpirationDate = new CheckExpirationDateService();

        expect(await checkExpirationDate.execute()).toEqual([{...product}]);
    });
});