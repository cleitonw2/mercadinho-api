import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../../../../server/app";
import createConnection from "../../../../database";
import { CreateUserDto } from "../../../users/dtos/CreateUser.dto";
import { resolve } from "path";



describe("Read File Controller", () => {

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to read file .csv", async () => {
        const dueDAte = new Date("2022-07-27T18:27:56.000Z");
        const manufacturingDate = new Date("2020-07-27T18:24:56.000Z");

        const userData: CreateUserDto = {
            name: "User test",
            email: "seller@gmail.com",
            isAdmin: true,
            password: "authpass"
        }

        await request(app).post("/v1/users/")
            .send(userData);

        const user = await request(app).post("/v1/users/login")
            .send(userData);


        const filePath = resolve(__dirname,
            "../../../../../",
            "example.products.csv"
        );

        const response = await request(app).post(
            "/v1/products/file/csv")
            .set('Authorization', `Bearer ${user.body.user.token}`)
            .attach('file', filePath);

        expect(response.status).toBe(201);
    });

    it("Should not be able to sell a product, if user is not authenticated",
        async () => {

            const response = await request(app).post(
                "/v1/products/file/csv")
                .set('Authorization', `Bearer invalidToken`);

            expect(response.status).toBe(401);
        });
});