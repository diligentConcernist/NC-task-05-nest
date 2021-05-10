import { NgModule } from "@angular/core";
import { FormsModule , ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AddFormModule } from "./table/add-form/add-form.module";
import { CommentDirective } from "./common/common.comment.directive";
import { TableComponent } from "./table/table.component";
import { HandOverDirective } from "./common/common.hand-over.directive";
import { NameFormat } from "./common/common.name-format.pipe";
import { NumberFormat } from "./common/common.number-format.pipe";
import { AppComponent } from "./app.component";
import { RouterModule, Routes } from "@angular/router";
import { AddFormComponent } from "./table/add-form/add-form.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { studentServiceProvider } from "./students/service-provider";
import { HttpClientModule } from "@angular/common/http";
import { AddFormGuard } from "./table/add-form/add-form.guard";

const appRoutes: Routes = [
  { path: "", component: TableComponent,
    children: [
      { path: "add", component: AddFormComponent},
      { path: "edit/:id", component: AddFormComponent, canActivate: [AddFormGuard]}
    ] 
  },
  { path: "**", component: NotFoundComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CommentDirective,
    HandOverDirective,
    NameFormat,
    NumberFormat,
  ],
  imports: [
    AddFormModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    studentServiceProvider,
    AddFormGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
