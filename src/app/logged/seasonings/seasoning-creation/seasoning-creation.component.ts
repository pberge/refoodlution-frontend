import { Allergen } from './../../../classes/allergen';
import { Component, OnInit } from '@angular/core';
import { Seasoning } from './../../../classes/seasoning';
import { SeasoningService } from './../../../services/seasoning.service';
import { faSave, faExclamationTriangle, faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seasoning-creation',
  templateUrl: './seasoning-creation.component.html',
  styleUrls: ['./seasoning-creation.component.scss']
})
export class SeasoningCreationComponent implements OnInit {

  constructor(private seasoningService: SeasoningService, private route: ActivatedRoute, private router: Router) { }
  faSave = faSave;
  faWarning = faExclamationTriangle;
  faCheck = faCheck;
  isSaving = false;
  isEditing = false;
  faCross = faTimesCircle;

  seasoning: Seasoning;
  result = { message: '', status: 'hidden' };

  allergens = [
    'NL',
    'BC',
    'AP',
    'AC',
    'AN',
    'AW',
    'AE',
    'AM',
    'ML',
    'UM',
    'BM',
    'AF',
    'AS',
    'AY',
    'AU'
  ];

  ngOnInit() {
    this.seasoning = new Seasoning();
    this.isEditing = false;
    this.route.url.subscribe(params => {
      if (params[1].path === 'edit') {
        // tslint:disable-next-line: new-parens
        this.seasoningService.getSeasoning(this.route.snapshot.paramMap.get('id'))
          .subscribe(
            seasoning => this.seasoning = (new Seasoning()).fromJSON(seasoning),
            error => this.router.navigate(['seasoning'])
          );
        this.isEditing = true;
      }
    });
  }

  onSaveClick() {
    if (this.seasoning.name.length === 0) {
      this.result.message = 'Se necesita un nombre de plato';
      this.result.status = 'danger';
    } else {
      if (!this.isEditing) {
        this.seasoningService.addSeasoning(this.seasoning).subscribe(() => {
          this.result.message = 'Condimento creado correctamente.';
          this.result.status = 'success';
          this.isSaving = false;
          setTimeout(() => this.router.navigate(['seasoning']), 2000);
        },
        error => {
          this.result.message = 'Ha habido un error al guardar los datos';
          this.result.status = 'danger';
          this.isSaving = false;
        });
      } else {
        this.seasoningService.updateSeasoning(this.seasoning).subscribe(() => {
          this.result.message = 'Plato modificado correctamente.';
          this.result.status = 'success';
          setTimeout(() => this.result.status = 'hidden', 2000);
        }, error => {
          this.result.message = 'Ha habido un error al guardar los datos';
          this.result.status = 'danger';
          this.isSaving = false;
        });
      }
    }
  }

  onCardClick(allergenAcr) {
    const allergen = new Allergen(allergenAcr);
    if (this.seasoning.hasAllergen(allergen.acronym)) {
      this.seasoning.allergens.splice(this.seasoning.allergens.map((all) => all.acronym).indexOf(allergen.acronym), 1);
    } else {
      this.seasoning.allergens.push(allergen);
    }
  }

  deleteIngredient(ingredient) {
    this.seasoning.ingredients.splice(this.seasoning.ingredients.indexOf(ingredient), 1);
  }

  onEnterInput(ingredient) {
    if (ingredient.trim().length !== 0) {
      this.seasoning.ingredients.push(ingredient.trim());
    }
  }

  onCommaPressInput(event, input) {
    if (event.keyCode === 44) {
      this.onEnterInput(input.value);
      input.value = '';
      event.preventDefault();
    }
  }

  getAllergenName(acronym) {
    return Allergen.getAllergenName(acronym);
  }


}
