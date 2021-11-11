import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pacient } from 'src/app/shared/pacient';

import { environment } from 'src/environments/environment';

const { apiUrl } = environment;

@Injectable({
    providedIn: 'root'
})
export class PacientService {
    pacientURL = `${apiUrl}/pacient`;

    constructor(private http: HttpClient) { }

    registerPacient(cadastroObj: any) {
      const obj = {
        name: cadastroObj.name.toLowerCase(),
        age: cadastroObj.age,
        bairro: cadastroObj.bairro.toLowerCase(),
        cpf: cadastroObj.cpf,
        cartaoSUS_RG: cadastroObj.cartaoSUS_RG.toLowerCase(),
      }

      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');
      
      return this.http.post(`${this.pacientURL}`, obj);
    }

    getSpecificPacients(searchObj: any): Observable<Pacient[]>{
      const obj = {
        frase: searchObj.toLowerCase()
      }
      
      return this.http.get<Pacient[]>(`${this.pacientURL}/${obj.frase}`);
    }

    getAllPacients(): Observable<Pacient[]> {
      return this.http.get<Pacient[]>(`${this.pacientURL}`);
    }

    updatePacient(alterObj: any): Observable<Pacient[]>{
      const obj = {
        name: alterObj.name.toLowerCase(),
        age: alterObj.age,
        bairro: alterObj.bairro.toLowerCase(),
        cpf: alterObj.cpf,
        cartaoSUS_RG: alterObj.cartaoSUS_RG.toLowerCase(),
      }

      return this.http.put<Pacient[]>(`${this.pacientURL}/${alterObj.id}`, obj);
    }

    deletePacient(pacient: any): Observable<Pacient[]>{
      return this.http.delete<Pacient[]>(`${this.pacientURL}/${pacient.id}`);
    }
}
