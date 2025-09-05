// menu-dies.component.ts
import { FormBuilder, FormGroup } from '@angular/forms';
import { Menu } from 'src/app/classes/menu';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-day-selector',
  templateUrl: './day-selector.component.html',
  styleUrls: ['./day-selector.component.scss']
})
export class DaySelectorComponent implements OnInit{
  @Input() selectedDays: number[] = [];
  @Output() selectedDaysChange = new EventEmitter<number[]>();

  faSave = faCheckCircle
  savedToggle = false

  weekDaysNames = [
    { id: 1, nom: 'monday' },
    { id: 2, nom: 'tuesday' },
    { id: 3, nom: 'wednesday' },
    { id: 4, nom: 'thursday' },
    { id: 5, nom: 'friday' },
    { id: 6, nom: 'saturday' },
    { id: 7, nom: 'sunday' },
  ];

  ngOnInit() {
    console.log("INIT", this.selectedDays)
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDays']) {
      console.log("selectedDays cambió:", this.selectedDays);
    }
  }

  toggleDay(dayId: number, checked: boolean) {
     if (checked) {
      this.selectedDays = [...this.selectedDays, dayId];
    } else {
      this.selectedDays = this.selectedDays.filter((d) => d !== dayId);
    }
    
    this.selectedDaysChange.emit(this.selectedDays);


    if (this.savedToggle) return;
    this.savedToggle = true

    setTimeout(() => {
      this.savedToggle = false
    }, 3600)
  }

}
