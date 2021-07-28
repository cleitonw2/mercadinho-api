import { getCustomRepository } from "typeorm";
import { Product } from "../entities/Product";
import { ProductsRepositories } from "../repositories/ProductsRepositories";


class ShowProcutsService {
    constructor(
        private productsRepositories =
            getCustomRepository(ProductsRepositories)
    ) { }

    async execute(): Promise<Product[]> {

        return await this.productsRepositories.find();
    }
}

export { ShowProcutsService };