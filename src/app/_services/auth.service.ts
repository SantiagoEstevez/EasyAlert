import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private url = 'http://172.16.104.152:8080/Proyecto2018';

  constructor(
    private http: Http,
    private router: Router
  ) { }

  login(): boolean {
    localStorage.setItem('token', 'estoesuntokendementira');
    this.router.navigate(['dashboard']);
    return true;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  getLoginStatus(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  getTokenFake(): Promise<string> {
    return Promise.reject("estoesuntokendementira");
    //localStorage.setItem('token', response.json() as string);
  }

  getToken2(): Promise<string> {
    let userData64: string = "fede:fede";
    this.headers.append("Authorization","Basic " + btoa(userData64));
    const url = `${this.url}/rest/seguridad/token`;

    return this.http.get(url)
        .toPromise()
        .then(response => response.json() as string)
        .catch(this.handleError);
  }

  getToken(lat: number, lon: number): Promise<string> {
    const url = `${this.url}cityLat/${lat}/cityLon/${lon}/`;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json() as string)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
