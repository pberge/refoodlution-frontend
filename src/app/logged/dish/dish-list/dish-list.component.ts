import { Allergen } from './../../../classes/allergen';
import { Dish } from './../../../classes/dish';
import { DishService } from './../../../services/dish.service';
import { Component, OnInit } from '@angular/core';
import { faPlus, faCircle, faEdit, faTrash, faSort } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.scss']
})
export class DishListComponent implements OnInit {

  faAdd = faPlus;
  faActive = faCircle;
  faEdit = faEdit;
  faDelete = faTrash;
  faSort = faSort;
  dishes: Dish[];
  dishesTable: Dish[]
  searchText= "";

  sortByName = false;

  constructor(private router: Router, private dishService: DishService) { }

  ngOnInit() {
    this.dishes = [];
    this.dishService.getDishes().subscribe(dishes => {
      this.dishes = dishes;
      this.dishesTable = dishes
    });
  }

  onAddClick() {
    this.router.navigate(['dish/create']);
  }

  deleteDish(dish: Dish) {
    this.dishService.deleteDish(dish).subscribe(x => {
      this.dishes = this.dishes.filter( item => item.id !== dish.id);
    });
  }

  editDish(dish: Dish) {
    this.router.navigate(['dish/edit/' + dish.id]);
  }

  getAllergensByName(dish: Dish) {
    const aller = [];
    dish.allergens.forEach(allergen => {
      aller.push('allergens.' + allergen.acronym);
    });

    return aller;
  }


  sortDishes() {
    this.sortByName = !this.sortByName;

    if (this.sortByName) {
      this.dishesTable = this.dishes.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 :
      ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0));
    } else {
      this.dishesTable = this.dishes.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
    }
  }

  /*showSearchResults() {
    this.dishesTable = this.dishes.filter(d => d.name.toLowerCase().includes(this.searchText.toLowerCase()) || this.searchText == null)

    console.log("DISHES", this.dishes)
    console.log("TEXT", this.searchText)
  }*/

  showSearchResults() {
    this.dishesTable = this.dishes.filter(dish => {
      if (!this.searchText) return true;

      const queryWords = this.searchText.toLowerCase().split(/\s+/); // separa por espacios

      const textToSearch = `${dish.name || ''} ${dish.description || ''}`.toLowerCase();

      return queryWords.every(word => textToSearch.includes(word));
    });


  }
}
