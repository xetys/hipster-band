import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBand } from 'app/shared/model/band.model';
import { BandService } from 'app/entities/band';
import { SongWithVotes } from 'app/sbs/band-extended/song-with-votes';

type EntityResponseType = HttpResponse<IBand>;
type EntityArrayResponseType = HttpResponse<IBand[]>;

@Injectable({ providedIn: 'root' })
export class BandExtendedService extends BandService {
  public resourceUrl = SERVER_API_URL + 'api/v1/bands';

  constructor(protected http: HttpClient) {
    super(http);
  }

  getSongWithVotesByBand(band: IBand): Observable<SongWithVotes[]> {
    return this.http.get<SongWithVotes[]>(`${this.resourceUrl}/${band.id}/songs`);
  }
}
