const dataSource = document.getElementById("examination-date-dropdown-data");
let examinationDates = dataSource.getAttribute("value");
examinationDates = examinationDates.replaceAll("=", ":");
examinationDates = examinationDates.replaceAll("ExaminationDate(", "{");
examinationDates = examinationDates.replaceAll(")", "}");
eval("examinationDates = " + examinationDates); // Potential security risk!
dataSource.remove();

const tourDateMap = {};
for (examinationDate of examinationDates){
    if (!Object.keys(tourDateMap).includes(examinationDate.tour+"")){
        tourDateMap[examinationDate.tour] = [];
    }
    tourDateMap[examinationDate.tour].push(examinationDate);
}

const mainDropdown = document.createElement("select");
updateDropdown(mainDropdown, Object.keys(tourDateMap));

const container = document.getElementById("examination-date-dropdown-container");
container.appendChild(mainDropdown);

const subDropdown = document.createElement("select");
updateDropdown(subDropdown, tourDateMap[mainDropdown.value], e => e.examinationYear);
container.appendChild(subDropdown);

mainDropdown.onchange = ()=>{
    updateDropdown(subDropdown, tourDateMap[mainDropdown.value], e => e.examinationYear);
};


function updateDropdown(dropdown, data, stringifier = e=>e){
    dropdown.innerHTML = "";
    for (const item of data){
        const option = document.createElement("option");
        option.value = item;
        option.text = stringifier(item);
        dropdown.appendChild(option);
    }
}