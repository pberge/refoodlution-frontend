
import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

/** Les contrasenyes no poden ser iguals */
export const pwdMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const pwd = control.get('password');
  const pwdConfirm = control.get('pwdConfirm');

  // si es el mateix tornem null pq si tornem true es compta com error encara que no ho sigui.
  return  pwd.value === pwdConfirm.value ? null : { pwdMatch: false };
};

@Directive({
  selector: '[appPwdMatch]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PwdMatchValidatorDirective, multi: true }]
})
export class PwdMatchValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return pwdMatchValidator(control);
  }
}
