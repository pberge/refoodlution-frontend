
import { Serializable } from './serializable';
import { Seasoning } from './seasoning';

export class StringTranslation extends Serializable  {
    public id: number;
    public lang: string;
    public value: string;
    public type: string;
    public originalValue: string;

    constructor() {
        super();
    }
}
