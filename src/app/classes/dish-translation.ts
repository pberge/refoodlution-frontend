import { Serializable } from './serializable';
import { Seasoning } from './seasoning';

export class DishTranslation extends Serializable {
    public id: number;
    public lang: string;
    public name: string;
    public description: string;
    public priceTitle: string;
    public priceTitle2: string;
    public priceTitle3: string;
    public originalName: string;
    public originalDescription: string;
    public originalPriceTitle: string;
    public originalPriceTitle2: string;
    public originalPriceTitle3: string;

    constructor() {
        super();
        this.name = '';
        this.description = '';
        this.priceTitle = '';
        this.priceTitle2 = '';
        this.originalPriceTitle = '';
        this.originalPriceTitle2 = '';
        this.originalPriceTitle3 = '';
    }
}
