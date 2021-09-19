import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TablesKitchenSinkEditComponent } from 'app/routes/tables/kitchen-sink/edit/edit.component';

@Component({
  selector: 'app-orders-new-orders-detail',
  templateUrl: './new-orders-detail.component.html',
})
export class NewOrdersDetailComponent implements OnInit {
  newOrdersForm!: FormGroup;
  list: any[] = [];
  total = 0;
  query = {
    page: 0,
    size: 10,
  };
  displayedColumns = ['productName', 'quantity', 'productImageUrl', 'amount'];
  constructor(
    public dialogRef: MatDialogRef<TablesKitchenSinkEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.total = this.data.record ? this.data.record.length : 0;
    this.list = this.data.record.map((x) => {
      x.productImageUrl = `data:image/png;base64,${x.productImageBase64}`;
      return x;
    })
  }

  get params() {
    const p = Object.assign({}, this.query);
    return p;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
