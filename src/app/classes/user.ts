import { Serializable } from './serializable';


export class User extends Serializable {

    public email: string;
    public password: string;

    constructor()  {
        super();
    }
}
