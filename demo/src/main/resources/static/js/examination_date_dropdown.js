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
        getter: e => e["id"]
    },
    {
        name: "Наименование организации",
        getter: e => e["organizationId"]["name"]
    },
    {
        name: "Код угодья",
        getter: e => e["landCode"]
    },
    {
        name: "Hомеp пpоизводственного участка",
        getter: e => e["productionAreaNo"]
    },
    {
        name: "Hомеp севообоpота",
        getter: e => e["cropRotationNo"]
    },
    {
        name: "Hомеp поля севообоpота",
        getter: e => e["cropRotationFieldNo"]
    },
    {
        name: "Площадь поля севообоpота",
        getter: e => e["cropRotationFieldArea"]
    },
    {
        name: "Hомеp pабочего участка",
        getter: e => e["workingAreaNo"]
    },
    {
        name: "Площадь pабочего участка",
        getter: e => e["workingAreaArea"]
    },
    {
        name: "Hомеp элементаpного участка",
        getter: e => e["elementaryAreaNo"]
    },
    {
        name: "Площадь элементаpного участка",
        getter: e => e["elementaryAreaArea"]
    },
    {
        name: "Тип почвы",
        getter: e => e["soilTypeId"]["meaning"]
    },
    {
        name: "Степень увлажнения, мощность торфяных залежей",
        getter: e => e["soilHydrationAndTurfId"]["meaning"]
    },
    {
        name: "Гранулометрический состав",
        getter: e => e["soilGranulometricCompositionId"]["meaning"]
    },
    {
        name: "Подстилающая порода",
        getter: e => e["soilBedrockId"]["meaning"]
    },
    {
        name: "Почвообразующая порода",
        getter: e => e["soilParentrockId"]["meaning"]
    },

    {
        name: "Мелиоpативное состояние",
        getter: e => e["ameliorativeStateId"]["meaning"]
    },
    {
        name: "Мощность гумусового гоpизонта",
        getter: e => e["humusHorizonThickness"]
    },
    {
        name: "pH в KCL",
        getter: e => e["ph"]
    },
    {
        name: "Гумус",
        getter: e => e["humus"]
    },
    {
        name: "СППФ P2O5, мг/кг",
        getter: e => e["measurementP2O5"]
    },
    {
        name: "СППФ K2O, мг/кг",
        getter: e => e["measurementK2O"]
    },
    {
        name: "СППф CaO, мг/кг",
        getter: e => e["measurementCaO"]
    },
    {
        name: "СППФ MgO, мг/кг",
        getter: e => e["measurementMgO"]
    },
    {
        name: "СППФ серы, мг/кг",
        getter: e => e["measurementSulphur"]
    },
    {
        name: "СППФ бора, мг/кг",
        getter: e => e["measurementBoron"]
    },
    {
        name: "СППФ меди, мг/кг",
        getter: e => e["measurementCopper"]
    },
    {
        name: "СППФ цинка, мг/кг",
        getter: e => e["measurementZink"]
    },
    {
        name: "СППФ Mn, мг/кг",
        getter: e => e["measurementManganese"]
    },
    {
        name: "СППФ Co, мг/кг",
        getter: e => e["measurementCobalt"]
    },
    {
        name: "Емкость катионного обмена",
        getter: e => e["cationExchangeCapacity"]
    },
    {
        name: "% K2O от емкости катионного обмена",
        getter: e => e["cationExchangeCapacityK20"]
    },
    {
        name: "P2O5 в вытяжке 0,01 MCaCl2, мг/л",
        getter: e => e["p2O5InExtract"]
    },
    {
        name: "СППФ NO3 An, мг/кг",
        getter: e => e["measurementNo3An"]
    },
    {
        name: "СППФ NO3 A2, мг/кг",
        getter: e => e["measurementNo3A2"]
    },
    {
        name: "СППФ NH4+ An, мг/кг",
        getter: e => e["measurementNo4PlusAn"]
    },
    {
        name: "СППФ NH4+ A2, мг/кг",
        getter: e => e["measurementNo4PlusA2"]
    },
    {
        name: "СППФ Pb, мг/кг",
        getter: e => e["measurementLead"]
    },
    {
        name: "СППФ Cd, мг/кг",
        getter: e => e["measurementCadmium"]
    },
    {
        name: "Валовое содеpжание Рв,мг/кг",
        getter: e => e["grossContentLead"]
    },
    {
        name: "Валовое содеpжание Cd,мг/кг",
        getter: e => e["grossContentCadmium"]
    },
    {
        name: "Валовое содеpжание Сu,мг/кг",
        getter: e => e["grossContentCopper"]
    },
    {
        name: "Валовое содеpжание Zn,мг/кг",
        getter: e => e["grossContentZink"]
    },
    {
        name: "Гамма-фон, мкp/час",
        getter: e => e["gammaBackground"]
    },
    {
        name: "Радионуклиды Cs, ки/кв.км",
        getter: e => e["radionuclidesCesium"]
    },
    {
        name: "Радионуклиды Sr, ки/кв.км",
        getter: e => e["radionuclidesStrontium"]
    },
]

function getUrlBase(){
    return `/api/measurement?filter=%20examinationDateId.id%20>%20${subDropdown.value * 1 - 1}%20AND%20examinationDateId.id%20<%20${subDropdown.value * 1 + 1}`;
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
    prevHolder[0].style.gridArea = "prev-page";
    prevHolder[0].style.display = "flex";
    prevHolder[0].style.justifyContent = "right";
    pageList.append(prevHolder);

    const pageNumberHolder = $("<p>");
    pageNumberHolder.text("стр. " + (pageNumber+1));

    pageNumberHolder[0].style.color = "white";
    pageNumberHolder[0].style.fontSize = "1.5em";
    pageNumberHolder[0].style.margin = "0.1em";
    pageNumberHolder[0].style.backgroundColor = "rgba(0,0,0,0.5)";

    pageNumberHolder[0].style.gridArea = "current-page";
    pageNumberHolder[0].style.display = "flex";
    pageNumberHolder[0].style.justifyContent = "center";
    pageList.append(pageNumberHolder);

    const nextHolder = $("<div>");
    nextHolder[0].style.gridArea = "next-page";
    nextHolder[0].style.display = "flex";
    nextHolder[0].style.justifyContent = "left";
    pageList.append(nextHolder);


    let pageStep = 1;
    while (pageCount / pageStep > 1) {

        const isPlusButtonNecessary = ((pageNumber + pageStep) < pageCount);
        if (isPlusButtonNecessary) {
            const button = $("<button>");
            button.text(`+${pageStep}`);
            button[0].classList.add("btn");
            button[0].classList.add("btn-secondary");
            const destinationPage = pageNumber + pageStep;
            button.click(() => $.getJSON(getUrlBase() + `&page=${destinationPage}&limit=20`,
                rebuildFromData));
            nextHolder.append(button);
        }

        const isMinusButtonNecessary = ((pageNumber - pageStep) >= 0);
        if (isMinusButtonNecessary) {
            const button = $("<button>");
            button.text(`-${pageStep}`);
            button[0].classList.add("btn");
            button[0].classList.add("btn-secondary");
            const destinationPage = pageNumber - pageStep;
            button.click(() => $.getJSON(getUrlBase() + `&page=${destinationPage}&limit=20`,
                rebuildFromData));
            prevHolder.append(button);
        }

        pageStep *= 10;
    }
}
