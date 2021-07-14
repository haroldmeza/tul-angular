import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ResetOrderId } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/reducers/initial-state';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  selectedId: String;
  productosInOrder : Observable<any[]>


  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private fireStoreService: FirestoreService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedId = params.get('id');
      if(this.selectedId){
        this.store.dispatch(ResetOrderId());
        this.productosInOrder = this.fireStoreService.getOrderById(this.selectedId).pipe(map((res : any) => res.products))
      }
    })
  }

}
