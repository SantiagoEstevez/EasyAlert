import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CharexampleService {

  constructor(private _http: HttpClient) { }

  dailyForecast() {
    return this._http.get("http://localhost:52086/api/values/5")
      .map(result => result);
  }

}
