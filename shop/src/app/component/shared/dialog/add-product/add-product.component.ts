import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { IdGenerator } from 'src/app/component/analytics/idgenerator';
import { ProductService } from 'src/app/component/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  title: string;
  closeBtnName: string;
  productId = 'PD' + this.idGenerator.uniqueId();
  submitted = false;
  errorMessage = '';

  constructor(
    public bsModalRef: BsModalRef,
    private idGenerator: IdGenerator,
    private productService: ProductService
  ) {}

  ProductForm = new FormGroup({
    productid: new FormControl(this.productId),
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    productprice: new FormControl(''),
    saleprice: new FormControl(''),
    productweight: new FormControl(''),
    productdepth: new FormControl(''),
    productwidth: new FormControl(''),
    productheight: new FormControl(''),
  });

  get productid() {
    return this.ProductForm.controls['productId'].setValue(this.productId);
  }

  get name() {
    return this.ProductForm.get('name');
  }

  ngOnInit(): void {
    // console.log(this.productId);
  }

  createPrd() {
    console.log(this.ProductForm.value);

    // this.productService
    //   .creteProduct(this.ProductForm.value)
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
  }
}
