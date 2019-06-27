import { ISong } from 'app/shared/model/song.model';
import { IUser } from 'app/core/user/user.model';

export interface IBand {
  id?: number;
  name?: string;
  genre?: string;
  songs?: ISong[];
  members?: IUser[];
}

export class Band implements IBand {
  constructor(public id?: number, public name?: string, public genre?: string, public songs?: ISong[], public members?: IUser[]) {}
}
