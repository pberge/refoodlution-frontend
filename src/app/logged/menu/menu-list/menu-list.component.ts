import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Menu } from 'src/app/classes/menu';
import { MenuService } from './../../../services/menu.service';
import { Component, OnInit } from '@angular/core';
import { faPlus, faEdit, faFilePdf, faBookOpen, faSave, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  faAdd = faPlus;
  faFilePdf = faFilePdf;
  faMenu = faBookOpen;
  faSort = faArrowsAlt;
  faSave = faSave;
  menuTypeModal = false;
  isSorting = false;

  constructor(private router: Router, private menuService: MenuService) { }

  menus: Menu[] = [];

  ngOnInit() {
    this.menuService.getMenus().subscribe( menus => this.menus = menus);
  }

  onCreateClick() {
    this.menuTypeModal = true;
  }

  onCreateNormalClick() {
    this.router.navigate(['menu/create']);
  }

  onCreatePdfClick() {
    this.menuService.addPdfMenu().subscribe((menu) => {
      this.router.navigate(['menu/editpdf/' + menu.id]);
    });
  }

  onDrop(event: CdkDragDrop<string[]>) {
    // Movem els items de l'array.
    moveItemInArray(this.menus, event.previousIndex, event.currentIndex);
  }


  onSortClick() {
    if (this.isSorting) {
      this.menus.forEach( (menu, index) => {
        menu.position = index;
      })

      this.menuService.updatePositions(this.menus).subscribe(() => {
        this.isSorting = false;
      });
    } else {
      this.isSorting = true;
    }
  }

}
