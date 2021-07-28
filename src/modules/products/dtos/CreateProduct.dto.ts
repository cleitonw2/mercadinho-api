
class CreateProductDto {
    product_name: string;
    bar_code: string;
    price: number;
    quantity_stock: number; // quantity in stock
    quantity_sold: number;
    due_date: Date;
    manufacturing_date: Date;
    description: string; //should contain the description of the product
}

export { CreateProductDto };