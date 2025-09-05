import { menuStyle } from './menuStyle.enum';
import { Section } from './section';
import { Serializable } from './serializable';
import { Dish } from './dish';
import { ScheduleConfig } from './schedules';

export class Menu extends Serializable {
    id: number;
    name: string;
    sections: Section[];
    active: boolean;
    time: string; // temporal mentre no existeix la configuració de l'horari.
    allergenUndeclared: boolean;
    style: menuStyle;
    position: number;
    selectedDays: string;
    schedules?: ScheduleConfig[]; 

    constructor() {
        super();
        this.id = 0;
        this.name = '';
        this.sections = [];
        this.active = false;
        this.allergenUndeclared = false;
        this.style = menuStyle.Default;
        this.position = 0;
        this.selectedDays = '';
        this.schedules = []
    }

}


