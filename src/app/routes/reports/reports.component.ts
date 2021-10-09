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
  storyId = {};
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
    });
    this.getListStories();
    this.reportForm.controls['story'].setValue(1);
    if (this.listStories) {
      this.storyName = this.listStories.find(x => x.id == 1).name;
    }
    this.getReport(this.reportForm.controls['story'].value)
  }

  getListStories() {
    this.reportService.getListStories().subscribe(res => {
      this.listStories = res
    })
  }
  getReport(storyId) {
    this.reportService.getReport(storyId).subscribe(res => {
      this.listReport = res.content;
    })
  }
  onValueChange(event) {
    if (event.value) {
      this.storyId = event.value
      this.storyName = this.listStories.find(x => x.id == this.storyId).name;
      this.getReport(this.storyId);
    }
  }
}
