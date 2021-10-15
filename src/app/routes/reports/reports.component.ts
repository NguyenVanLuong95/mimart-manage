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
  storyName!: string;
  reportForm = new FormGroup({});
  displayedColumns = ['productName', 'unitPrice', 'inventoryQuantity', 'discount', 'soldQuantity', 'revenue'];
  constructor(
    private reportService: ReportsService,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.reportForm = this.fb.group({
      story: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
    });
    this.getListStories();
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
  getReport() {
    let storyId = this.reportForm.controls['story'].value;
    let dateFrom = this.reportForm.controls['dateFrom'].value;
    let dateTo = this.reportForm.controls['dateTo'].value;
    this.reportService.getReport(storyId, dateFrom, dateTo).subscribe(res => {
      this.listReport = res.content;
    })
  }
}
