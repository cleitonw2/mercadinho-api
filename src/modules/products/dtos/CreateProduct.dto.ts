
class CreateProductDto {
    product_name: string;
    bar_code: string;
    price: number;
    quantity_stock: number; // quantity in stock
    quantity_sold: number;
    description: string; //should contain the description of the product
}

export { CreateProductDto };