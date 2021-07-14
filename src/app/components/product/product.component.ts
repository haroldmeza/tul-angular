import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, product } from 'src/app/store/reducers/initial-state';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input()
  product : product;
  @Input()
  quantity : number = 0;
  @Input()
  showAdd : boolean = true;
  @Input()
  showMinus : boolean = false;
  @Input()
  showDelete : boolean = false;
  @Output()
  onAddProduct = new EventEmitter<product>();
  @Output()
  onSubtractProduct = new EventEmitter<product>();
  @Output()
  onDeleteProduct = new EventEmitter<product>();

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
  }

  addToCart(): void{
    this.onAddProduct.emit(this.product);
  }

  subtractProduct(){
    this.onSubtractProduct.emit(this.product);
  }

  deleteProduct(){
    this.onDeleteProduct.emit(this.product);
  }
}
