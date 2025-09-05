import { Allergen } from './../../../classes/allergen';
import { Component, OnInit } from '@angular/core';
import { Seasoning } from './../../../classes/seasoning';
import { SeasoningService } from './../../../services/seasoning.service';
import { faPlus, faCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seasoning-list',
  templateUrl: './seasoning-list.component.html',
  styleUrls: ['./seasoning-list.component.scss']
})
export class SeasoningListComponent implements OnInit {
  faAdd = faPlus;
  faActive = faCircle;
  faEdit = faEdit;
  faDelete = faTrash;

  seasonings: Seasoning[];

  constructor(private router: Router, private seasoningService: SeasoningService) { }

  ngOnInit() {
    this.seasoningService.getSeasonings().subscribe(seasonings => {
      this.seasonings = seasonings;
    });
  }

  onAddClick() {
    this.router.navigate(['seasoning/create']);
  }

  deleteSeasoning(seasoning: Seasoning) {
    this.seasoningService.deleteSeasoning(seasoning).subscribe(x => {
      this.seasonings = this.seasonings.filter( item => item.id !== seasoning.id);
    });
  }

  editSeasoning(seasoning: Seasoning) {
    this.router.navigate(['seasoning/edit/' + seasoning.id]);
  }

  getAllergensByName(seasoning: Seasoning) {
    const aller = [];
    seasoning.allergens.forEach(allergen => {
      aller.push(Allergen.getAllergenName(allergen.acronym));
    });

    return aller;
  }
}
