import { Router, Request, Response } from "express";
import { ensureAdmin } from "../../middlewares/auth/ensureAdmin";

const productRouter = Router();

interface ProductDto {
    id?: string;
    name: string;
    description: string;
    bar_code: string;
    price: number;
}

let products: ProductDto[] = [];

productRouter.get("/", (req: Request, res: Response) => {
    return res.json(products)
});

productRouter.get("/:id", (req: Request, res: Response) => {
    const { id } = req.params;

    const product = products.find(product => product.id === id);
    if (!product) {
        return res.status(404).send();
    }
    return res.json(product)
});

productRouter.post("/", ensureAdmin, (req: Request, res: Response) => {
    const productDto: ProductDto = req.body;
    console.log(req)
    const product = products.some(p => p.id === productDto.id);

    if (product) {
        return res.status(401).send();
    }

    products.push(productDto);

    return res.json(productDto);
});

productRouter.put("/:id", (req: Request, res: Response) => {
    const productDto: ProductDto = req.body;
    const { id } = req.params;

    products = products.filter(p => p.id != id);

    productDto.id = id;

    products.push(productDto);

    return res.json();

});

productRouter.delete("/:id", (req: Request, res: Response) => {
    const { id } = req.params;

    products = products.filter(p => p.id != id);

    return res.json();

});

export { productRouter };
