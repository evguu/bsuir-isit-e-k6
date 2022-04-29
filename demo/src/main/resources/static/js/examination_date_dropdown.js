const baseUrl = "/api/measurement?";

const entityDescription = [
    {
        name: "ID",
        getter: e => e["id"],
        prop: "id"
    },
    {
        name: "Тур",
        getter: e => e["examinationDateId"]["tour"],
        prop: "examinationDateId.tour"
    },
    {
        name: "Год",
        getter: e => e["examinationDateId"]["examinationYear"],
        prop: "examinationDateId.examinationYear"
    },
    {
        name: "Наименование организации",
        getter: e => e["organizationId"]["name"],
        prop: "organizationId.name"
    },
    {
        name: "Код угодья",
        getter: e => e["landCode"],
        prop: "landCode"
    },
    {
        name: "Hомеp пpоизводственного участка",
        getter: e => e["productionAreaNo"],
        prop: "productionAreaNo"
    },
    {
        name: "Hомеp севообоpота",
        getter: e => e["cropRotationNo"],
        prop: "cropRotationNo"
    },
    {
        name: "Hомеp поля севообоpота",
        getter: e => e["cropRotationFieldNo"],
        prop: "cropRotationFieldNo"
    },
    {
        name: "Площадь поля севообоpота",
        getter: e => e["cropRotationFieldArea"],
        prop: "cropRotationFieldArea"
    },
    {
        name: "Hомеp pабочего участка",
        getter: e => e["workingAreaNo"],
        prop: "workingAreaNo"
    },
    {
        name: "Площадь pабочего участка",
        getter: e => e["workingAreaArea"],
        prop: "workingAreaArea"
    },
    {
        name: "Hомеp элементаpного участка",
        getter: e => e["elementaryAreaNo"],
        prop: "elementaryAreaNo"
    },
    {
        name: "Площадь элементаpного участка",
        getter: e => e["elementaryAreaArea"],
        prop: "elementaryAreaArea"
    },
    {
        name: "Тип почвы",
        getter: e => e["soilTypeId"]["meaning"],
        prop: "soilTypeId.meaning"
    },
    {
        name: "Степень увлажнения, мощность торфяных залежей",
        getter: e => e["soilHydrationAndTurfId"]["meaning"],
        prop: "soilHydrationAndTurfId.meaning"
    },
    {
        name: "Гранулометрический состав",
        getter: e => e["soilGranulometricCompositionId"]["meaning"],
        prop: "soilGranulometricCompositionId.meaning"
    },
    {
        name: "Подстилающая порода",
        getter: e => e["soilBedrockId"]["meaning"],
        prop: "soilBedrockId.meaning"
    },
    {
        name: "Почвообразующая порода",
        getter: e => e["soilParentrockId"]["meaning"],
        prop: "soilParentrockId.meaning"
    },

    {
        name: "Мелиоpативное состояние",
        getter: e => e["ameliorativeStateId"]["meaning"],
        prop: "ameliorativeStateId.meaning"
    },
    {
        name: "Мощность гумусового гоpизонта",
        getter: e => e["humusHorizonThickness"],
        prop: "humusHorizonThickness"
    },
    {
        name: "pH в KCL",
        getter: e => e["ph"],
        prop: "ph"
    },
    {
        name: "Гумус",
        getter: e => e["humus"],
        prop: "humus"
    },
    {
        name: "СППФ P2O5, мг/кг",
        getter: e => e["measurementP2O5"],
        prop: "measurementP2O5"
    },
    {
        name: "СППФ K2O, мг/кг",
        getter: e => e["measurementK2O"],
        prop: "measurementK2O"
    },
    {
        name: "СППф CaO, мг/кг",
        getter: e => e["measurementCaO"],
        prop: "measurementCaO"
    },
    {
        name: "СППФ MgO, мг/кг",
        getter: e => e["measurementMgO"],
        prop: "measurementMgO"
    },
    {
        name: "СППФ серы, мг/кг",
        getter: e => e["measurementSulphur"],
        prop: "measurementSulphur"
    },
    {
        name: "СППФ бора, мг/кг",
        getter: e => e["measurementBoron"],
        prop: "measurementBoron"
    },
    {
        name: "СППФ меди, мг/кг",
        getter: e => e["measurementCopper"],
        prop: "measurementCopper"
    },
    {
        name: "СППФ цинка, мг/кг",
        getter: e => e["measurementZink"],
        prop: "measurementZink"
    },
    {
        name: "СППФ Mn, мг/кг",
        getter: e => e["measurementManganese"],
        prop: "measurementManganese"
    },
    {
        name: "СППФ Co, мг/кг",
        getter: e => e["measurementCobalt"],
        prop: "measurementCobalt"
    },
    {
        name: "Емкость катионного обмена",
        getter: e => e["cationExchangeCapacity"],
        prop: "cationExchangeCapacity"
    },
    {
        name: "% K2O от емкости катионного обмена",
        getter: e => e["cationExchangeCapacityK20"],
        prop: "cationExchangeCapacityK20"
    },
    {
        name: "P2O5 в вытяжке 0,01 MCaCl2, мг/л",
        getter: e => e["p2O5InExtract"],
        prop: "p2O5InExtract"
    },
    {
        name: "СППФ NO3 An, мг/кг",
        getter: e => e["measurementNo3An"],
        prop: "measurementNo3An"
    },
    {
        name: "СППФ NO3 A2, мг/кг",
        getter: e => e["measurementNo3A2"],
        prop: "measurementNo3A2"
    },
    {
        name: "СППФ NH4+ An, мг/кг",
        getter: e => e["measurementNo4PlusAn"],
        prop: "measurementNo4PlusAn"
    },
    {
        name: "СППФ NH4+ A2, мг/кг",
        getter: e => e["measurementNo4PlusA2"],
        prop: "measurementNo4PlusA2"
    },
    {
        name: "СППФ Pb, мг/кг",
        getter: e => e["measurementLead"],
        prop: "measurementLead"
    },
    {
        name: "СППФ Cd, мг/кг",
        getter: e => e["measurementCadmium"],
        prop: "measurementCadmium"
    },
    {
        name: "Валовое содеpжание Рв,мг/кг",
        getter: e => e["grossContentLead"],
        prop: "grossContentLead"
    },
    {
        name: "Валовое содеpжание Cd,мг/кг",
        getter: e => e["grossContentCadmium"],
        prop: "grossContentCadmium"
    },
    {
        name: "Валовое содеpжание Сu,мг/кг",
        getter: e => e["grossContentCopper"],
        prop: "grossContentCopper"
    },
    {
        name: "Валовое содеpжание Zn,мг/кг",
        getter: e => e["grossContentZink"],
        prop: "grossContentZink"
    },
    {
        name: "Гамма-фон, мкp/час",
        getter: e => e["gammaBackground"],
        prop: "gammaBackground"
    },
    {
        name: "Радионуклиды Cs, ки/кв.км",
        getter: e => e["radionuclidesCesium"],
        prop: "radionuclidesCesium"
    },
    {
        name: "Радионуклиды Sr, ки/кв.км",
        getter: e => e["radionuclidesStrontium"],
        prop: "radionuclidesStrontium"
    },
]

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

    const summary = document.createElement("summary");
    summary.innerHTML = "Фильтрация";
    controlsContainer.append(summary);

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

    let clearAllSortButton = document.createElement("button");
    clearAllSortButton.innerHTML = "Сбросить сортировку";
    clearAllSortButton.onclick = () => {
            viewDescription.sorts=[];
            reloadData();
        };
    if(viewDescription.sorts.length)
        controlsContainer.append(clearAllSortButton);

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