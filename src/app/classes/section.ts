import { Serializable } from './serializable';
import { Dish } from './dish';

export class Section extends Serializable {
    id: number;
    name: string;
    dishes: Dish[];
    position: number;
    isNew: boolean;
    isOpen: boolean;

    constructor() {
        super();
        this.id = 0;
        this.name = '';
        this.dishes = [];
        this.position = 0;
        this.isNew = true;
        this.isOpen = true;
    }
}
