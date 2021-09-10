import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { MtxDialog, MtxGridColumn } from '@ng-matero/extensions';
import { TablesKitchenSinkEditComponent } from '../tables/kitchen-sink/edit/edit.component';
import { ProductsService } from './products.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @ViewChild('statusTpl', { static: true }) statusTpl!: TemplateRef<any>;
  productsForm!: FormGroup;
  list: any[] = [];
  productId: any;
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
    { header: 'Hình ảnh', field: 'productImageUrl', type: 'image'},
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
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.getListProducts(this.productId);
    }
  }

  get params() {
    const p = Object.assign({}, this.query);
    return p;
  }

  getListProducts(id: Number) {
    this.isLoading = true;
    this.serviceProducts.getListProducts(this.params, id).subscribe(res => {
      this.list = res.content.map(x => {
        x.productImageUrl = `data:image/png;base64,${x.productImageBase64}`;
        return x;
      });
      this.total = res.totalElements;
      this.isLoading = false;
    });
  }

  getNextPage(e: PageEvent) {
    this.query.page = e.pageIndex;
    this.query.size = e.pageSize;
    this.getListProducts(this.productId);
  }

  search() {
    this.query.page = 0;
    if (this.productsForm.controls['productName'].value) {
      Object.assign(this.query, { productName: this.productsForm.controls['productName'].value })
    }
    this.getListProducts(this.productId);
  }
  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(TablesKitchenSinkEditComponent, {
      width: '600px',
      data: { record: value },
    });
  }
  delete(value: any) {
    this.dialog.alert(`You have deleted ${value.position}!`);
  }
}
