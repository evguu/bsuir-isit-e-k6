export class ViewManager {
    // If this changes at runtime, we're doomed
    // TODO: freeze this
    static operations = [
        {
            name: "больше",
            code: ">",
        },
        {
            name: "меньше",
            code: "<",
        },
        {
            name: "равно",
            code: ":",
        },
        {
            name: "больше или равно",
            code: ">:",
        },
        {
            name: "меньше или равно",
            code: "<:",
        },
        {
            name: "не равно",
            code: "!",
        },
        /*{
            name: "содержит",
            code: "~",
        },*/
    ];


    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.sorts = [];
        this.filters = [];
        this.page = 0;
        this.limit = 20;
    }

    reset() {
        this.constructor();
    }

    composeUrl(){
        let filters = this.filters.map(e => `${e.src.prop} ${e.op.code} ${e.val}`).join(" AND ");

        let sorts = this.sorts.map(e => "sort="+e.prop+","+e.dir).join("&");

        let result = this.baseUrl;
        if (sorts.length)
            result += `&${sorts}`;
        if (filters.length)
            result += `&filter=${filters}`;

        result += "&page="+this.page+"&limit="+this.limit;
        console.log(result);
        return result;
    }
}