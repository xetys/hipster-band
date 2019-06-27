import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IBand, Band } from 'app/shared/model/band.model';
import { BandService } from './band.service';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-band-update',
  templateUrl: './band-update.component.html'
})
export class BandUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    genre: [],
    members: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected bandService: BandService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ band }) => {
      this.updateForm(band);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(band: IBand) {
    this.editForm.patchValue({
      id: band.id,
      name: band.name,
      genre: band.genre,
      members: band.members
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const band = this.createFromForm();
    if (band.id !== undefined) {
      this.subscribeToSaveResponse(this.bandService.update(band));
    } else {
      this.subscribeToSaveResponse(this.bandService.create(band));
    }
  }

  private createFromForm(): IBand {
    return {
      ...new Band(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      genre: this.editForm.get(['genre']).value,
      members: this.editForm.get(['members']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBand>>) {
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

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
