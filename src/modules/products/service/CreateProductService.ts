import { validate } from "class-validator";
import { getCustomRepository } from "typeorm";
import { AppError } from "../../../middlewares/error/AppError";
import { CreateProductDto } from "../dtos/CreateProduct.dto";
import { Product } from "../entities/Product";
import { ProductsRepositories } from "../repositories/ProductsRepositories";


class CreateProductService {

    constructor(
        private productsRepositories =
            getCustomRepository(ProductsRepositories)
    ) { }

    async execute(
        productData: CreateProductDto
    ): Promise<Product> {

        const productsExists = await this.productsRepositories
            .exists(productData.bar_code);

        if (productsExists) {
            throw new AppError("Product already exists!");
        }
       
        const product = this.productsRepositories.create(productData);

        const errors = await validate(product);

        const empty = 0;

        if (errors.length > empty) {
            throw new AppError(errors);
        }

        await this.productsRepositories.save(product);

        return product;
    }
}

export { CreateProductService };