import { getCustomRepository } from "typeorm";
import { AppError } from "../../../middlewares/error/AppError";
import { ProductsRepositories } from "../repositories/ProductsRepositories";

class DeleteProductService {

    constructor(
        private productsRepositories =
            getCustomRepository(ProductsRepositories)
    ) { }

    async execute(id: string): Promise<void> {

        const productExists = await this.productsRepositories
            .findOne(id);

        if(!productExists) throw new AppError("product not found!", 404);

        await this.productsRepositories.delete(id);
    }
}

export { DeleteProductService };