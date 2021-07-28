import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entities/Product";

@EntityRepository(Product)
class ProductsRepositories extends Repository<Product> {
    async exists(bar_code: string) {

        const product = await this.findOne({ bar_code });

        return !!product; //return boolean
    }
}

export { ProductsRepositories };