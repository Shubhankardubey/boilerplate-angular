import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

import CONFIG from '@config';

@Injectable({
  providedIn: 'root'
})

export class APIService {
  static Methods = {
    GET: 'get',
    POST: 'post',
    PATCH: 'patch',
    DELETE: 'delete',
    PUT: 'put',
  };
  static Endpoint = CONFIG.apiEndpoint;
  // default headers
  headers = {};

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
  ) {
  }

  private getToken(): string {
    const token = this.cookieService.get('token');
    if (!token) {
      return;
    }
    return `Bearer ${token}`;
  }

  request(method: string, url: string, data?) {
    // init headers with defaults
    const headers = Object.create(this.headers);
    // attempt to load token
    const token = this.getToken();
    // if found, add to header
    if (token) {
      headers['Authorization'] = token;
    }
    return this.httpClient.request(method, `${CONFIG.apiEndpoint}/${url}`, {
      headers,
      body: data,
    });
  }
}
