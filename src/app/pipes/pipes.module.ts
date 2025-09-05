import { TitleCaseWordPipe } from './title-case-word.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllergenMessagePipe } from './allergen-message.pipe';


@NgModule({
  declarations: [
    TitleCaseWordPipe,
    AllergenMessagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TitleCaseWordPipe,
    AllergenMessagePipe
  ]
})
export class PipesModule { }
