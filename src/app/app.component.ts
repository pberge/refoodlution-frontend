import { Component } from '@angular/core';
import ClassicEditor from '../scripts/ckeditor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Refoodlution';

  public Editor = ClassicEditor
}
