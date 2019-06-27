import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { App } from 'app/kloud/models/app.model';

@Injectable({
  providedIn: 'root'
})
export class AppSwitchService {
  constructor(private http: HttpClient) {}

  getMyApplications(): Observable<App[]> {
    return this.http.get<App[]>('services/uaa/api/my-applications').pipe(
      map(entries => {
        // var currentHost = location.href.split('/')
        let hostName = location.href
          .split('/')[2]
          .split('.')
          .splice(1)
          .join('.');
        hostName = hostName ? hostName : 'localhost';

        return entries.map(entry => {
          entry.url = 'http://' + entry.name + '.' + hostName;
          entry.icon = entry.cssClass;

          return entry;
        });
      })
    );
  }
}
