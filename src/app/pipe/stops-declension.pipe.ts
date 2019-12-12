import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stopsDeclension'
})
export class StopsDeclensionPipe implements PipeTransform {

  transform(value: number): any {
    if (value === 0) {
      return 'без пересадок';
    } else if (value === 1) {
      return `${value} пересадка`;
    } else if (value > 1 && value < 5) {
      return `${value} пересадки`;
    } else {
      return `${value} пересадок`;
    }
  }

}
