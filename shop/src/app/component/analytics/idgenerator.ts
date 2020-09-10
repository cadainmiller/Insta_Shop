import { Component, OnInit, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class IdGenerator {
  constructor() {}

  ngOnInit(): void {}
  uniqueId() {
    return parseInt(
      Math.ceil(Math.random() * Date.now())
        .toPrecision(8)
        .toString()
        .replace('.', '')
    );
  }
}
