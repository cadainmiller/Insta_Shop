import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
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
  base64Image: string;
  action: string;
  url = '';
  query = '';
  _id: string;

  receivedInfo: any;

  constructor(
    public bsModalRef: BsModalRef,
    private idGenerator: IdGenerator,
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {}

  get f() {
    return this.ProductForm.controls;
  }

  handleUpload(event) {
    // const file = event.target.files[0];
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //   this.base64Image = reader.result as string;
    // };

    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.ProductForm.patchValue({
          product_image: reader.result,
        });
        this.url = reader.result as string;
      };
    }
  }

  ProductForm = new FormGroup({
    productId: new FormControl({value: '', disabled: true}),
    name: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    product_image: new FormControl(null, Validators.required),
    price: new FormControl(''),
    onsale:new FormControl(false),
    saleprice: new FormControl(''),
    shipping_details: new FormGroup({
      weight: new FormControl(''),
      depth: new FormControl(''),
      width: new FormControl(''),
      height: new FormControl(''),
    }),
  });

  get name() {
    return this.ProductForm.get('name');
  }

  get description() {
    return this.ProductForm.get('description');
  }

  get quantity() {
    return this.ProductForm.get('quantity');
  }

  // get product_image() {
  //   return this.ProductForm.controls['product_image'].setValue(
  //     this.base64Image
  //   );
  // }


  ngOnInit(): void {
    // console.log(this.productId);

    if (this.action == 'update') {
    
      this.productService.getProductBy(this.query)
        .subscribe((data) => {
          this.receivedInfo = data;
          this._id = this.receivedInfo._id;
          console.log( this._id);
          this.url = this.receivedInfo.product_image
          this.ProductForm.patchValue({
            productId: this.receivedInfo.productId,
            name: this.receivedInfo.name,
            quantity: this.receivedInfo.quantity,
            description: this.receivedInfo.description,
            product_image: this.receivedInfo.product_image,
            price: this.receivedInfo.price,
            saleprice: this.receivedInfo.saleprice,
            shipping_details:{
              weight: this.receivedInfo.shipping_details.weight,
              depth: this.receivedInfo.shipping_details.depth,
              width: this.receivedInfo.shipping_details.width,
              height: this.receivedInfo.shipping_details.height,
            },
          });
        });
    }
  }

  createPrd() {
    console.log(this.ProductForm.value);

    this.productService
      .creteProduct(this.ProductForm.value)
      .subscribe((data) => {
        console.log(data);
      });
  }

  updatePrd() {
    console.log(this.ProductForm.value);

    this.productService
    .updateByProductId(this._id ,this.ProductForm.value)
    .subscribe((data) => {
      console.log(data);
    });

  }
}
