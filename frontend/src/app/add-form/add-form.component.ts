import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";

import { Student } from "../student";
import { dateValidator } from "./date-validator";
import { nameValidator } from "./name-validator";

@Component({
  selector: "add-form",
  templateUrl: "./add-form.component.html",
  styleUrls: ["./add-form.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddFormComponent implements OnInit, OnChanges {
  studentForm: Student | null = null;

  @Input() set student(student_: Student | null) {
    this.studentForm = student_;
  }

  @Output() save = new EventEmitter<Student>();
  @Output() cancelEdit = new EventEmitter();

  form = new FormGroup({
    fullName: new FormGroup({
      lastName: new FormControl(this.student?.lastName,
        [Validators.required, Validators.minLength(2),
         Validators.pattern("^[A-Za-zА-Яа-яЁё]+$")]),
      firstName: new FormControl(this.student?.firstName,
        [Validators.required, Validators.minLength(2),
         Validators.pattern("^[A-Za-zА-Яа-яЁё]+$")]),
      middleName: new FormControl(this.student?.middleName,
        [Validators.required, Validators.minLength(2),
         Validators.pattern("^[A-Za-zА-Яа-яЁё]+$")])
    }, { validators: nameValidator }),
    birth: new FormControl(this.student?.birth,
      [Validators.required, dateValidator]),
    averageMark: new FormControl(this.student?.averageMark,
      [Validators.required, Validators.min(0), Validators.max(5)])
  });

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if (this.studentForm === null) {
      this.form.reset();
    }
    if (this.studentForm !== null) {
      this.form.setValue({
        fullName: {
          lastName: this.studentForm.lastName,
          firstName: this.studentForm.firstName,
          middleName: this.studentForm.middleName,
        },
        birth: this.studentForm.birth,
        averageMark: this.studentForm.averageMark,
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const student: Student = {
        firstName: this.form.value.fullName.firstName,
        lastName: this.form.value.fullName.lastName,
        middleName: this.form.value.fullName.middleName,
        birth: this.form.value.birth,
        averageMark: this.form.value.averageMark
      };
      this.save.emit(student);
      if (this.studentForm !== null) {
        this.studentForm = null;
      }
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }

  get fullName(): AbstractControl | null {
    return this.form.get("fullName");
  }

  get firstName(): AbstractControl | null {
    return this.form.get("fullName.firstName");
  }

  get lastName(): AbstractControl | null {
    return this.form.get("fullName.lastName");
  }

  get middleName(): AbstractControl | null {
    return this.form.get("fullName.middleName");
  }

  get birth(): AbstractControl | null {
    return this.form.get("birth");
  }

  get averageMark(): AbstractControl | null {
    return this.form.get("averageMark");
  }

  cancel(): void {
    this.cancelEdit.emit();
    this.studentForm = null;
    this.form.reset();
  }

  check(control: AbstractControl | null): boolean {
    if (control) {
      return control.invalid && (control.dirty || control.touched);
    }
    return false;
  }

  checkLastName(): boolean {
    if (this.firstName && this.lastName) {
      return (this.firstName?.dirty || this.firstName?.touched) &&
    (this.lastName?.dirty || this.lastName.touched) &&
    (this.firstName.value === this.lastName.value);
    }
    return false;
  }

  getError(controlName: string): string {
    const control = this.form.get(controlName);
    if (control && control.invalid) {
      let err: string = "";

      if (control.errors?.required || control.errors?.dateRequired) {
        err = "Обязательное поле";
      }

      if (control.errors?.minlength) {
        err = "Слишком мало символов";
      }
      if (control.errors?.pattern) {
        err = "Поле может содержать только буквы";
      }
      if (control.errors?.fullNameMatch) {
        err = `Имя не должно совпадать с фамилией и/или отчеством`;
      }

      if (control.errors?.dateMatch) {
        err = `Дата рождения должна быть не более
        ${control.errors?.dateMatch.requiredDate}`;
      }

      if (control.errors?.min) {
        err = `Минимальная оценка: ${control.errors?.min.min}`;
      }
      if (control.errors?.max) {
        err = `Максимальная оценка: ${control.errors?.max.max}`;
      }

      return err;
    }
    return "";
  }
}
