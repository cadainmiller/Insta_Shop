import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/component/services/invoice.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss'],
})
export class ViewInvoiceComponent implements OnInit {
  orderId: string;
  invoiceDoc: string;
  invoiceId: string;
  invoiceObj: any;
  invoiceDoc2 = ``;
  variable_name: any;

  constructor(
    private invoiceService: InvoiceService,
    private dom: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.invoiceId = this.invoiceObj.invoice.invoiceId;
    this.invoiceDoc = this.invoiceObj.invoice.invoiceDoc;
  }

  getInvoice(id: String) {
    this.invoiceService.getInvoiceByOrderId(id).subscribe((data) => {
      console.log(data);
      this.invoiceDoc = data.invoice.invoiceDoc;
    });
  }

  pdfURL() {
    return (this.variable_name = this.dom.bypassSecurityTrustResourceUrl(
      this.invoiceObj.invoice.invoiceDoc
    ));
  }

  emailInvoice(id: String) {
    this.invoiceService.emailInvoiceByOrderId(this.orderId).subscribe((data) => {});
  }
}
