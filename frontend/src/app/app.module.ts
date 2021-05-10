import { NgModule } from "@angular/core";
import { FormsModule , ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AddFormModule } from "./table/add-form/add-form.module";
import { CommentDirective } from "./common/common.comment.directive";
import { TableComponent } from "./table/table.component";
import { HandOverDirective } from "./common/common.hand-over.directive";
import { NameFormat } from "./common/common.name-format.pipe";
import { NumberFormat } from "./common/common.number-format.pipe";

@NgModule({
  declarations: [
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
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [TableComponent]
})
export class AppModule {
}
