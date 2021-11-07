import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medicine } from 'src/app/shared/medicine';
import { Observable, ObservableInput } from 'rxjs';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const Excel_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const Excel_EXTENSION = '.xlsx';

@Injectable({
    providedIn: 'root'
})
export class MedicineService {
    medicineURL = `http://localhost:3000/medicine`;

    constructor(private http: HttpClient) { }

    registerMedicine(cadastroObj: any) {
        const obj = {
            name: cadastroObj.name.toLowerCase(),
            estoque: cadastroObj.estoque,
            type: cadastroObj.type,
            fornecedor: cadastroObj.fornecedor.toLowerCase(),
            nota_fiscal: cadastroObj.nota_fiscal.toLowerCase(),
            valor: cadastroObj.valor,
            descricao: cadastroObj.descricao.toLowerCase()
        }

        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        
        return this.http.post(`${this.medicineURL}`, obj);
    }

    getAllMedicinesQtd(): Observable<Medicine[]> {
      return this.http.get<Medicine[]>(`${this.medicineURL}/reposicao`);
    }

    getAllMedicinesControl(typeControl, dateIni, dateFim): Observable<Medicine[]> {
      return this.http.get<Medicine[]>(`${this.medicineURL}/control/${typeControl}/${dateIni}/${dateFim}`);
    }

    getAllMedicines(): Observable<Medicine[]> {
      return this.http.get<Medicine[]>(`${this.medicineURL}`);
    }

    getSpecificMedicines(searchObj: any): Observable<Medicine[]>{
      const obj = {
        frase: searchObj.toLowerCase()
      }
      
      return this.http.get<Medicine[]>(`${this.medicineURL}/${obj.frase}`);
    }

    updateMedicine(alterObj: any): Observable<Medicine[]>{
      const obj = {
        name: alterObj.name.toLowerCase(),
        estoque: alterObj.estoque,
        type: alterObj.type,
        fornecedor: alterObj.fornecedor.toLowerCase(),
        nota_fiscal: alterObj.nota_fiscal.toLowerCase(),
        valor: alterObj.valor,
        descricao: alterObj.descricao.toLowerCase()
    }

      return this.http.put<Medicine[]>(`${this.medicineURL}/${alterObj.id}`, obj);
    }

    deleteMedicine(medicine: any): Observable<Medicine[]>{
      return this.http.delete<Medicine[]>(`${this.medicineURL}/${medicine.id}`);
    }

    downloadExcel(lstMedicineRep: any[], excelFileName: string): void {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(lstMedicineRep);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
      this.saveAsExcelFile(excelBuffer, excelFileName);
    }
  
    private saveAsExcelFile(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], {
        type: Excel_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + Excel_EXTENSION);
    }
}
