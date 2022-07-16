import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const forbiddenEmailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const alterEgo = 'viet@gmail.com';
    return control.value && control.value === alterEgo ? { isForbidden: true } : null;
};
