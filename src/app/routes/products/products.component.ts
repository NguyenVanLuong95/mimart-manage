import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { MtxDialog, MtxGridColumn } from '@ng-matero/extensions';
import { ProductsService } from './products.service';
import { TranslateService } from '@ngx-translate/core';
import { ProductAddEditComponent } from './product_add_edit/product_add_edit.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  @ViewChild('statusTpl', { static: true }) statusTpl!: TemplateRef<any>;
  productsForm!: FormGroup;
  list: any[] = [];
  total = 0;
  isLoading = true;
  images: any[] = [];
  query = {
    page: 0,
    size: 10,
  };
  columns: MtxGridColumn[] = [
    { header: 'Tên sản phẩm', field: 'productName' },
    { header: 'Giá sản phẩm', field: 'unitPrice' },
    // { header: 'Hình ảnh', field: 'productImageUrl', type: 'image' },
    { header: 'Danh mục', field: 'categoryName' },
    {
      header: 'Hành động',
      field: 'operation',
      minWidth: 120,
      width: '9%',
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
  constructor(private fb: FormBuilder, private serviceProducts: ProductsService, private cdr: ChangeDetectorRef, private route: ActivatedRoute, public dialog: MtxDialog, private translate: TranslateService,) { }
  ngOnInit(): void {
    this.productsForm = this.fb.group({
      productName: [''],
    });
    this.getListProducts();
  }

  get params() {
    const p = Object.assign({}, this.query);
    return p;
  }

  getListProducts() {
    const params = { ... this.productsForm.value }
    params.page = this.query.page;
    params.size = this.query.size;
    if (!this.productsForm.controls['productName'].value) {
      delete params.productName;
    }
    this.isLoading = true;
    this.serviceProducts.getListProducts(params).subscribe(res => {
      // this.list = res.content.map(x => {
      //   x.productImageUrl = `data:image/png;base64,${x.productImageBase64}`;
      //   return x;
      // });
      this.list = res.content;
      this.total = res.totalElements;
      this.isLoading = false;
    });
  }

  getNextPage(e: PageEvent) {
    this.query.page = e.pageIndex;
    this.query.size = e.pageSize;
    this.getListProducts();
  }

  search() {
    this.query.page = 0;
    if (this.productsForm.controls['productName'].value) {
      Object.assign(this.query, { productName: this.productsForm.controls['productName'].value })
    }
    this.getListProducts();
  }
  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(ProductAddEditComponent, {
      width: '700px',
      data: { record: value },
    });
  }
  delete(value: any) {
    this.dialog.alert(`You have deleted ${value.position}!`);
  }
  addProduct() {
    const dialogRef = this.dialog.originalOpen(ProductAddEditComponent, {
      width: '700px',
    });
  }
}
