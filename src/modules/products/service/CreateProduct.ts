import { CreateProductDto } from "../dtos/CreateProduct.dto";


class CreateProduct {
    async execute(
        createProductDto: CreateProductDto
    ): Promise<void> { }
}

export { CreateProduct };