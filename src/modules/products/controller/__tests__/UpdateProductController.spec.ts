import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../../../../server/app";
import createConnection from "../../../../database";
import { CreateUserDto } from "../../../users/dtos/CreateUser.dto";



describe("Update Product Controller", () => {

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to update a product", async () => {
        const dueDAte = new Date("2022-07-27T18:27:56.000Z");
        const manufacturingDate = new Date("2020-07-27T18:24:56.000Z");

        const userData: CreateUserDto = {
            name: "User test",
            email: "testxemple@gmail.com",
            isAdmin: true,
            password: "authpass"
        }

        await request(app).post("/v1/users/")
            .send(userData);

        const user = await request(app).post("/v1/users/login")
            .send(userData);

        const product = await request(app).post("/v1/products/")
            .send({
                product_name: "Product test",
                bar_code: "1223957839",
                price: 10,
                quantity_stock: 40,
                quantity_sold: 0,
                due_date: dueDAte,
                manufacturing_date: manufacturingDate,
                description: "Product test"
            })
            .set('Authorization', `Bearer ${user.body.user.token}`);

        const response = await request(app).put("/v1/products/" + product.body.id)
            .send({
                product_name: "Product updated",
                bar_code: "12235748802020209039",
                price: 10,
                quantity_stock: 40,
                quantity_sold: 0,
                due_date: dueDAte,
                manufacturing_date: manufacturingDate,
                description: "Updated"
            })
            .set('Authorization', `Bearer ${user.body.user.token}`);

        expect(response.status).toBe(204);
    });

    it("Should not be able to update a product, if user is not administrator",
        async () => {

            const dueDAte = new Date("2022-07-27T18:27:56.000Z");
            const manufacturingDate = new Date("2020-07-27T18:24:56.000Z");

            const userData: CreateUserDto = {
                name: "User not admin",
                email: "notadmin@gmail.com",
                isAdmin: false,
                password: "authpass"
            }

            await request(app).post("/v1/users/")
                .send(userData);

            const user = await request(app).post("/v1/users/login")
                .send(userData);

            const product = await request(app).post("/v1/products/")
                .send({
                    product_name: "Product",
                    bar_code: "199009984747",
                    price: 10,
                    quantity_stock: 40,
                    quantity_sold: 0,
                    due_date: dueDAte,
                    manufacturing_date: manufacturingDate,
                    description: "Testing product"
                })
                .set('Authorization', `Bearer ${user.body.user.token}`);

            const response = await request(app).put("/v1/products/" + product.body.id)
                .set('Authorization', `Bearer ${user.body.user.token}`);

            expect(response.status).toBe(401);
            expect(response.body).toBe("Unauthorized!");
        });
});