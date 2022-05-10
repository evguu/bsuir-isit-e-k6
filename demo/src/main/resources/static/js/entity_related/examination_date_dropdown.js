const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const chosenEntity = urlParams.get('entity');

const entityDescription = (await import(`./entity_descriptions/${chosenEntity}.js`)).entityDescription;
console.log(entityDescription);
import {ViewManager} from "./viewManager.js";
import {LoaderElement} from "./loaderElement.js";
import {CsvUtils} from "./csvUtils.js";

const controlsContainer = $("#controls");
const loader = new LoaderElement();
const viewDescription = new ViewManager(`/api/${chosenEntity}?`);

function reloadData() {
    loader.show();
    viewDescription.page=0;
    $.getJSON(viewDescription.composeUrl(), (data)=>{
        rebuildFromData(data);
        loader.hide();
    });
    fillSortSearchControls();
}

// Reload data on page load
reloadData();

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
            ${entityDescription.map((e,i) => `<option value="${i}">${e.name}</option>`).join("")}
        </select>
        <select class="filter-op">
            ${ViewManager.operations.map((e,i) => `<option value="${i}">${e.name}</option>`).join("")}
        </select>
        <input class="filter-value" type="text">
        <button class="filter-apply">Добавить фильтр</button>
    `;
    filter.querySelector(".filter-apply").onclick = () => {
        const prop = entityDescription[filter.querySelector(".filter-prop").value];
        const op = ViewManager.operations[filter.querySelector(".filter-op").value];
        const value = filter.querySelector(".filter-value").value;
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

    // Кнопка скачивания отчета в CSV
    const downloadCsvButton = document.createElement("button");
    downloadCsvButton.innerHTML = "Скачать Excel-отчет";
    downloadCsvButton.onclick = ()=>{
        CsvUtils.downloadAsXlsx(viewDescription.composeUrl(true),
            entityDescription,
            loader);
    }
    controlsContainer.append(downloadCsvButton);

    // Кнопка очистки сортировок
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
        th.innerHTML = col.name + getCharacterToDisplaySortingDirection(col.prop);
        th.onclick = () => {onColumnNameClick(col.prop);};
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

function onColumnNameClick(prop){
    const index = viewDescription.sorts.findIndex(e => e.prop === prop);

    // Alter the sort direction between ascending, descending and none.
    if (index !== -1) {
        if (viewDescription.sorts[index].dir === "asc") {
            viewDescription.sorts[index].dir = "desc";
        }
        else {
            viewDescription.sorts.splice(index, 1);
        }
    } else {
        viewDescription.sorts.push({prop: prop, dir: "asc"});
    }

    reloadData();
}

function getCharacterToDisplaySortingDirection(prop){
    const index = viewDescription.sorts.findIndex(e => e.prop === prop);
    if (index !== -1) {
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
            nextHolder.append(addPageChangeButton(`+${pageStep}`, plusDest));
        }

        if (isMinusButtonNecessary) {
            prevHolder.append(addPageChangeButton(`-${pageStep}`, minusDest));
        }

        pageStep *= 10;
    }
}

function addPageChangeButton(text, destinationPage){
    const button = $("<button>");
    button.text(text);
    button.click(() => {
        loader.show()
        viewDescription.page = destinationPage;
        $.getJSON(viewDescription.composeUrl(), (data)=>{
            rebuildFromData(data);
            loader.hide();
        });
    });
    return button;
}