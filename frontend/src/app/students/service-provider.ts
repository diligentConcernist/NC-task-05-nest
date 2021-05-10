import { HttpClient } from "@angular/common/http";
import { InjectionToken, Provider } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";

import { DataDebugService } from "./students.data-debug.service";

export const STUDENT_SERVICE = new InjectionToken<DataDebugService>("StudentsService");

function studentsFactory (http: HttpClient, route: ActivatedRouteSnapshot): DataDebugService {
  return new DataDebugService(http);
}

export const studentServiceProvider: Provider = {
  provide: STUDENT_SERVICE,
  useFactory: studentsFactory,
  deps: [HttpClient, ActivatedRoute]
};