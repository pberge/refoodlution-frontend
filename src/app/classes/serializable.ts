
export class Serializable {

    fromJSON(json) {
        for (const propname in json) {
            if (json.hasOwnProperty(propname)) {
                this[propname] = json[propname];
            }
        }
        return this;
    }
}
