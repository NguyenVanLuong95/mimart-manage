import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportsService } from './reports.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
})
export class ReportsComponent implements OnInit {
  listStories: any;
  listReport: any;
  reportForm = new FormGroup({});
  displayedColumns = ['productName', 'unitPrice', 'inventoryQuantity', 'discount', 'soldQuantity', 'revenue'];
  constructor(
    private reportService: ReportsService,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.reportForm = this.fb.group({
      story: ['', Validators.required],
    });
    this.getListStories();
    this.reportForm.controls['story'].setValue(1);
    this.getReport()
  }

  getListStories() {
    this.reportService.getListStories().subscribe(res => {
      this.listStories = res
    })
  }
  getReport() {
    this.reportService.getReport(this.reportForm.controls['story'].value).subscribe(res => {
      this.listReport = res.content;
    })
  }
  onValueChange(event) {
    this.getReport();
  }
}
