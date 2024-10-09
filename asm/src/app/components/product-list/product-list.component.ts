import { CategoryService } from 'src/app/services/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  categories!: Category[];
  paginatedProducts!: Product[];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    return this.productService.getAll().subscribe((data) => {
      this.products = data as Product[];

      // Tính tổng số trang
      this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);

      // Gọi hàm load dữ liệu cho trang đầu tiên
      this.loadPage(this.currentPage);

      // this.categoryService.getAll().subscribe((dataCate) => {
      //   this.categories = dataCate as Category[];
      // });
    });
  }

  // Hàm phân trang
  loadPage(page: number): void {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = page * this.itemsPerPage;

    // Lấy dữ liệu cho trang hiện tại
    this.paginatedProducts = this.products.slice(startIndex, endIndex);

    // Cập nhật lại trang hiện tại
    this.currentPage = page;
  }

  // Hàm xử lý khi chuyển trang (có thể dùng với pagination controls)
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadPage(page);
    }
  }

  // searchByCate(cate: string) {
  //   if (cate == null || cate == '') {
  //   } else {
  //     this.productService.get;
  //   }
  // }

  refreshPage() {
    this.productService.getAll().subscribe((data) => {
      this.products = data as Product[];
      console.log(this.products);
    });
  }

  onDelete(id: string) {
    this.productService.delete(id).subscribe(() => {
      alert('Xóa sản phẩm thành công');
      this.refreshPage();
    });
  }
}
