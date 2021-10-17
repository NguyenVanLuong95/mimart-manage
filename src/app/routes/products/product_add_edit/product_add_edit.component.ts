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
  styleUrls: ['./product_add_edit.component.scss'],
})
export class ProductAddEditComponent implements OnInit {
  addProductForm = new FormGroup({});
  @ViewChild('fileInput')
  fileInput;
  checkForm: boolean = false;
  listCategory: any;
  listBuildings: any;
  id: any;
  listStories: any;
  selectedFiles!: FileList;
  formData = new FormData();
  productImageBase64: any;
  arrImageSrc: string[] = [];
  showImage = true;

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
      discount: ['']
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
      this.addProductForm.controls['discount'].setValue(this.data.record.discount);
      this.productImageBase64 = this.data.record.productImageBase64;
      this.productImageBase64 = this.productImageBase64.map(x => {
        x = `data:image/png;base64,${x}`;
        return x;
      });
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

  onSave() {
    this.formData.append('categoryId', this.addProductForm.controls['category'].value)
    this.formData.append('productName', this.addProductForm.controls.productName.value);
    this.formData.append('unitPrice', this.addProductForm.controls.unitPrice.value);
    this.formData.append('buildingId', this.addProductForm.controls.building.value);
    this.formData.append('storeId', this.addProductForm.controls.story.value);
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.formData.append('productImage', this.selectedFiles[i]);
      }
    }
    this.productAddEditService.onSave(this.formData).subscribe(res => {
      if (res) {
        this.toastr.success("Thêm mới sản phẩm thành công!");
        this.onClose();
      } else {
        this.toastr.error("Thêm mới sản phẩm thất bại!")
      }
    });
  }

  onSaveEdit() {
    this.formData.append('categoryId', this.addProductForm.controls['category'].value)
    this.formData.append('productName', this.addProductForm.controls.productName.value);
    this.formData.append('unitPrice', this.addProductForm.controls.unitPrice.value);
    this.formData.append('buildingId', this.addProductForm.controls.building.value);
    this.formData.append('storeId', this.addProductForm.controls.story.value);
    this.formData.append('productId', this.id);
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.formData.append('productImage', this.selectedFiles[i]);
      }
    }
    this.productAddEditService.onSaveEdit(this.formData).subscribe(res => {
      if (res) {
        this.toastr.success("Cập nhật sản phẩm thành công!");
        this.onClose();
      } else {
        this.toastr.error("Cập nhật sản phẩm thất bại!")
      }
    });
  }

  getAllBuildings() {
    this.productAddEditService.getAllBuilding().subscribe(res => {
      this.listBuildings = res;
    })
  }

  onChangeFileInput(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      this.showImage = false;
    }
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        if (event.target.result) {
          this.arrImageSrc.push(event.target.result);
        }
      }
      reader.readAsDataURL(this.selectedFiles[i]);
    }
  }
}
