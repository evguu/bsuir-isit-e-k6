import * as XLSX from "../xlsx.js";
import * as cptable from '../cpexcel_full.js';
XLSX.set_cptable(cptable);


export class CsvUtils {
  static downloadAsXlsx(url, entityDescription, loader) {
      loader.show();
      $.getJSON(url, (data)=>{
          const page = [entityDescription.map(col => col.name)].concat(
                data.content.map(row => entityDescription.map(col => col.getter(row)))
              );
          const wb = XLSX.utils.book_new();
          const ws = XLSX.utils.aoa_to_sheet(page);
          XLSX.utils.book_append_sheet(wb, ws, "Page 1");
          XLSX.writeFileXLSX(wb, "export.xlsx");
          loader.hide();
      });
  }
}