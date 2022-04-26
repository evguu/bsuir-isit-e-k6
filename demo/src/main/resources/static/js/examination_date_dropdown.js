const dataSource = document.getElementById("examination-date-dropdown-data");

const container = document.getElementById("dropdown-container");
const mainDropdown = document.createElement("select");
const subDropdown = document.createElement("select");

let examinationDates = dataSource.getAttribute("value");
examinationDates = examinationDates.replaceAll("=", ":");
examinationDates = examinationDates.replaceAll("ExaminationDate(", "{");
examinationDates = examinationDates.replaceAll(")", "}");
eval("examinationDates = " + examinationDates); // Potential security risk!
dataSource.remove();

let sortColumn = "id";
let sortDirection = "asc";

const tourDateMap = {};
for (examinationDate of examinationDates) {
    if (!Object.keys(tourDateMap).includes(examinationDate.tour + "")) {
        tourDateMap[examinationDate.tour] = [];
    }
    tourDateMap[examinationDate.tour].push(examinationDate);
}


updateDropdown(mainDropdown, Object.keys(tourDateMap));

container.appendChild(mainDropdown);
mainDropdown.onchange = onMainDropdownChange;
onMainDropdownChange();

container.appendChild(subDropdown);
subDropdown.onchange = onSubDropdownChange;


function updateDropdown(dropdown, data, stringifier = e => e, idGetter = e => e) {
    dropdown.innerHTML = "";
    for (const item of data) {
        const option = document.createElement("option");
        option.value = idGetter(item);
        option.text = stringifier(item);
        dropdown.appendChild(option);
    }
}

function onMainDropdownChange() {
    updateDropdown(subDropdown, tourDateMap[mainDropdown.value], e => e.examinationYear, e => e.id);
    onSubDropdownChange();
}

function onSubDropdownChange() {
    $.getJSON(getUrlBase() + `&page=0&limit=20`, rebuildFromData);
}

const tableColumns = [
    {
        name: "ID",
        getter: e => e["id"],
        prop: "id"
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

function getUrlBase(){
    return `/api/measurement?filter=%20examinationDateId.id%20:%20${subDropdown.value}&sort=${sortColumn},${sortDirection}`;
}

function rebuildFromData(data) {
    console.log(data);
    rebuildTable(data.content);
    rebuildPageNav(data.totalPages, data.number);
}

function rebuildTable(data) {
    const table = document.getElementById("measurement-table");
    table.innerHTML = "";

    const header = document.createElement("tr");
    for (const col of tableColumns) {
        const th = document.createElement("th");
        th.innerHTML = col.name;
        if (col.prop === sortColumn) {
            th.innerHTML += sortDirection === "asc" ? "&#9650;" : "&#9660;";
            th.style.color = "blue";

        }
        th.onclick = () => {
            const hasColChanged = sortColumn !== col.prop;
            sortColumn = col.prop;
            sortDirection = hasColChanged ? "asc" : (sortDirection === "asc" ? "desc" : "asc");
            onSubDropdownChange();
        };
        header.appendChild(th);
    }
    table.appendChild(header);

    for (const measurement of data) {
        const row = document.createElement("tr");
        let rowHtml = "";
        for (const col of tableColumns) {
            rowHtml += `<td>${col.getter(measurement)}</td>`;
        }
        row.innerHTML = rowHtml;
        table.appendChild(row);
    }
}

function rebuildPageNav(pageCount, pageNumber) {
    pageCount *= 1;
    pageNumber *= 1;
    console.log(pageCount, pageNumber);
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

        const isPlusButtonNecessary = ((pageNumber + pageStep) < pageCount);
        if (isPlusButtonNecessary) {
            const button = $("<button>");
            button.text(`+${pageStep}`);
            const destinationPage = pageNumber + pageStep;
            button.click(() => $.getJSON(getUrlBase() + `&page=${destinationPage}&limit=20`,
                rebuildFromData));
            nextHolder.append(button);
        }

        const isMinusButtonNecessary = ((pageNumber - pageStep) >= 0);
        if (isMinusButtonNecessary) {
            const button = $("<button>");
            button.text(`-${pageStep}`);
            const destinationPage = pageNumber - pageStep;
            button.click(() => $.getJSON(getUrlBase() + `&page=${destinationPage}&limit=20`,
                rebuildFromData));
            prevHolder.append(button);
        }

        pageStep *= 10;
    }
}
