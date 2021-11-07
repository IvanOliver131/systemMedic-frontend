import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { User } from 'src/app/shared/user';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    usersURL = `http://localhost:3000/users`;

    constructor(private http: HttpClient) { }

    register(cadastroObj: any) {
        // let password = Md5.hashStr(cadastroObj.password);
        // cadastroObj.password = password;

        const obj = {
            username: cadastroObj.username.toLowerCase(),
            email: cadastroObj.email.toLowerCase(),
            password: cadastroObj.password,
            type: cadastroObj.type
        }

        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('bearer', "697-2fe-fc860");

        return this.http.post(`${this.usersURL}`, obj);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.usersURL}`);
    }

    getSpecificUser(searchObj: any): Observable<User[]>{
        const obj = {
            frase: searchObj.toLowerCase()
        }
        
        return this.http.get<User[]>(`${this.usersURL}/${obj.frase}`);
    }

    updateUser(alterObj: any): Observable<User[]>{
        const obj = {
            username: alterObj.username.toLowerCase(),
            type: alterObj.type,
            email: alterObj.email.toLowerCase(),
            password: alterObj.password,
        }

        return this.http.put<User[]>(`${this.usersURL}/${alterObj.id}`, obj);
    }

    deleteUser(user: any): Observable<User[]>{
        return this.http.delete<User[]>(`${this.usersURL}/${user.id}`);
    }
}
