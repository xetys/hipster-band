import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBand } from 'app/shared/model/band.model';

type EntityResponseType = HttpResponse<IBand>;
type EntityArrayResponseType = HttpResponse<IBand[]>;

@Injectable({ providedIn: 'root' })
export class BandService {
  public resourceUrl = SERVER_API_URL + 'api/bands';

  constructor(protected http: HttpClient) {}

  create(band: IBand): Observable<EntityResponseType> {
    return this.http.post<IBand>(this.resourceUrl, band, { observe: 'response' });
  }

  update(band: IBand): Observable<EntityResponseType> {
    return this.http.put<IBand>(this.resourceUrl, band, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBand>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBand[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
