import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule , ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AddFormComponent } from "./add-form.component";


@NgModule({
  declarations: [
    AddFormComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AddFormComponent,
  ]
})
export class AddFormModule {
}
