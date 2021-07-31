import { getCustomRepository } from "typeorm";
import { CreateProductDto } from "../dtos/CreateProduct.dto";
import { ProductsRepositories } from "../repositories/ProductsRepositories";


class UpdateProductService {
    constructor(
        private productsRepositories =
            getCustomRepository(ProductsRepositories)
    ) { }

    async execute(
        id: string,
        productData: CreateProductDto
    ): Promise<void> {

        await this.productsRepositories.update(
            id,
            productData
        );
    }
}

export { UpdateProductService };