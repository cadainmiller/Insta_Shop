import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/component/services/invoice.service';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss'],
})
export class ViewInvoiceComponent implements OnInit {
  orderId: string;
  invoiceDoc: string;
  invoiceObj: any;
  invoiceDoc2 = ``

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    console.log(this.orderId);
    console.log(this.invoiceObj);
    console.log(this.invoiceObj.invoice.invoiceDoc);
    this.invoiceDoc = this.invoiceObj.invoice.invoiceDoc;
  }

  getInvoice(id: String) {
    this.invoiceService.getInvoiceByOrderId(id).subscribe((data) => {
      console.log(data.invoice.invoiceDoc);
      this.invoiceDoc = data.invoice.invoiceDoc;
    });
  }

  pdfURL() {
    return this.invoiceDoc;
  }
}
