import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    //private http: Http,
    private router: Router,
    private cookieService: CookieService
  ) { }

  login(oUser: User): any {
    let userData64: string = `${oUser.username}:${oUser.password}`;
    this.headers = this.headers.set("Authorization", "Basic " + btoa(userData64));
    //const url = `${environment.api_urlbase}rest/seguridad/token`;
    const url = `${environment.api_urlbase}values/token`;

    this.http.get(url, {observe: 'response', headers : this.headers})
      .subscribe(
        res => {
          this.cookieService.set('@easyaler::token', res.headers.get('SecurityToken'));
          this.cookieService.set('@easyaler::user', "user model");
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
