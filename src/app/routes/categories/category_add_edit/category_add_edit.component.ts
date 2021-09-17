import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryAddEditService } from './category_add_edit.service';

@Component({
  selector: 'app-categories-category_add_edit',
  templateUrl: './category_add_edit.component.html',
})
export class CategoryAddEditComponent implements OnInit {
  addCategoryForm = new FormGroup({});
  @ViewChild('fileInput')
  fileInput;
  file!: File;

  constructor(
    private fb: FormBuilder,
    private categoryAddEditService: CategoryAddEditService,
    public dialogRef: MatDialogRef<CategoryAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.addCategoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      categoryImage: ['']
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
}
