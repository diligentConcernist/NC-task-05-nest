import { Body, Controller, Delete, Get, Param, Post, Put, } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student';

@Controller('student')
export class StudentController {
  constructor(private readonly studentsService: StudentService) {}

  @Get()
  getAll(): any {
    return this.studentsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Student {
    return this.studentsService.getById(id);
  }

  @Post()
  create(@Body() createStudent: Student) {
    return this.studentsService.create(createStudent);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }

  @Put(':id')
  update(@Body() updateStudent: Student, @Param('id') id: string) {
    return this.studentsService.update(updateStudent, id);
  }
}