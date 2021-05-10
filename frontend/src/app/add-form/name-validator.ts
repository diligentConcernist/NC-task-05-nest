import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const nameValidator: ValidatorFn =
(control: AbstractControl): ValidationErrors | null => {
  const lastName = control.get("lastName");
  const firstName = control.get("firstName");
  const middleName = control.get("middleName");
  if (firstName && lastName && middleName &&
    (firstName.dirty || firstName.touched) &&
    (lastName.dirty || lastName.touched) &&
    (middleName.dirty || middleName.touched) &&
    (firstName.value === lastName.value ||
    firstName.value === middleName.value)) {

    return { fullNameMatch: true };
  }

  if (firstName && lastName &&
    (firstName.dirty || firstName.touched) &&
    (lastName.dirty || lastName.touched) &&
    firstName.value === lastName.value) {

    return { lastNameMatch: true };
  }

  if (firstName && middleName &&
    (firstName.dirty || firstName.touched) &&
    (middleName.dirty || middleName.touched) &&
    firstName.value === middleName.value) {

    return { middleNameMatch: true };
  }
  return null;
};
