import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MtxGridColumn } from '@ng-matero/extensions';
import { UsersService } from 'app/routes/users/users.service';
import { OrdersService } from '../orders.service';

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
    { header: 'Mã đơn hàng', field: 'orderCode' },
    { header: 'Ngày tạo', field: 'createdDate' },
    { header: 'Tổng giá', field: 'totalAmount', type: 'number' },
  ];
  constructor(private fb: FormBuilder, private serviceOrders: OrdersService, private cdr: ChangeDetectorRef) { }
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
    this.isLoading = true;
    this.serviceOrders.getListShippingOrders(this.params).subscribe((res: any) => {
      this.list = res.content;
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
}
