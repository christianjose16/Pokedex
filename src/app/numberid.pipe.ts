import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberId'
})
export class NumberIdPipe implements PipeTransform {
  transform(value: number): string {
    return `#${value.toString().padStart(3, '0')}`;
  }
}