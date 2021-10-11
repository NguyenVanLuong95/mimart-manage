import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from 'app/routes/categories/categories.service';
import { ReportsService } from 'app/routes/reports/reports.service';
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
  checkForm: boolean = false;
  file!: File;
  listCategory: any;
  listBuildings: any;
  id: any;
  listStories: any;
  constructor(
    private fb: FormBuilder,
    private productAddEditService: ProductAddEditService,
    public dialogRef: MatDialogRef<ProductAddEditComponent>,
    private toastr: ToastrService,
    private categoryService: CategoriesService,
    private reportService: ReportsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.addProductForm = this.fb.group({
      productName: ['', Validators.required],
      unitPrice: ['', Validators.required],
      productImage: [''],
      category: ['', Validators.required],
      building: ['', Validators.required],
      story: ['', Validators.required],
    });
    this.getListCategories();
    this.getAllBuildings();
    this.getListStories();
    if (this.data) {
      this.checkForm = true;
      this.id = this.data.record.productId;
      this.addProductForm.controls['productName'].setValue(this.data.record.productName);
      this.addProductForm.controls['unitPrice'].setValue(this.data.record.unitPrice);
      this.addProductForm.controls['category'].setValue(this.data.record.categoryId);
      this.addProductForm.controls['building'].setValue(this.data.record.buildingId);
      this.addProductForm.controls['story'].setValue(this.data.record.storeId);
    } else {
      this.checkForm = false;
      this.addProductForm.controls['category'].setValue(1);
      this.addProductForm.controls['building'].setValue(1);
      this.addProductForm.controls['story'].setValue(1);
    }
  }

  getListStories() {
    this.reportService.getListStories().subscribe(res => {
      this.listStories = res
    })
  }

  getListCategories() {
    this.categoryService.getListCategories().subscribe(res => {
      this.listCategory = res.content;
    })
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
    formData.append('categoryId', this.addProductForm.controls['category'].value)
    formData.append('productImage', this.file);
    formData.append('productName', this.addProductForm.controls.productName.value);
    formData.append('unitPrice', this.addProductForm.controls.unitPrice.value);
    formData.append('buildingId', this.addProductForm.controls.building.value);
    formData.append('storeId', this.addProductForm.controls.story.value);
    this.productAddEditService.onSave(formData).subscribe(res => {
      if (res) {
        this.toastr.success("Thêm mới sản phẩm thành công!");
        this.onClose();
      } else {
        this.toastr.error("Thêm mới sản phẩm thất bại!")
      }
    });
  }

  onSaveEdit() {
    const formData = new FormData();
    formData.append('categoryId', this.addProductForm.controls['category'].value)
    formData.append('productImage', this.file);
    formData.append('productName', this.addProductForm.controls.productName.value);
    formData.append('unitPrice', this.addProductForm.controls.unitPrice.value);
    formData.append('buildingId', this.addProductForm.controls.building.value);
    formData.append('storeId', this.addProductForm.controls.story.value);
    // this.productAddEditService.onSaveEdit(formData).subscribe(res => {
    //   if (res) {
    //     this.toastr.success("Cập nhật sản phẩm thành công!");
    //     this.onClose();
    //   } else {
    //     this.toastr.error("Cập nhật sản phẩm thất bại!")
    //   }
    // });
  }

  getAllBuildings() {
    this.productAddEditService.getAllBuilding().subscribe(res => {
      this.listBuildings = res;
    })
  }

}
