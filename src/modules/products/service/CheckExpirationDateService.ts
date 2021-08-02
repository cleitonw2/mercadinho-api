import { getCustomRepository } from "typeorm";
import { ProductsRepositories } from "../repositories/ProductsRepositories";


class CheckExpirationDateService {

    constructor(
        private productsRepositories =
            getCustomRepository(ProductsRepositories)
    ) { }

    async execute(): Promise<object | undefined> {

        const products = await this.productsRepositories.find();

        const date = new Date();

        for await (let product of products) {
            if (product.due_date <= date)
                return { product, message: "expired product date!" };
        }

        return undefined;
    }
}

export { CheckExpirationDateService };