import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
})
export class CategoryEditComponent implements OnInit {
  categoryForm: FormGroup;
  category!: Category;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];

    this.categoryForm = new FormGroup({
      _id: new FormControl(null),
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() {
    if (this.id) {
      this.categoryService.get(this.id).subscribe((data) => {
        this.category = data as Category;
      });
    }
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      alert('Vui lòng nhập thông tin hợp lệ');
    } else {
      alert('Sửa thông tin thành công');
      this.categoryService.update(this.id, this.category).subscribe(() => {
        this.router.navigate(['/admin/category-list']);
      });
    }
  }
}

