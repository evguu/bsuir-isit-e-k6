const baseUrl = "/api/measurement?";

import {entityDescription} from "./entity_descriptions/measurement.js";

const controlsContainer = $("#controls");


const viewDescription = {
    sorts: [],
    filters: [],
    page: 0,
    limit: 20,
    reset: function(){
        this.sorts = [];
        this.filters = [];
        this.page = 0;
        this.limit = 20;
    },
    composeUrl: function (){
        let filters = this.filters.map(e => `${e.src.prop} ${e.op.code} ${e.val}`).join(" AND ");
        let sorts = this.sorts.map(e => "sort="+e.prop+","+e.dir).join("&");

        let result = baseUrl;
        if (sorts.length)
            result += `&${sorts}`;
        if (filters.length)
            result += `&filter=${filters}`;

        result += "&page="+this.page+"&limit="+this.limit;
        console.log(result);
        return result;
    },
    operations: [
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
    ]
}

function addLoader(){
    // Добавляем загрузочный элемент
    let loader = document.createElement("div");
    // Добавляем стили
    loader.classList.add("loading-screen");
    loader.innerHTML = "Загрузка...";

    document.body.appendChild(loader);
    return loader;
}

function reloadData() {
    let loader = addLoader();
    $.getJSON(viewDescription.composeUrl(), (data)=>{
        rebuildFromData(data);
        document.body.removeChild(loader);
    });

    fillSortSearchControls();
}
reloadData();

function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
}


function fillSortSearchControls(){
    // Очищаем контейнер
    controlsContainer.empty();

    // Добавляем заголовок
    const summary = document.createElement("summary");
    summary.innerHTML = "Управление";
    controlsContainer.append(summary);

    // Создаем контейнер для фильтров
    let filter = document.createElement("div");
    filter.classList.add("filter");
    filter.innerHTML = `
        <select class="filter-prop">
            ${entityDescription.map(e => `<option value="${utf8_to_b64(JSON.stringify(e))}">${e.name}</option>`).join("")}
        </select>
        <select class="filter-op">
            ${viewDescription.operations.map(e => `<option value="${utf8_to_b64(JSON.stringify(e))}">${e.name}</option>`).join("")}
        </select>
        <input class="filter-value" type="text">
        <button class="filter-apply">Добавить фильтр</button>
    `;
    filter.querySelector(".filter-apply").onclick = () => {
        let prop = JSON.parse(b64_to_utf8(filter.querySelector(".filter-prop").value));
        let op = JSON.parse(b64_to_utf8(filter.querySelector(".filter-op").value));
        let value = filter.querySelector(".filter-value").value;
        viewDescription.filters.push({src: prop,op: op, val: value});
        reloadData();
    }
    controlsContainer.append(filter);

    // Кнопка открытия ссылки из API
    const openApiLink = document.createElement("button");
    openApiLink.innerHTML = "Открыть страницу в API";
    openApiLink.onclick = ()=>{
        window.open(viewDescription.composeUrl());
    }
    controlsContainer.append(openApiLink);

    // Кнопка очистки фильтров
    let clearAllSortButton = document.createElement("button");
    clearAllSortButton.innerHTML = "Сбросить сортировку";
    clearAllSortButton.onclick = () => {
            viewDescription.sorts=[];
            reloadData();
        };
    if(viewDescription.sorts.length)
        controlsContainer.append(clearAllSortButton);

    // Кнопка очистки фильтров
    let clearAllFilterButton = document.createElement("button");
    clearAllFilterButton.innerHTML = "Сбросить фильтры";
    clearAllFilterButton.onclick = () => {
            viewDescription.filters=[];
            reloadData();
        };
    if(viewDescription.filters.length)
        controlsContainer.append(clearAllFilterButton);

    // Добавим список активных фильтров
    let filters = document.createElement("div");
    for (const filter of viewDescription.filters) {
        let filterItem = document.createElement("div");
        filterItem.innerHTML = `
            <span style="color:black" class="filter-prop">Фильтр: ${filter.src.name} ${filter.op.name} ${filter.val}</span>
            <button class="filter-remove">Удалить</button>
        `;
        filterItem.querySelector(".filter-remove").onclick = () => {
            viewDescription.filters.splice(viewDescription.filters.indexOf(filter), 1);
            reloadData();
        };
        filters.append(filterItem);
    }
    controlsContainer.append(filters);
}

function rebuildFromData(data) {
    rebuildTable(data.content);
    rebuildPageNav(data.totalPages, data.number);
}

function rebuildTable(data) {
    const table = document.getElementById("measurement-table");
    table.innerHTML = "";

    const header = document.createElement("tr");
    for (const col of entityDescription) {
        const th = document.createElement("th");
        th.innerHTML = col.name + getSortDirChar(col.prop);
        th.onclick = () => {onTableHeaderClick(col.prop);};
        header.appendChild(th);
    }
    table.appendChild(header);

    for (const measurement of data) {
        const row = document.createElement("tr");
        let rowHtml = "";
        for (const col of entityDescription) {
            rowHtml += `<td>${col.getter(measurement)}</td>`;
        }
        row.innerHTML = rowHtml;
        table.appendChild(row);
    }
}

function onTableHeaderClick(prop){
    const isPropPresentInSort = viewDescription.sorts.some(e => e.prop === prop);
    if (isPropPresentInSort) {
        const index = viewDescription.sorts.findIndex(e => e.prop === prop);
        if (viewDescription.sorts[index].dir === "asc")
            viewDescription.sorts[index].dir = "desc";
        else
            viewDescription.sorts.splice(index, 1);
    } else {
        viewDescription.sorts.push({prop: prop, dir: "asc"});
    }
    reloadData();
}

function getSortDirChar(prop){
    const isPropPresentInSort = viewDescription.sorts.some(e => e.prop === prop);
    if (isPropPresentInSort) {
        const index = viewDescription.sorts.findIndex(e => e.prop === prop);
        if (viewDescription.sorts[index].dir === "asc")
            return "▲"+(index+1);
        else
            return "▼"+(index+1);
    } else {
        return "";
    }
}

function rebuildPageNav(pageCount, pageNumber) {
    pageCount *= 1;
    pageNumber *= 1;
    const pageList = $("#page-nav");
    pageList.html("");

    const prevHolder = $("<div>");
    prevHolder.addClass("page-nav-prev");
    pageList.append(prevHolder);

    const pageNumberHolder = $("<p>");
    pageNumberHolder.text("стр. " + (pageNumber+1));
    pageNumberHolder.addClass("page-nav-current");
    pageList.append(pageNumberHolder);

    const nextHolder = $("<div>");
    nextHolder.addClass("page-nav-next");
    pageList.append(nextHolder);


    let pageStep = 1;
    while (pageCount / pageStep > 1) {
        const plusDest = pageNumber + pageStep;
        const isPlusButtonNecessary = (plusDest < pageCount);

        const minusDest = pageNumber - pageStep;
        const isMinusButtonNecessary = (minusDest >= 0);

        if (isPlusButtonNecessary) {
            nextHolder.append(addPageButton(`+${pageStep}`, plusDest));
        }

        if (isMinusButtonNecessary) {
            prevHolder.append(addPageButton(`-${pageStep}`, minusDest));
        }

        pageStep *= 10;
    }
}

function addPageButton(text, page){
    const button = $("<button>");
    button.text(text);
    button.click(() => {
        let loader = addLoader();
        viewDescription.page = page;
        $.getJSON(viewDescription.composeUrl(), (data)=>{
            rebuildFromData(data);
            document.body.removeChild(loader);
        });
    });
    return button;
}