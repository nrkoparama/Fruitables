import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories!: Category[];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    return this.categoryService.getAll().subscribe((data) => {
      this.categories = data as Category[];
    });
  }

  refreshPage() {
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data as Category[];
    });
  }

  onDelete(id: string) {
    var confirmText = ' Bạn có chắc xóa danh mục này không';
    if (confirm(confirmText)) {
      alert('Xóa danh mục thành công');

      this.categoryService.delete(id).subscribe(() => {
        // reload lại trang sau khi sửa data thay vì dùng ngOnInit reload lại hết
        this.refreshPage();
      });
    } else {
      alert('Xóa thất bại');
    }
  }
}


