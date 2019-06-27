import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ISong, Song } from 'app/shared/model/song.model';
import { SongService } from './song.service';
import { IUser, UserService } from 'app/core';
import { IBand } from 'app/shared/model/band.model';
import { BandService } from 'app/entities/band';

@Component({
  selector: 'jhi-song-update',
  templateUrl: './song-update.component.html'
})
export class SongUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  bands: IBand[];
  creationDateDp: any;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    duration: [null, [Validators.required]],
    audioContent: [],
    audioContentContentType: [],
    creationDate: [],
    lyrics: [],
    author: [],
    band: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected songService: SongService,
    protected userService: UserService,
    protected bandService: BandService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ song }) => {
      this.updateForm(song);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.bandService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IBand[]>) => mayBeOk.ok),
        map((response: HttpResponse<IBand[]>) => response.body)
      )
      .subscribe((res: IBand[]) => (this.bands = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(song: ISong) {
    this.editForm.patchValue({
      id: song.id,
      title: song.title,
      duration: song.duration,
      audioContent: song.audioContent,
      audioContentContentType: song.audioContentContentType,
      creationDate: song.creationDate,
      lyrics: song.lyrics,
      author: song.author,
      band: song.band
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const song = this.createFromForm();
    if (song.id !== undefined) {
      this.subscribeToSaveResponse(this.songService.update(song));
    } else {
      this.subscribeToSaveResponse(this.songService.create(song));
    }
  }

  private createFromForm(): ISong {
    return {
      ...new Song(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      duration: this.editForm.get(['duration']).value,
      audioContentContentType: this.editForm.get(['audioContentContentType']).value,
      audioContent: this.editForm.get(['audioContent']).value,
      creationDate: this.editForm.get(['creationDate']).value,
      lyrics: this.editForm.get(['lyrics']).value,
      author: this.editForm.get(['author']).value,
      band: this.editForm.get(['band']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISong>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
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

  trackBandById(index: number, item: IBand) {
    return item.id;
  }
}
