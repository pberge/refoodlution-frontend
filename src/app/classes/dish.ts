import { Allergen } from './allergen';
import { Serializable } from './serializable';
import { Seasoning } from './seasoning';

export class Dish extends Serializable {
    public id: number;
    public name: string;
    public description: string;
    public allergens: Allergen[];
    public allergenFree: boolean;
    public allergenDeclared: boolean;
    public price: number;
    public price2: number;
    public price3: number;
    public seasonings: Seasoning[];
    public position: number;
    public currency: string;
    public photo: boolean;
    public variablePrices: boolean;
    public thirdPrice: boolean;
    public priceTitle1: string;
    public priceTitle2: string;
    public priceTitle3: string;

    constructor() {
        super();
        this.name = '';
        this.allergens = [];
        this.seasonings = [];
        this.price = 0;
        this.price2 = 0;
        this.price3 = 0;
        this.description = '';
        this.position = 0;
        this.allergenFree = false;
        this.allergenDeclared = true;
        this.currency = '€';
        this.photo = false;
        this.variablePrices = false;
        this.thirdPrice = false
        this.priceTitle1 = ''
        this.priceTitle2 = ''
        this.priceTitle3 = ''
    }

    public hasAllergen(allergen: string): boolean {
        const resu = this.allergens.find(x => x.acronym === allergen);
        return resu !== undefined;
    }
}

