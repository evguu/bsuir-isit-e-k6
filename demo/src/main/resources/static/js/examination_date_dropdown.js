const dataSource = document.getElementById("examination-date-dropdown-data");
let data = dataSource.getAttribute("value");
data = data.replaceAll("=", ":");
data = data.replaceAll("ExaminationDate(", "{");
data = data.replaceAll(")", "}");
eval("data = " + data); // Potential security risk!
dataSource.remove();

const years = Object.keys(data);
console.log(years);

const mainDropdown = document.createElement("select");
updateDropdown(mainDropdown, years);

const container = document.getElementById("examination-date-dropdown-container");
container.appendChild(mainDropdown);

const subDropdown = document.createElement("select");
updateDropdown(subDropdown, data[mainDropdown.value], e => e.tour);
container.appendChild(subDropdown);

mainDropdown.onchange = ()=>{
    updateDropdown(subDropdown, data[mainDropdown.value], e => e.tour);
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