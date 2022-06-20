import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutStrings'
})
export class CutStringsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
