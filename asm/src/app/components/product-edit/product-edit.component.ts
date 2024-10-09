import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  productForm!: FormGroup;
  categories!: Category[];
  product!: Product;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.id = this.route.snapshot.params['id'];

    this.productForm = new FormGroup({
      _id: new FormControl(null),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
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
    if(this.id){
      this.productService.get(this.id).subscribe((data)=>{
        this.product = data as Product;
      });

    this.categoryService.getAll().subscribe((data)=>{
      this.categories = data as Category[];
    })
    }
  }

  onSubmit(){
    if(this.productForm.invalid){
      alert("Vui lòng nhập thông tin hợp lệ");
    } else {
      this.productService.update(this.id, this.product).subscribe(()=>{
        console.log(this.product);

        alert("Sửa thông tin thành công");
        this.router.navigate(['/admin/product-list']);
      })
    }
  }

}
