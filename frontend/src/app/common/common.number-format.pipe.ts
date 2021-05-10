import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "format_number"
})

export class NumberFormat implements PipeTransform {
  transform (value: number): string {
    return value.toString().replace(".", ",");
  }
}
