import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stopsDeclension'
})
export class StopsDeclensionPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
