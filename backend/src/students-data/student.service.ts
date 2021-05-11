import { Injectable } from '@nestjs/common';
import { Student } from './student';

@Injectable()
export class StudentService {

  students: Student[] = [
  {
    lastName: "Абрамов",
    firstName: "Дмитрий",
    middleName: "Артемьевич",
    averageMark: 4.98,
    birth: "1991-02-13",
    id: "1"
  },
  {
    lastName: "Александрова",
    firstName: "Екатерина",
    middleName: "Александровна",
    averageMark: 4.25,
    birth: "1971-10-27",
    id: "2"
  },
  {
    lastName: "Борисов",
    firstName: "Александр",
    middleName: "Маркович",
    averageMark: 2.05,
    birth: "1991-05-26",
    id: "6"
  },
  {
    lastName: "Быков",
    firstName: "Тимофей",
    middleName: "Миронович",
    averageMark: 5.00,
    birth: "1978-05-27",
    id: "7"
  },
  {
    lastName: "Быкова",
    firstName: "Елизавета",
    middleName: "Константиновна",
    averageMark: 3.08,
    birth: "2000-12-29",
    id: "8"
  },
  {
    lastName: "Дроздов",
    firstName: "Михаил",
    middleName: "Елисеевич",
    averageMark: 2.47,
    birth: "1986-10-23",
    id: "9"
  },
  {
    lastName: "Капустина",
    firstName: "Елизавета",
    middleName: "Дмитриевна",
    averageMark: 1.04,
    birth: "1981-12-23",
    id: "10"
  },
]

  getAll(): Student[] {
    return this.students;
  }

  getById(id: string): Student {
    return this.students.find((s) => s.id === id);
  }

  create(studentDto: Student): Student {
    const newStudent: Student = {
      ...studentDto,
      id: Date.now().toString(),
    };
    this.students.push(newStudent);
    return newStudent;
  }

  remove(id: string): Student {
    const studentToRemove = this.students.find((s) => s.id === id);
    this.students = this.students.filter((s) => s !== studentToRemove);
    return studentToRemove;
  }

  update(studentDto: Student, id: string): Student {
    const studentToUpdate = this.students.find((s) => s.id === id);
    const index = this.students.indexOf(studentToUpdate);
    const updatedStudent = {
      ...studentDto,
      id: id,
    };
    this.students.splice(index, 1, updatedStudent);
    return updatedStudent;
  }
}