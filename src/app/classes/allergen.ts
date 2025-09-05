import { Serializable } from './serializable';

export class Allergen extends Serializable {
    public acronym: string;
    public message: number;

    constructor(acronym) {
        super();
        this.acronym = acronym;
        this.message = 0;
    }

    public static getMessage(allergen) {
        switch (allergen.message) {
            case 0:
                return 'm_0';
            case 1:
                return 'm_1';
            case 2:
                return 'm_2';
            case 3:
                return 'm_3';
            default:
                return 'message';
        }
    }

    public static getAllergenName(acronym) {
        switch (acronym) {
          case 'NL': return 'Altramuces';
          case 'BC': return 'Apio';
          case 'AP': return 'Cacahuetes';
          case 'AC': return 'Crustáceos';
          case 'AN': return 'Frutos secos';
          case 'AW': return 'Gluten';
          case 'AE': return 'Huevo';
          case 'AM': return 'Lácteos';
          case 'ML': return 'Lactosa';
          case 'UM': return 'Moluscos';
          case 'BM': return 'Mostaza';
          case 'AF': return 'Pescado';
          case 'AS': return 'Sésamo';
          case 'AY': return 'Soja';
          case 'AU': return 'Sulfitos';
        }
      }
}
