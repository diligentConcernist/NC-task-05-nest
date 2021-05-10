import { NgModule } from "@angular/core";
import { FormsModule , ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AddFormModule } from "./add-form/add-form.module";
import { CommentDirective } from "./app.comment.directive";
import { AppComponent } from "./app.component";
import { HandOverDirective } from "./app.hand-over.directive";
import { NameFormat } from "./app.name-format.pipe";
import { NumberFormat } from "./app.number-format.pipe";

@NgModule({
  declarations: [
    AppComponent,
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
  bootstrap: [AppComponent]
})
export class AppModule {
}
