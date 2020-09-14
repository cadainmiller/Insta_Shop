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
  base64Image = '';

  constructor(
    public bsModalRef: BsModalRef,
    private idGenerator: IdGenerator,
    private productService: ProductService,
    private sanitizer: DomSanitizer
  ) {}


  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64Image = reader.result as string;
    };
  }

  ProductForm = new FormGroup({
    productid: new FormControl(this.productId),
    name: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    product_image: new FormControl(''),
    price: new FormControl(''),
    saleprice: new FormControl(''),
    shipping_details: new FormGroup({
      weight: new FormControl(''),
      depth: new FormControl(''),
      width: new FormControl(''),
      height: new FormControl(''),
    }),
  });

  get productid() {
    return this.ProductForm.controls['productId'].setValue(this.productId);
  }

  get name() {
    return this.ProductForm.get('name');
  }

  get description() {
    return this.ProductForm.get('description');
  }

  get quantity() {
    return this.ProductForm.get('quantity');
  }

  get product_image() {
    return this.ProductForm.controls['product_image'].setValue(
      this.base64Image
    );
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
