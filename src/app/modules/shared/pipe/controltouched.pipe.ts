import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'controltouched'
})
export class ControltouchedPipe implements PipeTransform {

  transform(isTouched: boolean | undefined, cbFn: () => void): unknown {
    if (isTouched) {
      cbFn()
    }
    return isTouched;
  }
}
