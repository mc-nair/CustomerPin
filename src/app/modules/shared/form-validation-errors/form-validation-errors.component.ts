import { Component, ContentChild, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { Subject, Subscription, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-form-validation-errors',
  templateUrl: './form-validation-errors.component.html',
  styleUrls: ['./form-validation-errors.component.css']
})
export class FormValidationErrorsComponent {

  //view ref
@ContentChild(NgControl)
formControlRef!: NgControl;

// * Input
@Input()
fieldName!: string;

@Input()
validateOnStatusChange = false;

@Input()
customErrors!: Record<string, string>;

 // * Variables
 private subscriptions = new Subscription();

 errors$ = new Subject<string[]>();

  constructor(private nativeElement: ElementRef, private renderer: Renderer2) { }

  // ngOnInit(): void {
  // }

  // * Life cycle hooks
ngAfterContentInit(): void {
  this.updateValidationOnValueChange();
  this.validateOnStatusChange && this.updateValidationOnStatusChange();
}

private updateValidationOnValueChange(): void {
  this.formControlRef && this.subscriptions.add(
    this.formControlRef?.control?.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(() => {
      this.setErrorMessages()
    })
  )
}

// * Private Methods
private updateValidationOnStatusChange(): void {
  this.formControlRef && this.subscriptions.add(
    this.formControlRef?.control?.statusChanges.pipe(
      distinctUntilChanged()
    )
      .subscribe(() => {
        this.setErrorMessages()
      })
  )
}

// * Public Methods
setErrorMessages(): void {

const abstractControl = this.formControlRef.control as FormControl;

if (!abstractControl.touched) return
const validationErrors = abstractControl?.errors ?? {}
const errors = Object.entries(validationErrors).map(([key, value]: [string, any]) => {
  let errorMessages = '';

  const customErrors = this.customErrors?.[key];
  const fieldName = this.fieldName ?? 'This field'

  switch (key) {
    case "required":
      errorMessages = customErrors ?? `${fieldName} is required`;
      break;
    case "email":
      errorMessages = customErrors ?? `Invalid email address`;
      break;
    case "minlength":
      errorMessages = customErrors ?? `Minimum ${value.requiredLength} character is required`;
      break;
    case "maxlength":
      errorMessages = customErrors ?? `Maximum ${value.requiredLength} character is allowed`;
      break;
    case "pattern":
      errorMessages = customErrors ?? `${fieldName} is invalid`;
      break;
    case "nonAllowedCharacter":
      errorMessages = customErrors ?? `${value.character} is not allowed`;
      break;
    case "initialWhiteSpace":
      errorMessages = customErrors ?? `Cannot start with whitespace`;
      break;
    case "dateRange":
      errorMessages = customErrors ?? `End date should be greater than start date`;
      break;
    case "invalidDeliveryDate":
      errorMessages = customErrors ?? `Delivery date should be greater than pickup date`;
      break;
    case "passwordNotMatched":
      errorMessages = customErrors ?? `Password and confirm password doesn't match`;
      break;
    case "inCorrectPassword":
      errorMessages = customErrors ?? `In correct password`;
      break;
    case "samePassword":
      errorMessages = customErrors ?? `The new password and current password must be different`;
      break;
    case "smallLetter":
      errorMessages = customErrors ?? `Should contain ${value.min} lowercase character`;
      break;
    case "capitalLetter":
      errorMessages = customErrors ?? `Should contain ${value.min} uppercase character`;
      break;
    case "numericCharacter":
      errorMessages = customErrors ?? `Should contain ${value.min} numeric character`;
      break;
    case "specialCharacter":
      errorMessages = customErrors ?? `Should contain ${value.min} special character`;
      break;
    case "noWhiteSpaceAllowed":
      errorMessages = customErrors ?? `White space not allowed`;
      break;
    case "userStatus":
      errorMessages = customErrors ?? `Email already in use`;
      break;
    case "customerStatus":
      errorMessages = customErrors ?? `Phone number already in use`;
      break;
    case "onlyWhiteSpace":
      errorMessages = customErrors ?? 'Only whitespace is not allowed';
      break;
    case "incorrect":
      errorMessages = customErrors ?? 'Please enter a valid count';
      break;
    case "mismatch":
        errorMessages = customErrors ?? "Item count not matching with destination's item count";
        break;
    case "sliderNotValid":
          errorMessages = customErrors ?? 'Please ensure the slider value range is between 1 and 500.';
          break;
    case "pastDate":
          errorMessages = customErrors ?? 'Your date and time must be in the future';
          break;
    case "pastTime":
      errorMessages = customErrors ?? 'Your time must be in the future';
      break;
    default:
      errorMessages = customErrors ?? `Error occurred (${ key })`
  }

  return errorMessages
})
// if (errors.length > 0) {
//   this.nativeElement?.classList.contains('invalid-form-field') || this.renderer.addClass(this.nativeElement, 'invalid-form-field')
// } else {
//   this.nativeElement?.classList.contains('invalid-form-field') && this.renderer.removeClass(this.nativeElement, 'invalid-form-field')
// }
this.errors$.next(errors)
}

// setErrorMessages(): void {
//   const abstractControl = this.formControlRef.control as FormControl;

//   if (!abstractControl.touched) return;
  
//   const validationErrors = abstractControl?.errors ?? {};
//   const errors = Object.entries(validationErrors).map(([key, value]: [string, any]) => {
//     let errorMessages = '';
//     const customErrors = this.customErrors?.[key];
//     const fieldName = this.fieldName ?? 'This field';

//     switch (key) {
//       // Cases for different validation errors...
//     }

//     return errorMessages;
//   });

//   if (errors.length > 0) {
//     this.renderer.addClass(this.nativeElement.nativeElement, 'invalid-form-field');
//   } else {
//     this.renderer.removeClass(this.nativeElement.nativeElement, 'invalid-form-field');
//   }

//   this.errors$.next(errors);
// }

}
