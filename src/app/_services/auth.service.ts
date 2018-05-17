import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //private headers = new Headers({ 'Content-Type': 'application/json' });
  private url = 'http://172.16.104.76:8080/Proyecto2018';
  private url2 = 'http://localhost:52086/api/values/token';

  constructor(
    private http: HttpClient,
    //private http: Http,
    private router: Router,
    private cookieService: CookieService
  ) { }

  login(oUser: User) {
    let userData64: string = "fede:fede";
    this.headers = this.headers.set("Authorization", "Basic " + btoa(userData64));
    const url = `${this.url}/rest/seguridad/token`;

    this.http.get(this.url2, {observe: 'response', headers : this.headers})
      .subscribe(
        res => {
          this.cookieService.set( '@easyaler::token', res.headers.get('SecurityToken'));
          this.cookieService.set( '@easyaler::user', "user model");
          this.router.navigate(['dashboard']);
          return true;
        },
        err => {
          return false;
        }
      );
  }

  /*login(oUser: User) {
    let userData64: string = "fede:fede";
    this.headers.append("Authorization", "Basic " + btoa(userData64));
    //this.headers.append("Access-Control-Expose-Headers", "SecurityToken");
    const url = `${this.url}/rest/seguridad/token`;

    this.http.get(this.url2, {headers : this.headers})
        .subscribe(res => {
            localStorage.setItem('@easyaler::token', res.headers.get('SecurityToken'));
            console.log(res.headers.get('securitytoken'));
            console.log(res);
            console.log(res.headers);
            console.log("asdadsas");
            console.log(res.headers.get('SecurityToken'));
            localStorage.setItem('@easyaler::user', 'estoesuntokendementira');
            this.router.navigate(['dashboard']);
            //return true;
          });
  }*/


  getMemory() {
    //const url = `${this.url}/rest/info/free/node3`;
    const url = `http://localhost:52086/api/values/5`;
    this.headers.append("SecurityToken", "eyJhbGciOiJIUzUxMiJ9.eyJSb2xlcyI6IiIsIlVzdWFyaW8iOiJmZWRlIiwic3ViIjoiVG9rZW4gdmFsaWRvIiwiaXNzIjoiR3J1cG80LVByb3llY3RvMjAxOCIsImlhdCI6MTUyNjQyNjE5MSwiZXhwIjoxNTI2NDI5NzkxfQ.u4PdsaNc4m9tsjoGzLR2hDhzl6k1TLkrGETvLyBbWvb1QMRhGY_Pu1gpoXmZkMo0N_7pF_OVPreoCOv4m0aJwg");
    return this.http.get(url, {responseType: 'text', headers : this.headers})
        .subscribe(res => { res });  
  }

  logout(): void {
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }

  getLoginStatus(): boolean {
    if (this.cookieService.check("@easyaler::token")) {
      return true;
    } else {
      return false;
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
