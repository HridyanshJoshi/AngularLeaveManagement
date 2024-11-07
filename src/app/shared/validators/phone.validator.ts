import { AbstractControl } from '@angular/forms';

export function phoneNumber(control: AbstractControl): { [key: string]: any | null } {
  const startzero = control.value?.toString().charAt(0) == 0;
  return startzero ? { startzero: true } : null;
}
