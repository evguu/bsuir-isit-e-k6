export class ColumnDescription {
    constructor(name, prop, type) {
        this.name = name;
        this.prop = prop;
        this.type = type;

        const propParts = prop.split('.');
        this.getter = e => {
            let value = e;
            for (const propPart of propParts) {
                value = value[propPart];
            }
            return value;
        }
    }
}