import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MtxDialog, MtxGridColumn } from '@ng-matero/extensions';
import { CategoriesService } from './categories.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CategoryAddEditComponent } from './category_add_edit/category_add_edit.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  categoriesForm!: FormGroup;
  list: any[] = [];
  total = 0;
  isLoading = true;
  query = {
    page: 0,
    size: 10,
  };
  columns: MtxGridColumn[] = [
    { header: 'Tên danh mục', field: 'categoryName' },
    { header: 'Hình ảnh', field: 'categoryImageUrl', type: 'image' },
    {
      header: 'Hành động',
      field: 'operation',
      minWidth: 120,
      width: '8%',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: 'Sửa',
          click: record => this.edit(record),
        },
        {
          color: 'warn',
          icon: 'delete',
          text: this.translate.stream('table_kitchen_sink.delete'),
          tooltip: 'Xóa',
          pop: true,
          popTitle: this.translate.stream('table_kitchen_sink.confirm_delete'),
          popCloseText: this.translate.stream('table_kitchen_sink.close'),
          popOkText: this.translate.stream('table_kitchen_sink.ok'),
          click: record => this.delete(record),
        },
      ],
    },
  ];
  constructor(private fb: FormBuilder, private servicecategories: CategoriesService, private toastr: ToastrService, private translate: TranslateService, public dialog: MtxDialog, private router: Router) { }
  ngOnInit(): void {
    this.categoriesForm = this.fb.group({
      name: [''],
    });
    this.getListCategories();
  }

  get params() {
    const p = Object.assign({}, this.query);
    return p;
  }
  getListCategories() {
    const params = { ... this.categoriesForm.value }
    params.page = this.query.page;
    params.size = this.query.size;
    if (!this.categoriesForm.controls['name'].value) {
      delete params.name;
    }
    this.isLoading = true;
    this.servicecategories.getListCategories(params).subscribe(res => {
      this.list = res.content.map(x => {
        x.categoryImageUrl = `data:image/png;base64,${x.categoryImageBase64}`;
        return x;
      });
      this.total = res.totalElements;
      this.isLoading = false;
    });
  }

  getNextPage(e: PageEvent) {
    this.query.page = e.pageIndex;
    this.query.size = e.pageSize;
    this.getListCategories();
  }

  search() {
    this.query.page = 0;
    if (this.categoriesForm.controls['name'].value) {
      Object.assign(this.query, { categoryName: this.categoriesForm.controls['name'].value })
    }
    this.getListCategories();
  }

  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(CategoryAddEditComponent, {
      width: '600px',
      data: { record: value },
    });
    dialogRef.afterClosed().subscribe(() => { this.getListCategories(); });
  }
  delete(value: any) {
    if (value.id) {
      this.servicecategories.delete(value.id).subscribe(res => {
        if (res) {
          this.toastr.success("Xóa danh mục thành công!");
        } else {
          this.toastr.success("Xóa danh mục thất bại!");
        }
      })
    }
  }
  // nextProductsPage(value: any) {
  //   if (value.id) {
  //     this.router.navigate([`/categorie/${value.id}`])
  //   }
  // }
  addCategory() {
    const dialogRef = this.dialog.originalOpen(CategoryAddEditComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(() => { this.getListCategories(); });
  }
}
