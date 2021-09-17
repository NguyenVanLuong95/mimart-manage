import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductAddEditService } from './product_add_edit.service';

@Component({
  selector: 'app-products-product_add_edit',
  templateUrl: './product_add_edit.component.html',
})
export class ProductAddEditComponent implements OnInit {
  addProductForm = new FormGroup({});
  @ViewChild('fileInput')
  fileInput;
  file!: File;
  constructor(
    private fb: FormBuilder,
    private productAddEditService: ProductAddEditService,
    public dialogRef: MatDialogRef<ProductAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.addProductForm = this.fb.group({
      productName: ['', Validators.required],
      unitPrice: ['', Validators.required],
      productImage: ['']
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
  }
  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }
  onSave() {
    const formData = new FormData();
    formData.append('categoryId', this.data.record)
    formData.append('productImage', this.file);
    formData.append('productName', this.addProductForm.controls.productName.value);
    formData.append('unitPrice', this.addProductForm.controls.unitPrice.value);
    this.productAddEditService.onSave(formData).subscribe(res => {
      if (res) {
        this.toastr.success("Thêm mới danh mục thành công!");
        this.onClose();
      } else {
        this.toastr.error("Thêm mới sản phẩm thất bại!")
      }
    });
  }
}
