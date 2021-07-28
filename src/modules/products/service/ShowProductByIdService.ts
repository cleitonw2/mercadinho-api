import { getCustomRepository } from "typeorm";
import { AppError } from "../../../middlewares/error/AppError";
import { Product } from "../entities/Product";
import { ProductsRepositories } from "../repositories/ProductsRepositories";


class ShowProductByIdService {
    constructor(
        private productsRepositories =
            getCustomRepository(ProductsRepositories)
    ) { }

    async execute(id: string): Promise<Product> {

        const product = await this.productsRepositories.findOne(id);

        if (!product) {
            throw new AppError("Product not found!", 404);
        }

        return product;
    }
}

export { ShowProductByIdService };