import { HttpClient } from "@angular/common/http";
import { InjectionToken, Provider } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";

import { DataDebugService } from "./students.data-debug.service";
import { DataService } from "./students.data.service";

export const STUDENT_SERVICE = new InjectionToken<DataService | DataDebugService>("StudentsService");

function studentsFactory (http: HttpClient, route: ActivatedRouteSnapshot): DataService | DataDebugService {
  console.log(route.queryParams);
  if (route.queryParams.value["debug"]) {
    console.log("Debug");
    return new DataDebugService(http);
  }
  console.log("Not debug");
  return new DataService(http);
}

export const studentServiceProvider: Provider = {
  provide: STUDENT_SERVICE,
  useFactory: studentsFactory,
  deps: [HttpClient, ActivatedRoute]
};