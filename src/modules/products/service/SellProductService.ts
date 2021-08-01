import { getCustomRepository } from "typeorm";
import { AppError } from "../../../middlewares/error/AppError";
import { ProductsRepositories } from "../repositories/ProductsRepositories";


class SellProductService {

    constructor(
        private productsRepositories =
            getCustomRepository(ProductsRepositories)
    ) { }

    async execute(
        id: string,
        quantitySold: number
    ): Promise<void> {

        const product = await this.productsRepositories
            .findOne(id);

        if (!product) {
            throw new AppError("Product not found!", 404);
        }

        const quantity_sold = product.quantity_sold + quantitySold;
        const quantity_stock = product.quantity_stock - quantitySold;

        await this.productsRepositories.update(
            id,
            {
                quantity_sold,
                quantity_stock
            }
        );
    }
}

export { SellProductService };