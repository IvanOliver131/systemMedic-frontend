import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const Excel_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const Excel_EXTENSION = '.xlsx';


import { environment } from 'src/environments/environment';

const { apiUrl } = environment;

@Injectable({
    providedIn: 'root'
})
export class RetiradaService {
    pacientMedicineURL = `${apiUrl}/pacientMedicine`;

    constructor(private http: HttpClient) { }

    registerPacientMedicine(cadastroPacient: any, cadastroMedicine: any) {
      const obj = {
        id_pacient: String(cadastroPacient.id),
        lstMedicine: cadastroMedicine,
      };    
      
      return this.http.post(`${this.pacientMedicineURL}`, obj);
    }

    getAllPacientMedicine(){
      return this.http.get(`${this.pacientMedicineURL}`);
    } 

    getSpecificRetirada(searchObj: any){
      const obj = {
        frase: searchObj.toLowerCase()
      }
      
      return this.http.get(`${this.pacientMedicineURL}/${obj.frase}`);
    }

    getAllRetiradaDate(dateIni, dateFim){
      return this.http.get(`${this.pacientMedicineURL}/${dateIni}/${dateFim}`);
    }

    downloadExcel(lstMedicineRep: any[], excelFileName: string): void {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(lstMedicineRep);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, excelFileName);
    }
  
    private saveAsExcelFile(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], {
        type: Excel_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + Excel_EXTENSION);
    }
}
