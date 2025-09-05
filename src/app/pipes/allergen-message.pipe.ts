import { Allergen } from './../classes/allergen';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'allergenMessage',
  pure: false
})
export class AllergenMessagePipe implements PipeTransform {

  transform(messageId: number): string {
    return Allergen.getMessage(messageId);
  }

}
