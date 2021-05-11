import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";

import { Student } from "./student";

@Injectable()
export class DataService {

  students: Student[] = [];

  constructor(private http: HttpClient) {
    this.getStudents();
  }

  getStudents(): Observable<string> {
    return this.http.get("http://localhost:3000/student", {responseType: "text"})
    .pipe(tap(
      data => {
        this.students = JSON.parse(data, function (key: string, value: string): string | Date | number | Student {
          return value;
        });
        this.students = this.students.slice();
      }));
    }

    getById(id: string): Observable<Student> | null {
      return this.http.get<Student>(`http://localhost:3000/student/${id}`)
        .pipe(
          map(data  => {
          return data;
        }));
    }
  
    create(student: Student): Observable<Student> {
      const newStudent = {
        ...student,
      };
      return this.http.post<Student>("http://localhost:3000/student", newStudent)
        .pipe(map(data  => {
          return data;
        }));
    }
  
    update(student: Student, id: string): Observable<Student> {
      const updatedStudent = {
        ...student
      };
      return this.http.put<Student>(`http://localhost:3000/student/${id}`, updatedStudent)
        .pipe(map(data  => {
          return data;
        }));
    }
  
    delete(id: string): Observable<Student> | null {
      return this.http.delete<Student>(`http://localhost:3000/student/${id}`)
        .pipe(map(data  => {
          return data;
        }));
    }
}