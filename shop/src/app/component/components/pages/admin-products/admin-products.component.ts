import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import {
  GridApi,
  ColumnApi,
  GridColumnsChangedEvent,
  ColDef,
} from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { ProductService } from 'src/app/component/services/product.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddProductComponent } from 'src/app/component/shared/dialog/add-product/add-product.component';
import { Product } from 'src/app/component/models/product.model';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  enableRangeSelection = true;
  enableCharts = true;
  rowSelection = 'multiple';
  enableBrowserTooltips = true;
  floatingFilter = true;
  selectedProduct: Product;
  gridApi: GridApi;
  gridColumnApi: ColumnApi;
  rowData: any;
  groupDefaultExpanded = -1;
  columnDefs = this.buildColDef();
  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  };
  bsModalRef: BsModalRef;
  selectedValue: string;
  selectedOption: any;
  url = '';
  productIDs: any;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private modalService: BsModalService,
    private productService: ProductService
  ) {}

  ProductIDForm = new FormGroup({
    productId: new FormControl('', Validators.required),
  });

  get productId() {
    return this.ProductIDForm.get('productId');
  }

  ngOnInit() {
    this.productService.getAllProduct().subscribe((resp) => {
      this.rowData = resp;
      console.log(this.rowData);
      const result = Object.keys(resp).map((e) => resp[e].productId);
      this.productIDs = result;

      // this.url = resp[19].product_image;
      // console.log(this.url)
    });
  }

  onGridReady(event: GridColumnsChangedEvent): void {
    this.gridApi = event.api;
    this.gridColumnApi = event.columnApi;
    this.gridApi.closeToolPanel();
    this.gridApi.sizeColumnsToFit();
  }

  buildColDef(): Array<ColDef> {
    const id: ColDef = {
      headerName: 'ID',
      field: 'productId',
      filter: 'agTextColumnFilter',
      // valueGetter: (params) => {
      //   if (params.node.group) {
      //     return params.node.key;
      //   } else {
      //     if (params.data[params.colDef.field]) {
      //       if (params.data.Driver1Id) {
      //         const driver = params.data[params.colDef.field].find(
      //           (asset) => asset.id === params.data.Driver1Id
      //         );
      //         if (driver) {
      //           return driver.Name;
      //         }
      //       }
      //       return '';
      //     }
      //   }
      // },
      cellRenderer: (params) => {
        return params.value ? params.value : '&mdash;';
      },
    };

    const description: ColDef = {
      headerName: 'Description',
      field: 'description',
      filter: 'agTextColumnFilter',
      cellRenderer: (params) => {
        return params.value ? params.value : '&mdash;';
      },
    };

    const name: ColDef = {
      headerName: 'Product Name',
      field: 'name',
      filter: 'agTextColumnFilter',
      cellRenderer: (params) => {
        return params.value ? params.value : '&mdash;';
      },
    };
    const stock: ColDef = {
      headerName: 'Stock',
      field: 'quantity',
      filter: 'agTextColumnFilter',
      cellRenderer: (params) => {
        return params.value ? params.value : '&mdash;';
      },
    };

    const sale: ColDef = {
      headerName: 'On Sale',
      field: 'sale',
      filter: 'agTextColumnFilter',
      cellRenderer: (params) => {
        if (params.value) {
          const element = `<span class="status bg-${params.value} bg-op-2 text-${params.value}">${params.value}<span/>`;
          return `<span class="status bg-red bg-op-2 text-green">On Sale<span/>`;
        }
        return 'No Sale';
      },
    };

    const price: ColDef = {
      headerName: 'Price',
      field: 'price',
      filter: 'agTextColumnFilter',
      cellRenderer: (params) => {
        return params.value ? params.value : '&mdash;';
      },
    };

    const sale_price: ColDef = {
      headerName: 'Sale Price',
      field: 'sale_price',
      filter: 'agTextColumnFilter',
      cellRenderer: (params) => {
        return params.value ? params.value : '&mdash;';
      },
    };

    const createdAt: ColDef = {
      headerName: 'Created',
      field: 'createdAt',
      filter: 'agTextColumnFilter',
      cellRenderer: (params) => {
        return params.value
          ? this.datePipe.transform(params.value, 'MM-dd-yyyy')
          : '&mdash;';
      },
    };

    const updatedAt: ColDef = {
      headerName: 'Updated',
      field: 'updatedAt',
      filter: 'agTextColumnFilter',
      cellRenderer: (params) => {
        return params.value
          ? this.datePipe.transform(params.value, 'MM-dd-yyyy')
          : '&mdash;';
      },
    };

    return [
      id,
      name,
      description,
      stock,
      price,
      sale,
      sale_price,
      createdAt,
      updatedAt,
    ];
  }

  rowClicked(data: any) {
    this.selectedProduct = data;
  }

  openModalWithComponent() {
    const initialState = {
      title: 'Create Product',
      action: 'add',
    };
    this.bsModalRef = this.modalService.show(AddProductComponent, {
      initialState,
      class: 'modal-lg modal-dialog-centered',
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  openUpdateModalWithComponent() {
    console.log(this.ProductIDForm.value);
    const initialState = {
      title: 'Update Product',
      action: 'update',
      query: this.ProductIDForm.value.productId,
    };
    this.bsModalRef = this.modalService.show(AddProductComponent, {
      initialState,
      class: 'modal-lg modal-dialog-centered',
    });
    this.bsModalRef.content.closeBtnName = 'Cancel';
  }
}
