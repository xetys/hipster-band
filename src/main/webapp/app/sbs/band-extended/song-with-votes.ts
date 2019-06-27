import { ISong } from 'app/shared/model/song.model';

export interface SongWithVotes {
  song: ISong;
  numberVotes: number;
}
