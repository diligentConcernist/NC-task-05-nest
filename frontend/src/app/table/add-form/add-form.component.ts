import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { STUDENT_SERVICE } from "src/app/students/service-provider";
import { DataDebugService } from "src/app/students/students.data-debug.service";
import { DataService } from "src/app/students/students.data.service";

import { Student } from "../../students/student";
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
  id: string | null = null; 
  private routeSubs: Subscription;
  private studentSubs: Subscription | undefined;
  private querySubs: Subscription;

  @Output() save = new EventEmitter<Student>();
  @Output() cancelEdit = new EventEmitter();
  debug: boolean = false;

  constructor(private route: ActivatedRoute,
    @Inject(STUDENT_SERVICE) public studentsService: DataService | DataDebugService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    ) {

    this.routeSubs = this.route.params.subscribe(
      (params) => {
        if (params["id"]) {
          this.id = params["id"];
        }
      },
    );
    this.querySubs = this.route.queryParams.subscribe(
      (queryParam) => {
        if (queryParam["debug"]) {
          this.debug = queryParam["debug"];
        }
      },
    );
  }

  form = new FormGroup({
    fullName: new FormGroup({
      lastName: new FormControl(this.studentForm?.lastName,
        [Validators.required, Validators.minLength(2),
         Validators.pattern("^[A-Za-zА-Яа-яЁё]+$")]),
      firstName: new FormControl(this.studentForm?.firstName,
        [Validators.required, Validators.minLength(2),
         Validators.pattern("^[A-Za-zА-Яа-яЁё]+$")]),
      middleName: new FormControl(this.studentForm?.middleName,
        [Validators.required, Validators.minLength(2),
         Validators.pattern("^[A-Za-zА-Яа-яЁё]+$")])
    }, { validators: nameValidator }),
    birth: new FormControl(this.studentForm?.birth,
      [Validators.required, dateValidator]),
    averageMark: new FormControl(this.studentForm?.averageMark,
      [Validators.required, Validators.min(0), Validators.max(5)])
  });

  ngOnInit(): void {

  }

  ngAfterContentChecked (): void {
    if (this.id !== null && this.form.dirty == false) {
      this.studentSubs = this.studentsService.getById(this.id)?.subscribe(
        (data: Student) => {
          this.studentForm = data;
          if (this.studentForm) {
            this.form.setValue({
              fullName: {
                firstName: this.studentForm.firstName,
                lastName: this.studentForm.lastName,
                middleName: this.studentForm.middleName,
              },
              birth: this.studentForm.birth,
              averageMark: this.studentForm.averageMark,
            });
          }
        },
      );
    }
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
      if (this.id === null) {
        this.studentsService.create(student).subscribe(
          (data: Student) => {
            const receivedStudent = data;
            this.studentsService.students.splice(this.studentsService.students.length, 0, receivedStudent);
            this.form.reset();
          });
      } else {
        const editableStudent = this.studentsService.students.find((s) => s.id?.toString() === this.id);
        this.studentsService.update(student, this.id).subscribe(
          (data: Student) => {
            const receivedStudent = data;
            console.log(data);
            const index = this.studentsService.students.indexOf(editableStudent!);
            this.studentsService.students.splice(index, 1, receivedStudent);
            this.studentForm = null;
            this.form.reset();
          });
      }
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
    this.router.navigateByUrl('/');
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
