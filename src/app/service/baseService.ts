import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
//import { Utils } from './utils';

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    objErro: any = {};

    constructor(protected http: HttpClient) { }

    getCommonHeaders(hasToken: boolean) {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('bearer', "697-2fe-fc860");
        return headers;
    }

    handleErrors(error: Response) {
        console.log("APP LOG ERROR: " + error);
        this.objErro = error;
        if (this.objErro.status == 0) {
            return throwError("Houve uma queda temporária de conexão entre este dispositivo e o nosso servidor. Por favor tente novamente em breve.");
        } else if (error.status == 400) {
            return throwError(this.objErro.error.message);
        }
        return throwError(error);
    }
}
