import { Injectable } from '@angular/core';
import { SongService } from 'app/entities/song';
import { ISong } from 'app/shared/model/song.model';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class SongExtendedService extends SongService {
  public resourceUrl = SERVER_API_URL + 'api/v1/songs';

  constructor(protected http: HttpClient) {
    super(http);
  }

  voteForSong(song: ISong): Observable<HttpResponse<ISong>> {
    return this.http.post(`${this.resourceUrl}/${song.id}/vote`, {}, { observe: 'response' });
  }
}
