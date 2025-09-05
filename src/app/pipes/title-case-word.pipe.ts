import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCaseWord'
})
export class TitleCaseWordPipe implements PipeTransform {

  transform(message: string): string {
    if (!message) { return message; }
    return message[0].toUpperCase() + message.substr(1).toLowerCase();
  }

}
