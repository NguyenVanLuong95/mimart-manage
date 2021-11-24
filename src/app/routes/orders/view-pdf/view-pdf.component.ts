import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-orders-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.css'],
})
export class ViewPdfComponent implements OnInit {
  pdf_Src = {}
  constructor(
    public dialogRef: MatDialogRef<ViewPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {
    this.pdf_Src = this.data.pdf_Src;
  }
}
