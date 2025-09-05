import { TranslocoService } from '@ngneat/transloco';
import { Contains } from './../../../classes/contains.enum';
import { Allergen } from './../../../classes/allergen';
import { SeasoningService } from './../../../services/seasoning.service';
import { Seasoning } from './../../../classes/seasoning';
import { Dish } from './../../../classes/dish';
import { DishService } from './../../../services/dish.service';
import { faSave, faExclamationTriangle, faPlus, faTrash, faAngleDown, faCheck, faTimesCircle, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from './../../../../scripts/ckeditor.js';

@Component({
  selector: 'app-dish-creation',
  templateUrl: './dish-creation.component.html',
  styleUrls: ['./dish-creation.component.scss']
})
export class DishCreationComponent implements OnInit {

  constructor(
    private dishService: DishService, private seasoningService: SeasoningService,
    private route: ActivatedRoute, private router: Router, private translocoService: TranslocoService
  ) { }

  @ViewChild('seasoningModal') modal: ElementRef;
  @ViewChild('editor') editor: any;

  faSave = faSave;
  faWarning = faExclamationTriangle;
  faAdd = faPlus;
  faDelete = faTrash;
  faAngleDown = faAngleDown;
  faCheck = faCheck;
  faCross = faTimesCircle;
  faUpload = faUpload;

  isClicked = [];
  result = { message: '', status: 'hidden' };

  isSaving = false;
  isEditing = false;
  canSave = true;

  seasonings: Seasoning[] = [];

  dish: Dish;

  img = undefined;
  imageUploading = false;
  selectedFile: File;

  /* Per la preview del plat */
  messages: any[] = [];

  dangerEnum = Contains.Danger;
  activators = [];

  alert = Contains.Danger;
  /* Fi preview  */

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

  currencies = ['€', '$', 'S/', '£'];

  MainEditor: any

  ngOnInit() {
    this.dish = new Dish();
    this.dish.currency = localStorage.getItem('currency');
    this.isEditing = false;
    this.route.url.subscribe(params => {
      if (params[1].path === 'edit') {
        // tslint:disable-next-line: new-parens
        this.dishService.getDish(this.route.snapshot.paramMap.get('id'))
          .subscribe(
            dish => {
              this.dish = (new Dish()).fromJSON(dish);
              this.downloadImage();
              this.updateAlert();

              // this.dishService.getSeasoningsFromDish(dish).subscribe(result => this.dish.seasonings = result);
              if(this.dish.description) {
                this.MainEditor.setData(this.dish.description)
              }
            },
            error => this.router.navigate(['dish'])
          );
        this.isEditing = true;
      }
    });
    // this.seasoningService.getSeasonings().subscribe(seas => this.seasonings = seas);
  }

  ngAfterViewInit() {
    //init ckeditor
    console.log(this.dish.description)
    ClassicEditor.create( this.editor.nativeElement)
    .then( editor => {
      console.log(editor)
      this.MainEditor = editor
    })
  }

  onSaveClick() {
    console.log(this.MainEditor.getData())
    this.dish.description = this.MainEditor.getData()
    this.dish.name = this.dish.name.trim();
    // Comprovem les condicions a evitar
    if (this.dish.name.length === 0) {
      this.result.message = this.translocoService.translate('error.dishName');
      this.result.status = 'danger';
    } else if (this.dish.allergenDeclared === true && this.dish.allergenFree === false && this.dish.allergens.length === 0) {
      this.result.message = this.translocoService.translate('error.allergenDeclaration');
      this.result.status = 'danger';
    } else {

      this.isSaving = true;

      if (!this.isEditing && this.canSave) {
        this.dishService.addDish(this.dish).subscribe((dishid) => {
          this.result.message = this.translocoService.translate('result.dishSaved');
          this.result.status = 'success';
          this.isSaving = false;
          this.canSave = false;

          if (this.selectedFile !== undefined) {
            this.dishService.postImage(this.selectedFile, dishid).subscribe(() => {
              setTimeout(() => this.router.navigate(['dish']), 2000);
            });
          } else {
            setTimeout(() => this.router.navigate(['dish']), 2000);
          }
        },
          error => {
            this.result.message = this.translocoService.translate('error.unsaved');
            this.result.status = 'danger';
            this.isSaving = false;
          });
      } else if (this.isEditing) {
        this.dishService.updateDish(this.dish).subscribe(() => {
          this.isSaving = false;
          this.result.message = this.translocoService.translate('result.dishEdited');
          this.result.status = 'success';
          setTimeout(() => this.result.status = 'hidden', 2000);
        }, error => {
          this.result.message = this.translocoService.translate('error.unsaved');
          this.result.status = 'danger';
          this.isSaving = false;
        });
      } else {
        this.isSaving = false;
      }
    }


  }

  onCardClick(allergenAcr) {
    this.dish.allergenFree = false;
    const allergen = new Allergen(allergenAcr);
    if (this.dish.hasAllergen(allergen.acronym)) {
      // cal fer el map pq es comprovi entre la clau de l'objecte.
      this.dish.allergens.splice(this.dish.allergens.map((all) => all.acronym).indexOf(allergen.acronym), 1);
    } else {
      this.dish.allergens.push(allergen);
    }
    this.updateAlert();
  }

  onNoAllergenClick() {
    this.dish.allergens = [];
    this.dish.allergenDeclared = true;
    // Si esta undefined és com si no estigues apretat, pel que si apreten és pq es allergen free.
    if (this.dish.allergenFree === undefined) {
      this.dish.allergenFree = true;
    } else {
      this.dish.allergenFree = !this.dish.allergenFree;
    }
  }

  onPrice2Click() {
    if (this.dish.variablePrices === undefined) {
      this.dish.variablePrices = false;
    } else {
      this.dish.variablePrices = !this.dish.variablePrices;
    }
  }

  onPrice3Click() {
    if (this.dish.thirdPrice === undefined) {
      this.dish.thirdPrice = false;
    } else {
      this.dish.thirdPrice = !this.dish.thirdPrice;
    }
  }

  onNoDeclarationClick() {
    this.dish.allergens = [];
    this.dish.allergenFree = false;
    // Si declared esta a undefined vol dir que no ens ho han definit,
    // pel que el primer click serà per indicar que no es volen declarar alèrgens.
    if (this.dish.allergenDeclared === undefined) {
      this.dish.allergenDeclared = false;
    } else {
      this.dish.allergenDeclared = !this.dish.allergenDeclared;
    }
  }

  isDeclarationEnabled() {
    return this.dish.allergenDeclared;
  }

  isPrice2Enabled() {
    return this.dish.variablePrices ;
  }


  toggleModal(event) {
    this.modal.nativeElement.classList.toggle('is-active');
    if (event !== undefined) {
      event.preventDefault();
    }
  }

  // Aplica la seccio temporal a la permanent per guardar la selecció de plats de l'usuari.
  saveModal() {
    this.modal.nativeElement.classList.toggle('is-active');
    let temp = [...this.dish.allergens];

    this.dish.seasonings.forEach(seas => {
      temp = [...temp, ...seas.allergens];
    });
    this.dish.allergens = this.removeDuplicates(temp, 'acronym');
    this.updateAlert();
  }

  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  seasoningClick(season) {
    if (this.dish.seasonings.find((seas) => seas.id === season.id)) {
      this.dish.seasonings = this.dish.seasonings.filter((seas) => seas.id !== season.id);
    } else {
      this.dish.seasonings.push(season);
    }
  }

  deleteSeasoning(seasoning) {
    // Elimina el condimento seleccionat.
    this.dish.seasonings = this.dish.seasonings.filter((seas) => seas.id !== seasoning.id);
  }

  // Comprova si un plat esta en aquella secció.
  isContained(seasoning) {
    return this.dish.seasonings.find((seas) => seas.id === seasoning.id);
  }

  updateAlert() {
    this.alert = Contains.Danger;
    this.messages = [];
    this.activators = [];

    this.dish.allergens.forEach(allergen => {
      if (allergen.message !== 0) {
        this.alert = Contains.Warning;
        this.messages.push({ allergen: 'allergens.' + allergen.acronym, message: 'dish.' + Allergen.getMessage(allergen) });
      } else {
        this.activators.push('allergens.' + allergen.acronym);
      }
    });
  }

  updateImage() {
    const baseUrl = '/assets/';
    switch (this.alert) {
      case Contains.Danger:
        return baseUrl + 'danger.png';
      case Contains.Warning:
        return baseUrl + 'warning.png';
      case Contains.Free:
        return baseUrl + 'success.png';
    }
  }

  checkPrice() {
    const preu = this.dish.price.toString().replace(',', '.');
    if (isNaN(Number(preu)) || preu.length === 0) {
      this.dish.price = 0;
    }
  }

  checkPrice2() {
    const preu = this.dish.price2.toString().replace(',', '.');
    if (isNaN(Number(preu)) || preu.length === 0) {
      this.dish.price2 = 0;
    }
  }

  checkPrice3() {
    const preu = this.dish.price3.toString().replace(',', '.');
    if (isNaN(Number(preu)) || preu.length === 0) {
      this.dish.price3 = 0;
    }
  }


  setDefaultCurrency(value) {
    console.log(value)
    if (value !== localStorage.getItem('currency')) {
      localStorage.setItem('currency', value);
    }
  }

  getImage() {
    if (this.img !== undefined) {
      return this.img;
    }
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile.type.match(/image\/*/) == null) {
      this.result.message = 'Solo se pueden subir imágenes';
      this.result.status = 'danger';
      return;
    }

    if (this.isEditing) {
      this.imageUploading = true;
      this.dishService.postImage(this.selectedFile, this.dish.id).subscribe(() => {
        this.downloadImage();
        this.imageUploading = false;
      },
        (error) => {
          this.imageUploading = false;
        });
    } else {
      var reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (_event) => {
        this.img = reader.result;
      }
    }
  }


  onDeleteImage() {
    if (this.isEditing) {
      this.dishService.deleteImage(this.dish.id).subscribe((result) => {
        this.img = undefined;
        this.selectedFile = undefined;
        this.dish.photo = false;
        this.downloadImage();
      })
    } else {
      this.selectedFile = undefined;
      this.img = undefined;
    }
  }

  downloadImage() {
    this.dishService.getImage(this.dish.id).subscribe(result => {
      console.log(result.type)
      if (result.type == 'application/json') {
        this.img = undefined;
      } else {
        this.createImageFromBlob(result);
        this.dish.photo = true;
      }
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.img = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  dishHasPhoto() {
    return this.dish.photo;
  }
}
