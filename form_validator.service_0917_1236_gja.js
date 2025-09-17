// 代码生成时间: 2025-09-17 12:36:24
import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor() {}

  /**
   * Validate a form group using a set of custom validators.
   * @param formGroup The form group to validate.
   */
  validateForm(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        this.validateControl(control);
      }
    });
  }

  /**
   * Validate an individual control and update its state.
   * @param control The control to validate.
   */
  private validateControl(control: AbstractControl): void {
    if (this.hasValidators(control)) {
      control.markAsTouched();
    }
  }

  /**
   * Check if a control has at least one validator.
   * @param control The control to check.
   * @returns true if the control has validators, false otherwise.
   */
  private hasValidators(control: AbstractControl): boolean {
    return control.validator || control.asyncValidator;
  }

  /**
   * Custom validator that requires the control's value to pass a regex test.
   * @param regex The regular expression to test against.
   * @returns A ValidatorFn that applies the regex test.
   */
  static regexValidator(regex: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = regex.test(control.value);
      return valid ? null : { 'regexFail': { value: control.value } };
    };
  }

  /**
   * Custom validator that checks if the control's value is within a certain range.
   * @param min The minimum value allowed.
   * @param max The maximum value allowed.
   * @returns A ValidatorFn that checks the value range.
   */
  static rangeValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const inRange = typeof value === 'number' && value >= min && value <= max;
      return inRange ? null : { 'rangeFail': true };
    };
  }

  /**
   * Custom validator that checks if two controls have the same value.
   * @param matchingControlName The name of the control that must match this one.
   * @returns A ValidatorFn that compares two control values.
   */
  static matchingValidator(matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const matchingControl = control.parent.get(matchingControlName);
      if (matchingControl) {
        if (control.value === matchingControl.value) {
          return null;
        } else {
          return { 'notMatching': true };
        }
      }
      return null;
    };
  }
}
