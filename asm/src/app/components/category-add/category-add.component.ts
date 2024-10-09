import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  categoryForm: FormGroup;
  category: Category;

  constructor(private categoryService: CategoryService, private router: Router) {
    this.category = new Category;
    this.categoryForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  ngOnInit() {
  }

  onSubmit(){
    if(this.categoryForm.invalid){
      alert('Vui lòng nhập thông tin hợp lệ');
    } else {
      alert("Thêm danh mục thành công")
      this.categoryService.save(this.category).subscribe(()=>{
        this.router.navigate(['admin/category-list'])
      })
    }
  }

}

