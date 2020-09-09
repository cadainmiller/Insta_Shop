import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  constructor(private http: HttpClient) {}

  rowData: any = [];

  ngOnInit() {
    this.http.get('http://localhost:4000/product/').subscribe((resp) => {
      this.rowData = resp;
      console.log(resp);
    });
  }

  columnDefs = [
    { headerName: 'ID', field: 'productId', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    {
      headerName: 'Description',
      field: 'description',
      sortable: true,
      filter: true,
    },
    { headerName: 'Stock', field: 'stock', sortable: true, filter: true },
  ];
}
