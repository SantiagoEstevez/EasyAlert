import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private url = 'http://localhost:6346/api/Evento/Global/';

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
