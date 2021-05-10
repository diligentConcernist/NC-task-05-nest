import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const dateValidator: ValidatorFn =
(control: AbstractControl): ValidationErrors | null => {
  const tenYears: number = 315576e6;
  if (control.value !== null) {
    const birthDate: Date = new Date (control.value);
    const borderDate: Date = new Date (Date.now() - tenYears);

    function getDate(d: Date): string {
      const time: string[] = [
        "0" + d.getDate(),
        "0" + (d.getMonth() + 1),
      ].map(component => component.slice(-2));

      time.push(String(d.getFullYear()));
      return time.join(".");
    }

    if (Date.now() - tenYears < birthDate.getTime()) {
      return { dateMatch: {
          requiredDate: getDate(borderDate),
        }
      };
    }
    return null;
  }
  return {dateRequired: true};
};
