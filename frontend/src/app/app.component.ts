import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnInit } from "@angular/core";
import { Student } from "./student";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent implements OnInit, DoCheck {
  fetched: boolean = false;
  students: Student[] = [];

  isHighlighted: boolean = true;

  searchFirstName: string = "";
  searchLastName: string = "";

  studentToDelete: Student | null = null;

  showPopUp: boolean = false;
  editWindowShown: boolean = false;

  selectedAverageMark: string = "";

  dateFrom: string = "";
  dateTo: string = "";

  studentToEdit: Student | null = null;

  constructor(private cdr: ChangeDetectorRef) {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 1000);
  }

  ngOnInit(): void {
    fetch("/assets/students-list.json")
      .then(res => res.json())
      .then(async (data) => {
        await new Promise((res) => setTimeout(res, 100));
        this.fetched = true;
        this.students = data;
      });
  }

  ngDoCheck(): void {
    this.cdr.detectChanges();
  }

  private sortAscending(a: string | number | Date,
    b: string | number | Date):
    number {
    if (a > b) {
      return 1;
    }
    if (a === b) {
      return 0;
    }
    return -1;
  }

  private sortDescending(a: string | number | Date,
    b: string | number | Date):
    number {
    if (a < b) {
      return 1;
    }
    if (a === b) {
      return 0;
    }
    return -1;
  }

  sortFirstNameAsc(): Student[] | null {
    if (this.students) {
      return this.students.sort((a, b) =>
        this.sortAscending(a.firstName, b.firstName));
    }
    return null;
  }

  sortFirstNameDesc(): Student[] | null {
    if (this.students) {
      return this.students.sort((a, b) =>
        this.sortDescending(a.firstName, b.firstName));
    }
    return null;
  }

  sortLastNameAsc(): Student[] | null {
    if (this.students) {
      return this.students.sort((a, b) =>
        this.sortAscending(a.lastName, b.lastName));
    }
    return null;
  }

  sortLastNameDesc(): Student[] | null {
    if (this.students) {
      return this.students.sort((a, b) =>
        this.sortDescending(a.lastName, b.lastName));
    }
    return null;
  }

  sortMiddleNameAsc(): Student[] | null {
    if (this.students) {
      return this.students.sort((a, b) =>
        this.sortAscending(a.middleName, b.middleName));
    }
    return null;
  }

  sortMiddleNameDesc(): Student[] | null {
    if (this.students) {
      return this.students.sort((a, b) =>
        this.sortDescending(a.middleName, b.middleName));
    }
    return null;
  }

  sortBirthAsc(): Student[] | null {
    if (this.students) {
      return this.students.sort((a, b) =>
        this.sortAscending(a.birth, b.birth));
    }
    return null;
  }

  sortBirthDesc(): Student[] | null {
    if (this.students) {
      return this.students.sort((a, b) =>
        this.sortDescending(a.birth, b.birth));
    }
    return null;
  }

  sortAverageMarkAsc(): Student[] | null {
    if (this.students) {
      return this.students.sort((a, b) =>
        this.sortAscending(a.averageMark, b.averageMark));
    }
    return null;
  }

  sortAverageMarkDesc(): Student[] | null {
    if (this.students) {
      return this.students.sort((a, b) =>
        this.sortDescending(a.averageMark, b.averageMark));
    }
    return null;
  }

  getBirth(date: string): string {
    const birth: Date = new Date(date);
    const time: string[] = [
      "0" + birth.getDate(),
      "0" + (birth.getMonth() + 1),
      "" + birth.getFullYear(),
    ].map(component => component.slice(-2));

    return time.join(".");
  }

  getBirthAsDate(date: string): Date {
    const birth: Date = new Date(date);
    return birth;
  }

  changeHighlight(): void {
    this.isHighlighted = !this.isHighlighted;
  }

  filterByAverageMark(averageMark: number): boolean {
    const parsedMark: number = Number(this.selectedAverageMark);
    if (parsedMark === 0) {
      return false;
    }
    if (parsedMark <= averageMark) {
      return false;
    }
    return true;
  }

  filterByDate(birth: Date): boolean {
    let startDate: Date = new Date(0);
    let endDate: Date = new Date(0);

    if (this.dateFrom !== "" && this.dateTo !== "") {
      if (this.dateFrom <= this.dateTo) {
        startDate = new Date(this.dateFrom);
        endDate = new Date(this.dateTo);
      } else {
        endDate = new Date(this.dateFrom);
        startDate = new Date(this.dateTo);
      }
    } else if (this.dateFrom === "" && this.dateTo === "") {
      startDate = new Date(0);
      endDate = new Date();
    } else if (this.dateFrom === "" && this.dateTo !== "") {
      startDate = new Date(0);
      endDate = new Date(this.dateTo);
    } else if (this.dateTo === "" && this.dateFrom !== "") {
      endDate = new Date();
      startDate = new Date(this.dateFrom);
    }
    return !(birth >= startDate && birth <= endDate);
  }

  findStudentByFirstName(firstName: string): boolean {
    if (this.searchFirstName !== "") {
      const lowerCase: string = firstName.toLowerCase();
      const searchedName: string = this.searchFirstName.toLowerCase();
      if (lowerCase.indexOf(searchedName) === 0) {
        return true;
      }
      return false;
    }
    return false;
  }

  findStudentByLastName(lastName: string): boolean {
    if (this.searchLastName !== "") {
      const lowerCase: string = lastName.toLowerCase();
      const searchedName: string = this.searchLastName.toLowerCase();
      if (lowerCase.indexOf(searchedName) === 0) {
        return true;
      }
      return false;
    }
    return false;
  }

  deleteByButton(student: Student): void {
    this.showPopUp = !this.showPopUp;
    this.studentToDelete = student;
  }

  confirm(): void {
    if (this.students) {
      this.students = this.students.filter(item => item !== this.studentToDelete);
      this.showPopUp = !this.showPopUp;
      this.studentToDelete = null;
    }
  }

  cancel(): void {
    this.showPopUp = !this.showPopUp;
    this.studentToDelete = null;
  }

  save(student: Student): void {
    if (this.studentToEdit === null) {
      this.students.splice(this.students.length, 0, student);
    } else {
      const index = this.students.indexOf(this.studentToEdit);
      this.students.splice(index, 1, student);
      this.studentToEdit = null;
    }
    this.editWindowShown = false;
  }

  edit(student: Student | null): void {
    this.editWindowShown = true;
    this.studentToEdit = student;
  }

  cancelEdit(): void {
    this.studentToEdit = null;
    this.editWindowShown = false;
  }
}
