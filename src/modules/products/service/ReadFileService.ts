import { Readable } from "stream";
import readLine from "readline";
import { getCustomRepository } from "typeorm";
import { ProductsRepositories } from "../repositories/ProductsRepositories";
import { CreateProductDto } from "../dtos/CreateProduct.dto";


class ReadFileService {
    constructor(
        private productsRepositories =
            getCustomRepository(ProductsRepositories)
    ) { }

    async execute(
        file: Express.Multer.File
    ): Promise<void> {

        const { buffer } = file;

        const readableFile = new Readable();
        readableFile.push(buffer);
        readableFile.push(null);

        const productsLine = readLine.createInterface({
            input: readableFile
        });

        const [
            lineZero,
            lineOne,
            lineTwo,
            lineThree,
            lineFour,
            lineFive,
            lineSix,
            lineSeven
        ] = [0, 1, 2, 3, 4, 5, 6, 7];

        for await (let line of productsLine) {
            const productLineSplit = line.split(",");

            const productExists = await this.productsRepositories
                .exists(productLineSplit[lineOne]);

            const createdProduct: CreateProductDto = {
                product_name: productLineSplit[lineZero],
                bar_code: productLineSplit[lineOne],
                price: Number(productLineSplit[lineTwo]),
                quantity_stock: Number(productLineSplit[lineThree]),
                quantity_sold: Number(productLineSplit[lineFour]),
                due_date: new Date(productLineSplit[lineFive]),
                manufacturing_date: new Date(productLineSplit[lineSix]),
                description: productLineSplit[lineSeven]
            }

            if (!productExists) {

                const product = this.productsRepositories
                    .create(createdProduct);

                await this.productsRepositories.save(product);
            } else {

                await this.productsRepositories.update(
                    { bar_code: createdProduct.bar_code },
                    createdProduct
                );
            }
        }
    }
}

export { ReadFileService };