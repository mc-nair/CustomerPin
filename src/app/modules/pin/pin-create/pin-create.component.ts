import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { INgxSelectOption } from 'ngx-select-ex';
import { PinService } from '../services/pin.service';
import { Subscription } from 'rxjs';

const URL = 'http://localhost:3000/fileupload/';

@Component({
  selector: 'app-pin-create',
  templateUrl: './pin-create.component.html',
  styleUrls: ['./pin-create.component.css']
})
export class PinCreateComponent implements OnInit {

  pinFormGroup!: FormGroup;

  public filterCtrl = new FormControl();

  constructor(private readonly fb: FormBuilder, private readonly pinService: PinService, private modalService: NgbModal) { }

  selectedCustomers: string[]= [];

  public selectedOptions!: INgxSelectOption[];

  customers!: any;

  fileData : any;

  public activeModal!: NgbActiveModal;

  filter$ = new Subscription();

  /**
   * lifecycle hook
   */
  ngOnInit(): void {
    this.initializeForm();
    this.getCustomerList();

    this.filter$ = this.filterCtrl.valueChanges.subscribe((subscriptionTypeId: string) => {
      const selectedCustomer = this.customers.find((item: any) => item.title == subscriptionTypeId);
      if (selectedCustomer) {
          this.selectedCustomers = [...this.selectedCustomers, selectedCustomer.title];
      }
  });
    
  }

   /**
   * function to initialize form
   */
   initializeForm(): void{
    this.pinFormGroup = this.fb.group({
      title: new FormControl(null, { validators: [ Validators.required]}),
      option: new FormControl(null, {validators: [Validators.required]})
    });
  }

  /**
   * function to submit form
   * @return void
   */
  onSubmit() : void{
    this.saveCustomer();
  }
    
  /**
   * function to customer customer
   * @return void
   */
  saveCustomer(): void{
    const formValue = this.pinFormGroup.value;
    const valuesArray: string[] = this.selectedOptions.map(option => option.value.toString());

    let pin = [{
      "title": formValue.title,
      "fileUrl": this.fileData,
      "customers": valuesArray,
      "option": formValue.option
  }];
    
    this.pinService.savePin(pin);
    this.modalService.dismissAll();
  }
    

  /**
   * function to get customerList
   * @returns customerList
   */
  getCustomerList() {
     this.customers = this.pinService.getCustomerList();
  }

  doSelectionChanges(options: INgxSelectOption[]) {
    this.selectedOptions = options;
  }

  public uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart : false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['pdf', 'xls', 'png', 'jpg']

    });


  public onFileSelected(event: any) {
    const file: File = event[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const base64String: string = e.target.result;
      this.fileData = base64String;
    };
    reader.readAsDataURL(file);
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  ngOnDestroy(){
    this.filter$.unsubscribe();
  }
}
