import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from '../baseService';
import { environment } from 'src/environments/environment';

const { apiUrl } = environment;

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {
    authURL = `${apiUrl}/auth`;

    constructor(private h: HttpClient) {
        super(h);
    }

    login(loginObj: any) {
        //let password = Md5.hashStr(loginObj.password);
        //loginObj.password = password;

        const obj = {
            email: loginObj.email,
            password: loginObj.password
        }

        localStorage.setItem("email", obj.email);

        return this.http.post(this.authURL, obj, {
            headers: this.getCommonHeaders(false)
        })
            .pipe(
                map((data: any) => {
                    //
                    if (data.status != "200") {
                        catchError(this.handleErrors);
                    }

                    localStorage.setItem("userId", data.id);
                    localStorage.setItem("token", data.token);

                    return data;
                }),
                catchError(this.handleErrors)
            );
    }
}
