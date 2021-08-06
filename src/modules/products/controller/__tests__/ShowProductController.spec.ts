import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../../../../server/app";
import createConnection from "../../../../database";
import { CreateUserDto } from "../../../users/dtos/CreateUser.dto";
import { v4 as uuid } from "uuid";
import { type } from "os";



describe("Show Product Controller", () => {

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to show a product by id", async () => {
        const dueDAte = new Date("2022-07-27T18:27:56.000Z");
        const manufacturingDate = new Date("2020-07-27T18:24:56.000Z");

        const userData: CreateUserDto = {
            name: "User test",
            email: "t@gmail.com",
            isAdmin: true,
            password: "authpass"
        }

        await request(app).post("/v1/users/")
            .send(userData);

        const user = await request(app).post("/v1/users/login")
            .send(userData);

        const product = await request(app).post("/v1/products/")
            .send({
                product_name: "Product",
                bar_code: "122007657839",
                price: 10,
                quantity_stock: 40,
                quantity_sold: 0,
                due_date: dueDAte,
                manufacturing_date: manufacturingDate,
                description: "Product test"
            })
            .set('Authorization', `Bearer ${user.body.user.token}`);

        const response = await request(app).get(
            "/v1/products/" +
            product.body.id)
            .set('Authorization', `Bearer ${user.body.user.token}`);

        expect(response.status).toBe(200);
        expect(response.body.product_name).toBe("Product");
    });

    it("Should not be able to show a product, if user is not authenticated",
        async () => {

            const product_id = uuid();
            const response = await request(app).get("/v1/products/" + product_id)
                .set('Authorization', `Bearer invalidToken`);

            expect(response.status).toBe(401);
        });
});