import { Module } from '@nestjs/common';
import { StudentController } from './students-data/student.controller';
import { StudentService } from './students-data/student.service';

@Module({
  imports: [],
  controllers: [StudentController],
  providers: [StudentService],
})
export class AppModule {}
