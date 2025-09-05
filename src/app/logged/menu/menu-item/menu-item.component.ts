import { MenuService } from './../../../services/menu.service';
import { Component, OnInit, Input,  ElementRef, ViewChild  } from '@angular/core';
import { faEdit, faFilePdf, faEye, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Menu } from 'src/app/classes/menu';
import { Router } from '@angular/router';
import { ScheduleConfig } from 'src/app/classes/schedules';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @ViewChild('dishModalVisibility') dishModalVisibility: ElementRef;
  @Input() menu: Menu;
  faEdit = faEdit;
  faPdf = faFilePdf;
  faEye = faEye;
  faHelp =  faQuestion;
  selectedDays: Number[] = []
  schedules: ScheduleConfig[] = []
  showHelp:Boolean = false;

  constructor(private router: Router, private menuService: MenuService) { }

  ngOnInit() {
    console.log("MENU", this.menu)

    if(this.menu.selectedDays) {
      this.selectedDays = this.menu.selectedDays.split(",").map(d => parseInt(d, 10));
      
    }
    
    //Get schedules
    this.menuService.getMenuSchedules(this.menu.id).subscribe(
      data => {
        this.schedules = data
      },
      err => console.error(err)
    );
  }

  onEditClick() {
    switch (this.menu.style) {
      case 2:
        this.router.navigate(['menu/editpdf/' + this.menu.id]);
        break;
      default:
        this.router.navigate(['menu/edit/' + this.menu.id]);
        break;
    }
  }

  onActivateClick() {
    this.menu.active = !this.menu.active;
    this.menuService.activateMenu(this.menu).subscribe(() => { }, error => {
      this.menu.active = !this.menu.active;
    });
  }

  saveConfigVisibility() {
    this.menu.selectedDays = ""
    //Prepare data
    this.selectedDays.forEach((s, i) => {
      if(i > 0) this.menu.selectedDays += ","
      this.menu.selectedDays += s
    })

    //Save data
    this.menuService.updateMenuSelectedDays(this.menu).subscribe(() => { }, error => { });
  }

  toggleModalVisibility() {
    this.dishModalVisibility.nativeElement.classList.toggle('is-active');
  }

  closeModalVisibility(event) {
    this.dishModalVisibility.nativeElement.classList.toggle('is-active');
    event.preventDefault();
  }

  saveSchedules(schedules: ScheduleConfig[]){
    
    this.menuService.getMenuSchedules(this.menu.id).subscribe(
      data => {
        this.schedules = data
        console.log("SCHEDULES", this.schedules)
      },
      err => console.error(err)
    );
    
  }

  toggleHelp() {
    this.showHelp = !this.showHelp;
  }

}
