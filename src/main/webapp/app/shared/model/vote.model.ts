import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { ISong } from 'app/shared/model/song.model';

export interface IVote {
  id?: number;
  voteDate?: Moment;
  member?: IUser;
  song?: ISong;
}

export class Vote implements IVote {
  constructor(public id?: number, public voteDate?: Moment, public member?: IUser, public song?: ISong) {}
}
