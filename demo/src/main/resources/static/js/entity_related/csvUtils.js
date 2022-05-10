import * as XLSX from "../xlsx.js";
import * as cptable from '../cpexcel_full.js';
XLSX.set_cptable(cptable);


export class CsvUtils {
  static downloadAsXlsx(url, entityDescription, loader) {
      loader.show();
      $.getJSON(url, (data)=>{
          const page = new Array(data.content.length + 1);
          page[0] = entityDescription.map(col => col.name);
          for (let i = 0; i < data.content.length; i++) {
            page[i + 1] = new Array(entityDescription.length);
            for (let j = 0; j < entityDescription.length; j++) {
              page[i + 1][j] = entityDescription[j].getter(data.content[i]);
            }
          }

          const wb = XLSX.utils.book_new();
          const ws = XLSX.utils.aoa_to_sheet(page);
          XLSX.utils.book_append_sheet(wb, ws, "Page 1");
          XLSX.writeFileXLSX(wb, "export.xlsx");
          loader.hide();
      });
  }
}