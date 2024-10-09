import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products!: Product[];
  limitProducts!: Product[];
  hotProducts!: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.productService.getAll().subscribe((data) => {
      this.products = data as Product[];

      this.limitProducts = this.limitPros(this.products);
      this.hotProducts = this.hotPros(this.products);
    });
  }

  limitPros(arr: Product[]) {
    var pros = arr.slice(0, 8);
    // .sort((a:Product, b:Product) => a.price - b.price)
    return pros;
  }

  hotPros(arr: Product[]): Product[] {
    var pros = arr.filter((e) => e.hot === 1);
    return pros;
  }
}
