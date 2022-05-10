import {ColumnDescription} from "./columnDescription.js";

export const entityDescription = [
    new ColumnDescription("ID", "id", "number"),
    new ColumnDescription("Название организации", "name", "string"),
    new ColumnDescription("Код мин./вед.", "minVedCode", "string"),
    new ColumnDescription("Код управления", "controlCode", "string"),
    new ColumnDescription("Территория", "territory.name", "string"),
    new ColumnDescription("Порядок печати", "printingOrder", "number"),
];