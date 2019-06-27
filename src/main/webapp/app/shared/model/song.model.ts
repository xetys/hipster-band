import { Moment } from 'moment';
import { IVote } from 'app/shared/model/vote.model';
import { IUser } from 'app/core/user/user.model';
import { IBand } from 'app/shared/model/band.model';

export interface ISong {
  id?: number;
  title?: string;
  duration?: number;
  audioContentContentType?: string;
  audioContent?: any;
  creationDate?: Moment;
  lyrics?: any;
  votes?: IVote[];
  author?: IUser;
  band?: IBand;
}

export class Song implements ISong {
  constructor(
    public id?: number,
    public title?: string,
    public duration?: number,
    public audioContentContentType?: string,
    public audioContent?: any,
    public creationDate?: Moment,
    public lyrics?: any,
    public votes?: IVote[],
    public author?: IUser,
    public band?: IBand
  ) {}
}
