import {Injectable} from '@angular/core';

import {APIService} from '@services/api.service';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  constructor(
    private apiService: APIService,
  ) {
  }

  get() {
    return this.apiService.request(APIService.Methods.GET, 'profile');
  }

  update(data) {
    return this.apiService.request(APIService.Methods.PUT, 'profile/profile', data);
  }
}
