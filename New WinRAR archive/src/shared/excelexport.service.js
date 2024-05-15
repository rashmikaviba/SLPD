import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

export class ExcelExportService {
  static exportToExcel(data, fileName) {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  static saveAsExcelFile(buffer, fileName) {
    const data = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    FileSaver.saveAs(data, `${fileName}.xlsx`);
  }
}
