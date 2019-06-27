import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IVote, Vote } from 'app/shared/model/vote.model';
import { VoteService } from './vote.service';
import { IUser, UserService } from 'app/core';
import { ISong } from 'app/shared/model/song.model';
import { SongService } from 'app/entities/song';

@Component({
  selector: 'jhi-vote-update',
  templateUrl: './vote-update.component.html'
})
export class VoteUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  songs: ISong[];
  voteDateDp: any;

  editForm = this.fb.group({
    id: [],
    voteDate: [null, [Validators.required]],
    member: [],
    song: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected voteService: VoteService,
    protected userService: UserService,
    protected songService: SongService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ vote }) => {
      this.updateForm(vote);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.songService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISong[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISong[]>) => response.body)
      )
      .subscribe((res: ISong[]) => (this.songs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(vote: IVote) {
    this.editForm.patchValue({
      id: vote.id,
      voteDate: vote.voteDate,
      member: vote.member,
      song: vote.song
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const vote = this.createFromForm();
    if (vote.id !== undefined) {
      this.subscribeToSaveResponse(this.voteService.update(vote));
    } else {
      this.subscribeToSaveResponse(this.voteService.create(vote));
    }
  }

  private createFromForm(): IVote {
    const entity = {
      ...new Vote(),
      id: this.editForm.get(['id']).value,
      voteDate: this.editForm.get(['voteDate']).value,
      member: this.editForm.get(['member']).value,
      song: this.editForm.get(['song']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVote>>) {
    result.subscribe((res: HttpResponse<IVote>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }

  trackSongById(index: number, item: ISong) {
    return item.id;
  }
}
