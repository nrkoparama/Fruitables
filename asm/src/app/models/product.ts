export class Product {
  _id!: string;
  name!: string
  price!: string
  priceSale!: string
  urlImage!: File | string
  description!: string
  hot!: number
  stock!: number
  category!:{
    categoryId: string
    categoryName: string
  };
}
