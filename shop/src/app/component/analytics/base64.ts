import { Component, OnInit, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class Base64 {
  constructor() {}

  ngOnInit(): void {}
  upload(filePath) {
    const file = filePath;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
       const data = reader.result as string;

    };
    return reader.result as string;
  }
}
