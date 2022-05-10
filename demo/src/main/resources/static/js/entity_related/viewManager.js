export class ViewManager {
    static operations = [
        {
            name: "больше",
            applier: (p, v) => `${p.prop} > ${enquote(p,v)}`,
        },
        {
            name: "меньше",
            applier: (p, v) => `${p.prop} < ${enquote(p,v)}`,
        },
        {
            name: "равно",
            applier: (p, v) => `${p.prop} : ${enquote(p,v)}`,
        },
        {
            name: "больше или равно",
            applier: (p, v) => `${p.prop} >: ${enquote(p,v)}`,
        },
        {
            name: "меньше или равно",
            applier: (p, v) => `${p.prop} <: ${enquote(p,v)}`,
        },
        {
            name: "не равно",
            applier: (p, v) => `${p.prop} ! ${enquote(p,v)}`,
        },
        {
            name: "содержит",
            applier: (p, v) => `${p.prop} ~ ${enquote(p,"%"+ v + "%")}`,
        },
    ];

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.sorts = [];
        this.filters = [];
        this.page = 0;
        this.limit = 20;
    }

    static zeroInstance = new ViewManager();

    cloneInto(into) {
        into.sorts = [...this.sorts];
        into.filters = [...this.filters];
        into.page = this.page;
        into.limit = this.limit;
    }

    reset() {
        ViewManager.zeroInstance.cloneInto(this);
    }

    composeUrl(getAll = false){
        // String filters require to be enclosed in quotes
        // Number filters don't need to be enclosed in quotes

        let filters = this.filters
            .map(e => encodeURIComponent(e.op.applier(e.src, e.val)))
            .join(" AND ");

        let sorts = this.sorts.map(e => "sort="+e.prop+","+e.dir).join("&");

        let result = this.baseUrl;
        if (sorts.length)
            result += `&${sorts}`;
        if (filters.length)
            result += `&filter=${filters}`;

        if (!getAll) {
            result += "&page=" + this.page + "&size=" + this.limit;
        }
        else {
            result += "&page=0&size=100000";
        }
        console.log(result);
        return result;
    }
}

Object.freeze(ViewManager.operations);

function enquote(columnDescription, value) {
    return columnDescription.type === "string" ? `'${value}'` : value;
}