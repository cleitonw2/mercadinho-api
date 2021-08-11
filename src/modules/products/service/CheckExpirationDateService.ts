import { getCustomRepository } from "typeorm";
import { ProductsRepositories } from "../repositories/ProductsRepositories";
import moment from "moment";
import { Product } from "../entities/Product";


class CheckExpirationDateService {

    constructor(
        private productsRepositories =
            getCustomRepository(ProductsRepositories)
    ) { }

    async execute(): Promise<Product[]> {

        const productData = await this.productsRepositories.find();

        const now = moment().format();

        const futureDate = moment(now).add(10, "days");

        const products: Product[] = [];

        for await (let product of productData) {
            if (moment(product.due_date).isBefore(futureDate))
                products.push(product);
        }

        return products;
    }
}

export { CheckExpirationDateService };