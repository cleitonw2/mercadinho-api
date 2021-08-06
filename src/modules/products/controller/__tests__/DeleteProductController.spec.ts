import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../../../../server/app";
import createConnection from "../../../../database";
import { CreateUserDto } from "../../../users/dtos/CreateUser.dto";



describe("Delete Product Controller", () => {

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to delete a product", async () => {
        const dueDAte = new Date("2022-07-27T18:27:56.000Z");
        const manufacturingDate = new Date("2020-07-27T18:24:56.000Z");

        const userData: CreateUserDto = {
            name: "User test",
            email: "exemple@gmail.com",
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
                bar_code: "12239",
                price: 10,
                quantity_stock: 40,
                quantity_sold: 0,
                due_date: dueDAte,
                manufacturing_date: manufacturingDate,
                description: "Product test"
            })
            .set('Authorization', `Bearer ${user.body.user.token}`);

        const response = await request(app).delete("/v1/products/" + product.body.id)
            .set('Authorization', `Bearer ${user.body.user.token}`);

        expect(response.status).toBe(202);
    });

    it("Should not be able to delete a product, if user is not administrator",
        async () => {

            const dueDAte = new Date("2022-07-27T18:27:56.000Z");
            const manufacturingDate = new Date("2020-07-27T18:24:56.000Z");

            const userData: CreateUserDto = {
                name: "User",
                email: "exrequest@gmail.com",
                isAdmin: false,
                password: "authpass"
            }

            await request(app).post("/v1/users/")
                .send(userData);

            const user = await request(app).post("/v1/users/login")
                .send(userData);

            const product = await request(app).post("/v1/products/")
                .send({
                    product_name: "Coca-Cola",
                    bar_code: "122339",
                    price: 10,
                    quantity_stock: 40,
                    quantity_sold: 0,
                    due_date: dueDAte,
                    manufacturing_date: manufacturingDate,
                    description: "Coca-Cola 2l"
                })
                .set('Authorization', `Bearer ${user.body.user.token}`);

            const response = await request(app).delete("/v1/products/" + product.body.id)
                .set('Authorization', `Bearer ${user.body.user.token}`);

            expect(response.status).toBe(401);
            expect(response.body).toBe("Unauthorized!");
        });
});