import { Component, OnInit } from '@angular/core';
import { PinService } from '../services/pin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerCreateComponent } from '../../customers/components/customer-create/customer-create.component';
import { PinCreateComponent } from '../pin-create/pin-create.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pin-list',
  templateUrl: './pin-list.component.html',
  styleUrls: ['./pin-list.component.css']
})
export class PinListComponent implements OnInit {

  pintList: any=[];

  listSubscription = new Subscription();

  constructor( private readonly pinService: PinService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPinList();
    this.listSubscription = this.pinService.OnUpdate$.subscribe((OnUpdate: any) => { 
      this.getPinList();
    })
  }

  getPinList(){
    this.pintList = this.pinService.getPintList();
  }

  openCustomerModal() {
    const modalRef = this.modalService.open(CustomerCreateComponent);
    modalRef.result.then((result) => {
    }).catch((error) => {
      //
    });
  }

  openPinModal() {
    const modalRef = this.modalService.open(PinCreateComponent);
    modalRef.result.then((result) => {
      //
    }).catch((error) => {
    });
  }

  ngOnDestroy(){
    this.listSubscription.unsubscribe();
  }
}
