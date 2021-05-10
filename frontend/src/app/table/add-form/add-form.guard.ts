import { Inject, Injectable } from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import { map, take } from "rxjs/operators";
import { STUDENT_SERVICE } from "src/app/students/service-provider";
import { DataDebugService } from "src/app/students/students.data-debug.service";


@Injectable()
export class AddFormGuard implements CanActivate{
  averageMark: number = 0;
  id: string = "";

  constructor(
    private route: ActivatedRoute,
    @Inject(STUDENT_SERVICE) public studentsService: DataDebugService,
    private router: Router) {
  }

  checkStudentScore(): boolean {
    const student = this.studentsService.students.find(s => s.id?.toString()=== this.id);
    if (student != undefined && student.averageMark != undefined) {
      this.averageMark = student.averageMark;
    }
    return this.averageMark !== 5;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
  ): Observable<boolean|UrlTree> | boolean {
    this.id = route.params["id"];
    return this.checkStudentScore();
  }
}