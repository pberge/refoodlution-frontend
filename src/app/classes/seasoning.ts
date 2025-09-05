import { Allergen } from './allergen';
import { Serializable } from './serializable';

export class Seasoning extends Serializable {
    public id: number;
    public name: string;
    public ingredients: string[];
    public allergens: Allergen[];

    constructor() {
        super();
        this.name = '';
        this.ingredients = [];
        this.allergens = [];
    }

    public hasAllergen(allergen: string) {
        const resu = this.allergens.find(x => x.acronym === allergen);
        return resu;
    }
}

