import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  products!: Product[];
  product!: Product;
  id!: string;
  hotProducts!:Product[];
  relatedProducts!: Product[];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.productService.get(this.id).subscribe((data) => {
      this.product = data as Product;
    });

    this.getAll();
  }

  getAll() {
    this.productService.getAll().subscribe((data) => {
      this.products = data as Product[];

      this.hotProducts = this.hotPros(this.products);
      this.relatedProducts = this.relatedPros(this.products, this.product);

    });
  }

  hotPros(arr: Product[]): Product[] {
    var pros = arr.filter((e) => e.hot === 1).slice(0,6);
    return pros;
  }

  relatedPros(arr: Product[], item: Product) {
    var prosCate = arr
      .filter((cate) => cate.category.categoryId === item.category.categoryId)
      .splice(0, 10);
    return prosCate;
  }
}
