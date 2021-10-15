import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryAddEditService } from './category_add_edit.service';

@Component({
  selector: 'app-categories-category_add_edit',
  templateUrl: './category_add_edit.component.html',
  styleUrls: ['./category_add_edit.component.scss'],
})
export class CategoryAddEditComponent implements OnInit {
  addCategoryForm = new FormGroup({});
  @ViewChild('fileInput')
  fileInput;
  file!: File;
  checkForm: boolean = false;
  id: any;
  imagePath: any;
  showImage = true;
  constructor(
    private fb: FormBuilder,
    private categoryAddEditService: CategoryAddEditService,
    public dialogRef: MatDialogRef<CategoryAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.addCategoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      categoryImage: ['File | null']
    });
    if (this.data) {
      this.checkForm = true;
      this.id = this.data.record.id;
      this.addCategoryForm.controls['categoryName'].setValue(this.data.record.categoryName);
      this.imagePath = this.data.record.categoryImageUrl;
    } else {
      this.checkForm = false;
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
    if (this.file) {
      this.showImage = false;
    }
  }

  onSave() {
    const formData = new FormData();
    formData.append('categoryImage', this.file);
    formData.append('categoryName', this.addCategoryForm.controls.categoryName.value);
    this.categoryAddEditService.onSave(formData).subscribe(res => {
      if (res) {
        this.toastr.success("Thêm mới danh mục thành công!");
        this.onClose();
      } else {
        this.toastr.error("Thêm mới danh mục thất bại!")
      }
    });
  }

  onSaveEdit() {
    const formData = new FormData();
    formData.append('categoryId', this.id);
    if (this.file) {
      formData.append('categoryImage', this.file);
    }
    formData.append('categoryName', this.addCategoryForm.controls.categoryName.value);
    this.categoryAddEditService.onSaveEdit(formData).subscribe(res => {
      if (res) {
        this.toastr.success("Cập nhật danh mục thành công!");
        this.onClose();
      } else {
        this.toastr.error("Cập nhật danh mục thất bại!")
      }
    });
  }
}
