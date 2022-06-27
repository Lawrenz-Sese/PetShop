import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor
  (
    private http: HttpClient,
  ) {}

  apiUrl = "http://localhost/petshop/api/";

  sendRequest(method: any, data: any)
  {
    return<any>
    (
      this.http.post(this.apiUrl + method, btoa(JSON.stringify(data)))
    );

  }
}
