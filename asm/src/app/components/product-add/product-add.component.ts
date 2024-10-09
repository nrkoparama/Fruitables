import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productForm!: FormGroup;
  product!: Product;
  categories!: Category[];
  selectedFile!: File;

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.product = new Product();

    this.productForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      priceSale: new FormControl(null),
      urlImage: new FormControl('', Validators.required),
      description: new FormControl(null, Validators.required),
      hot: new FormControl(null, Validators.required),
      stock: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data as Category[];
    });
  }
  // Xử lý khi chọn tệp
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      // let imageData =  (document.getElementById('urlImage') as HTMLInputElement).files?.[0] || '';

      formData.append('name', this.productForm.get('name')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('priceSale', this.productForm.get('priceSale')?.value);
      formData.append('urlImage', this.selectedFile);
      formData.append(
        'description',
        this.productForm.get('description')?.value
      );
      formData.append('hot', this.productForm.get('hot')?.value);
      formData.append('stock', this.productForm.get('stock')?.value);
      formData.append('category', this.productForm.get('category')?.value);

      this.productService.save(formData).subscribe(() => {
        alert('Thêm sản phẩm thành công');
        this.router.navigate(['/admin/product-list']);
      });
    } else {
      alert('Vui lòng điền đầy đủ thông tin.');
    }
  }
}
