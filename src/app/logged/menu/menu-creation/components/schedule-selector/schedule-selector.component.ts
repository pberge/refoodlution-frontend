import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faSave, faExclamationTriangle, faPlus, faTrash, faAngleDown, faCheck, faTimesCircle, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ScheduleConfig } from 'src/app/classes/schedules';
import { MenuService } from 'src/app/services/menu.service';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-schedule-selector',
  templateUrl: './schedule-selector.component.html',
  styleUrls: ['./schedule-selector.component.scss']
})
export class ScheduleSelectorComponent {
  @Input() menuId
  @Input() schedules: ScheduleConfig[] = []
  @Output() schedulesChange = new EventEmitter<ScheduleConfig[]>();

  weekDaysNames = [
    { id: 1, nom: 'monday' },
    { id: 2, nom: 'tuesday' },
    { id: 3, nom: 'wednesday' },
    { id: 4, nom: 'thursday' },
    { id: 5, nom: 'friday' },
    { id: 6, nom: 'saturday' },
    { id: 7, nom: 'sunday' },
  ];

  faDelete = faTrash;
  faPlus = faPlus;

  newScheduleDay: number = 1;
  newScheduleStart: string = '08:00';
  newScheduleEnd: string = '14:00';
  
  faSave = faCheckCircle
  savedToggle = false

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.loadSchedules();
  }

  loadSchedules() {
    this.menuService.getMenuSchedules(this.menuId).subscribe(
      data => {
        this.schedules = data
      },
      err => console.error(err)
    );
  }

  addNewSchedule() {
    const newSchedule: ScheduleConfig = {
        day: this.newScheduleDay,
        start_time: this.newScheduleStart,
        end_time: this.newScheduleEnd
    };

    // Validar campos
    if (!newSchedule.start_time || !newSchedule.end_time) {
      alert('Has de posar hora d’inici i fi');
      return;
    }

    if (newSchedule.start_time >= newSchedule.end_time) {
      alert('L’hora d’inici ha de ser anterior a l’hora de fi');
      return;
    }

    // Comprovar solapaments
    const overlap = this.schedules.some(s => 
      s.day === newSchedule.day &&
      !(s.end_time <= newSchedule.start_time || s.start_time >= newSchedule.end_time)
    );
    if (overlap) {
      alert('Aquest horari es solapa amb un ja existent');
      return;
    }

    // Opcional: reset dels camps per afegir un altre horari ràpidament
    this.newScheduleDay = 1;
    this.newScheduleStart = '08:00';
    this.newScheduleEnd = '14:00';

    this.addSchedule(newSchedule)
  }

  addSchedule(newSchedule: ScheduleConfig) {
    this.schedules.push(newSchedule);

    // ordenar por día y hora de inicio
    this.schedules.sort((a, b) => {
      if (a.day !== b.day) {
        return a.day - b.day;
      }
      return a.start_time.localeCompare(b.start_time);
    });

    
    const index = this.schedules.findIndex((s: ScheduleConfig) => 
      s.day === newSchedule.day && s.start_time === newSchedule.start_time
    );

    console.log("UNDEX", index)

    this.saveSchedules(index);

    this.schedulesChange.emit(this.schedules)

  }

  updateSchedule(index: number, updated: ScheduleConfig) {
    this.schedules[index] = updated;
    this.updateSaveSchedule(index);

    
  }

  deleteSchedule(index: number, deleted: ScheduleConfig) {
    var schedule = deleted;
    console.log(schedule, this.schedules[index])
    if(!schedule.id) {
      schedule = this.schedules[index]
    }

    this.menuService.deleteMenuSchedule(schedule.id).subscribe(() => {
      this.schedules.splice(index, 1);
    });

    this.schedulesChange.emit(this.schedules)

    if (this.savedToggle) return;
    this.savedToggle = true

    setTimeout(() => {
      this.savedToggle = false
    }, 3600)
  }

  private saveSchedules(index:number) {
    this.menuService.saveMenuSchedules(this.menuId, this.schedules[index]).subscribe({
      next: (res) => {
        this.schedules[index].id = res.schedule.id

        if (this.savedToggle) return;
        this.savedToggle = true

        setTimeout(() => {
          this.savedToggle = false
        }, 3600)
      },
      error: err => console.error('Error guardando horarios', err)
    });
  }

  private updateSaveSchedule(index: number) {
    const schedule = this.schedules[index];
    this.menuService.updateMenuSchedule(schedule.id, schedule).subscribe({
      next: () => {
        if (this.savedToggle) return;
        this.savedToggle = true

        setTimeout(() => {
          this.savedToggle = false
        }, 3600)
      },
      error: err => console.error('Error guardando horarios', err)
    });
  }


  getDayName(dayId: number): string {
    return this.weekDaysNames.find(d => d.id === Number(dayId))?.nom ?? '';
  }
}
