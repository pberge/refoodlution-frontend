import { TranslocoService } from '@ngneat/transloco';
import { LoggedModule } from './../../logged.module';
import { Menu } from './../../../classes/menu';
import { MenuService } from './../../../services/menu.service';
import { Section } from './../../../classes/section';
import { Dish } from './../../../classes/dish';
import { DishService } from './../../../services/dish.service';
import { Component, OnInit, ChangeDetectorRef, ViewChildren, QueryList, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { faPlus, faSave, faTrash, faSortUp, faSortDown, faArrowsAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { moveItemInArray, CdkDragDrop,  CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { FaLayersTextBaseComponent } from '@fortawesome/angular-fontawesome/layers/layers-text-base.component';
import { menuStyle } from 'src/app/classes/menuStyle.enum';
import { DaySelectorComponent } from './components/day-selector/day-selector.component'

@Component({
  selector: 'app-menu-creation',
  templateUrl: './menu-creation.component.html',
  styleUrls: ['./menu-creation.component.scss']
})
export class MenuCreationComponent implements OnInit {
   @ViewChildren('input') inputs: QueryList<ElementRef>;
   @ViewChild('dishModal') dishModal: ElementRef;
   @ViewChild('dishModalVisibility') dishModalVisibility: ElementRef;

  menu: Menu;

  dishes: Dish[] = [];
  dishesTable: Dish[] = [];


  sectionNameEditing = [];

  constructor(private dishService: DishService, private menuService: MenuService, private router: Router, private route: ActivatedRoute,
              private cdr: ChangeDetectorRef, private translocoService: TranslocoService) { }
  faAdd = faPlus;
  faSave = faSave;
  faDelete = faTrash;
  faUp = faSortUp;
  faDown = faSortDown;
  faSort = faArrowsAlt;
  faEdit = faEdit;

  sortByName = false;

  isEditing = false;
  isSaving = false;
  isDeleting = false;

  deleteModal = false;

  errorMessage = '';
  searchDishText = ""

  temporalSection = new Section();

  ngOnInit() {
    this.menu = new Menu();
    this.isEditing = false;
    this.route.url.subscribe(params => {
      if (params[1].path === 'edit') {

        // tslint:disable-next-line: new-parens
        this.menuService.getMenu(this.route.snapshot.paramMap.get('id')).subscribe(menu => { 
          this.menu = (new Menu).fromJSON(menu);
          if (this.menu.style === menuStyle.Pdf) {
            this.router.navigate(['menu/editpdf/' + this.menu.id]);
          }
        },
        error => this.router.navigate(['menu']));
        this.isEditing = true;
      } else {
        this.addSection();
      }
    });

    this.dishService.getDishes().subscribe(dishes => {
        this.dishes = dishes
        this.dishesTable = dishes
    });
  }


  // Afegeix una nova secció
  addSection() {
    const maxId = Math.max.apply(Math, this.menu.sections.map((o) => o.id));
    const section = new Section();
    section.id = maxId <= 0 ? 1 : maxId + 1;
    this.menu.sections.push(section);
    this.sectionNameEditing[section.id] = true;
  }

  // Guardem els canvis de la secció.
  onSaveClick() {
    this.isSaving = true;
    // Si ens han entrat la info bàsica.
    if (this.menu.name !== '' && this.menu.sections.length > 0) {
      // per cada secció, n'assignem la seva posició.
      let index = 1;
      this.menu.sections.forEach(section => {
        section.position = index;
        index++;

        // Per cada plat, assignem la posició.
        let dishIndex = 1;
        section.dishes.forEach( dish => {
          dish.position = dishIndex;
          dishIndex++;
        });
      });

      if (!this.isEditing) {
        this.menuService.addMenu(this.menu).subscribe(result => {
          this.isSaving = false;
          this.router.navigate(['menu']);
        });
      } else {
        this.menuService.updateMenu(this.menu).subscribe(result => {
          this.isSaving = false;
          this.router.navigate(['menu']);
        });
      }
    } else {
      this.errorMessage = this.translocoService.translate('error.menuRequired');
      this.isSaving = false;
    }
  }

  // Ensenya o amaga el modal. També crea la còpia de l'objecte secció que volem editar.
  toggleModal(section) {
    this.dishModal.nativeElement.classList.toggle('is-active');
    this.searchDishText = ""
    this.dishesTable = this.dishes
    
    if (section !== undefined) {
      this.temporalSection = JSON.parse(JSON.stringify(this.menu.sections.find(foundSection => foundSection.id === section.id)));
    }
  }

  closeModal(event) {
    this.dishModal.nativeElement.classList.toggle('is-active');
    event.preventDefault();
  }

  

  // Elimina el plat seleccionat.
  deleteDish(idSection, dishId) {
    const editedSection = this.menu.sections.find(section => section.id === idSection);
    editedSection.dishes = editedSection.dishes.filter((dish) => dish.id !== dishId);
    this.updatePosition(editedSection.dishes);
  }

  // Elimina la secció seleccionada.
  deleteSection(section) {
    this.sectionNameEditing[section.id] = false;
    this.menu.sections = this.menu.sections.filter((item) => item.id !== section.id);
  }

  // Per cada click a plat, actualitza l'array de plats de la secció temporal.
  updateDishes(dishId, event) {
    if (event.target.checked) {
      const addedDish = this.dishes.find(dish => dish.id === dishId);
      this.temporalSection.dishes.push(addedDish);
    } else {
      this.temporalSection.dishes = this.temporalSection.dishes.filter((dish) => dish.id !== dishId);
    }
  }

  // Aplica la seccio temporal a la permanent per guardar la selecció de plats de l'usuari.
  saveDishes() {
    const updatedSection = this.menu.sections.find((sect) => sect.id === this.temporalSection.id);
    this.updatePosition(this.temporalSection.dishes);
    updatedSection.dishes = this.temporalSection.dishes;
    this.dishModal.nativeElement.classList.toggle('is-active');
  }

  // Comprova si un plat esta en aquella secció.
  isContained(dish) {
    return this.temporalSection.dishes.find((dis) => dis.id === dish.id);
  }

  dishClick(dish) {
    if (this.temporalSection.dishes.find((di) => di.id === dish.id)) {
      this.temporalSection.dishes = this.temporalSection.dishes.filter((di) => di.id !== dish.id);
    } else {
      this.temporalSection.dishes.push(dish);
    }
  }

  updatePosition(dishes: Dish[]) {
    dishes.forEach((dish, index) => {
      dish.position = index + 1;
    });
  }

  onDrop(event: CdkDragDrop<string[]>, section) {
    // Movem els items de l'array.
    moveItemInArray(section.dishes, event.previousIndex, event.currentIndex);
  }

  onSectionDrop(event: CdkDragDrop<string[]>, menu) {
    // Movem els items de l'array.
    moveItemInArray(menu.sections, event.previousIndex, event.currentIndex);
  }

  onNameEditClick(section) {
    this.sectionNameEditing[section.id] = true;
    this.inputs.changes.subscribe(() => {
      this.inputs.toArray()[0].nativeElement.focus();
    });
  }

  sectionNameEditFinished(section) {
    if (section.name.trim().length > 0) {
      this.sectionNameEditing[section.id] = false;
    }
  }

  sectionNameIsEditing(section) {
    return (section.name.length === 0 || this.sectionNameEditing[section.id]);
  }

  isUndeclared() {
    return this.menu.allergenUndeclared;
  }

  onUndeclaredClick(event) {
    this.menu.allergenUndeclared = event.target.checked;
  }

  onDeleteMenuClick() {
    this.deleteModal = true;
  }

  onModalDeleteClick() {
    this.deleteModal = false;
    this.isDeleting = true;
    this.menuService.deleteMenu(this.menu).subscribe((result) => {
      this.isDeleting = false;
      this.errorMessage = '';
      this.router.navigate(['menu']);
      // setTimeout(() => this.router.navigate(['menu']), 2000);
    }, (error) => {
      this.isDeleting = false;
      this.errorMessage = this.translocoService.translate('error.menuDeleted');
    });
  }

  sortDishes() {
    this.sortByName = !this.sortByName;

    if (this.sortByName) {
      this.dishes = this.dishes.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 :
      ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0));
    } else {
      this.dishes = this.dishes.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
    }
  }

  showSearchResults() {
    this.dishesTable = this.dishes.filter(d => d.name.includes(this.searchDishText) || this.searchDishText == null)

    console.log("DISHES", this.dishes)
    console.log("TEXT", this.searchDishText)
  }
}
