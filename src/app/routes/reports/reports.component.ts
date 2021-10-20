import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportsService } from './reports.service';
import { Moment } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../categories/categories.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
})
export class ReportsComponent implements OnInit {
  listStories: any;
  listReport: any;
  storyName!: string;
  listCategory: any;
  reportForm = new FormGroup({});
  pdfSrc = {}
  FileSaver = require('file-saver');
  fileExtension = '.xlsx';
  displayedColumns = ['productName', 'unitPrice', 'inventoryQuantity', 'discount', 'soldQuantity', 'revenue'];
  constructor(
    private reportService: ReportsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private categoryService: CategoriesService,
  ) { }
  ngOnInit(): void {
    this.reportForm = this.fb.group({
      story: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
      category: [''],
    });
    this.getListStories();
    this.getListCategories();
    this.reportForm.controls['story'].setValue(1);
    if (this.listStories) {
      this.storyName = this.listStories.find(x => x.id == 1).name;
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

  getReport() {
    let categoryId = this.reportForm.controls['category'].value;
    let storyId = this.reportForm.controls['story'].value;
    let timeDateFrom: Moment = this.reportForm.controls['dateFrom'].value;
    let yearDateFrom = timeDateFrom.toObject().years;
    let monthDateFrom = timeDateFrom.toObject().months + 1;
    let dayDateFrom = timeDateFrom.toObject().date;
    let dateFrom = yearDateFrom + '-' + monthDateFrom + '-' + dayDateFrom;
    let timeDateTo: Moment = this.reportForm.controls['dateTo'].value;
    let yearDateTo = timeDateTo.toObject().years;
    let monthDateTo = timeDateTo.toObject().months + 1;
    let dayDateTo = timeDateTo.toObject().date;
    let dateTo = yearDateTo + '-' + monthDateTo + '-' + dayDateTo;
    if (yearDateFrom > yearDateTo) {
      this.toastr.error("Thời gian từ ngày không được lớn hơn đến ngày!");
      return;
    }
    if ((yearDateFrom == yearDateTo) && (monthDateFrom > monthDateTo)) {
      this.toastr.error("Thời gian từ ngày không được lớn hơn đến ngày!");
      return;
    }
    if ((yearDateFrom == yearDateTo) && (monthDateFrom == monthDateTo) && (dayDateFrom > dayDateTo)) {
      this.toastr.error("Thời gian từ ngày không được lớn hơn đến ngày!");
      return;
    }
    let params = {}

    if (categoryId) {
      params = {
        dateFrom: dateFrom,
        dateTo: dateTo,
        categoryId: categoryId
      }
    } else {
      params = {
        dateFrom: dateFrom,
        dateTo: dateTo
      }
    }
    this.reportService.getReport(storyId, params).subscribe(res => {
      this.listReport = res.content;
    })
  }
  exportExcel() {
    let categoryId = this.reportForm.controls['category'].value;
    let storyId = this.reportForm.controls['story'].value;
    let timeDateFrom: Moment = this.reportForm.controls['dateFrom'].value;
    let yearDateFrom = timeDateFrom.toObject().years;
    let monthDateFrom = timeDateFrom.toObject().months + 1;
    let dayDateFrom = timeDateFrom.toObject().date;
    let dateFrom = yearDateFrom + '-' + monthDateFrom + '-' + dayDateFrom;
    let timeDateTo: Moment = this.reportForm.controls['dateTo'].value;
    let yearDateTo = timeDateTo.toObject().years;
    let monthDateTo = timeDateTo.toObject().months + 1;
    let dayDateTo = timeDateTo.toObject().date;
    let dateTo = yearDateTo + '-' + monthDateTo + '-' + dayDateTo;
    if (yearDateFrom > yearDateTo) {
      this.toastr.error("Thời gian từ ngày không được lớn hơn đến ngày!");
      return;
    }
    if ((yearDateFrom == yearDateTo) && (monthDateFrom > monthDateTo)) {
      this.toastr.error("Thời gian từ ngày không được lớn hơn đến ngày!");
      return;
    }
    if ((yearDateFrom == yearDateTo) && (monthDateFrom == monthDateTo) && (dayDateFrom > dayDateTo)) {
      this.toastr.error("Thời gian từ ngày không được lớn hơn đến ngày!");
      return;
    }
    let params = {}

    if (categoryId) {
      params = {
        dateFrom: dateFrom,
        dateTo: dateTo,
        categoryId: categoryId
      }
    } else {
      params = {
        dateFrom: dateFrom,
        dateTo: dateTo
      }
    }
    this.reportService.exportExcel(storyId, params).subscribe(res => {
      const reader = new FileReader();
      const binaryString = reader.readAsDataURL(res);
      reader.onload = (event: any) => {
        this.pdfSrc = event.target.result;
        this.FileSaver.saveAs(this.pdfSrc, Date.now() + '_' + this.fileExtension);
      };
    })
  }
}
