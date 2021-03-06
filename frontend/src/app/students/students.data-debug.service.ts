import { HttpClient } from "@angular/common/http";
import {Injectable, OnInit} from '@angular/core';
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";

import { Student } from "./student";

@Injectable()
export class DataDebugService {

  students: Student[] = [];

  constructor(private http: HttpClient) {
    this.getStudents();
  }

  getStudents(): Observable<string> {
    return this.http.get("../assets/students-list.json", {responseType: "text"})
      .pipe(tap(
        data => {
          this.students = JSON.parse(data, function (key: string, value: string): string | Date | number | Student {
            return value;
          });
          this.students = this.students.slice();
        }));
      }

  getById(id: string): Observable<Student> | null {
    const found = this.students.find((s) => s.id?.toString() === id);
    if (found != undefined) {
      return of(found);
    }
    return null;
  }

  create(student: Student): Observable<Student> {
    const newStudent = {
      ...student,
      id: Date.now().toString()
    };
    return of(newStudent);
  }

  update(student: Student, id: string): Observable<Student> {
    const updatedStudent = student;
    return of(updatedStudent);
  }

  delete(id: string): Observable<Student> | null {
    const studentToDelete = this.students.find((s) => s.id === id);
    if (studentToDelete != undefined) {
      return of(studentToDelete);
    }
    return null;
  }
}