import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MtxDialog, MtxGridColumn } from '@ng-matero/extensions';
import * as moment from 'moment';
import { OrdersService } from '../orders.service';
import { ShippingDetailComponent } from '../shipping-detail/shipping-detail.component';

@Component({
  selector: 'app-orders-shipping',
  templateUrl: './shipping.component.html',
})
export class ShippingComponent implements OnInit {
  shippingForm!: FormGroup;
  list: any[] = [];
  total = 0;
  isLoading = true;
  query = {
    page: 0,
    size: 10,
  };
  columns: MtxGridColumn[] = [
    { header: 'Tên khách hàng', field: 'customerName' },
    { header: 'Địa chỉ', field: 'customerAdrress' },
    { header: 'Số điện thoại', field: 'customerPhone' },
    { header: 'Mã đơn hàng', field: 'orderCode' },
    { header: 'Ngày tạo', field: 'createdDate' },
    { header: 'Tổng giá', field: 'totalAmount', type: 'number' },
    { header: 'Ghi chú', field: 'note' },
    {
      header: 'Hành động',
      field: 'operation',
      minWidth: 120,
      width: '10%',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'remove_red_eye',
          tooltip: 'Sửa',
          click: record => this.edit(record),
        },
      ],
    },
  ];
  constructor(private fb: FormBuilder, private serviceOrders: OrdersService, private cdr: ChangeDetectorRef, public dialog: MtxDialog) { }
  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      code: [''],
    });
    this.getListShippingOrders();
  }

  get params() {
    const p = Object.assign({}, this.query);
    return p;
  }

  getListShippingOrders() {
    const params = { ... this.shippingForm.value }
    params.page = this.query.page;
    params.size = this.query.size;
    if (!this.shippingForm.controls['code'].value) {
      delete params.code;
    }
    this.isLoading = true;
    this.serviceOrders.getListShippingOrders(params).subscribe((res: any) => {
      this.list = res.content.map(x => {
        if (x.createdDate) {
          x.createdDate = moment(x.createdDate).format('hh:mm:ss DD/MM/YYYY');
        }
        return x;
      });
      this.total = res.totalElements;
      this.isLoading = false;
    });
  }

  getNextPage(e: PageEvent) {
    this.query.page = e.pageIndex;
    this.query.size = e.pageSize;
    this.getListShippingOrders();
  }

  search() {
    this.query.page = 0;
    if (this.shippingForm.controls['code'].value) {
      Object.assign(this.query, { code: this.shippingForm.controls['code'].value })
    }
    this.getListShippingOrders();
  }
  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(ShippingDetailComponent, {
      width: '600px',
      data: { record: value.productList, orderId: value.billId },
    });
    dialogRef.afterClosed().subscribe(() => { this.getListShippingOrders(); });
  }
}
