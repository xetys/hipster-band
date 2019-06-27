import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ISong } from 'app/shared/model/song.model';
import { AccountService } from 'app/core';
import { SongService } from './song.service';

@Component({
  selector: 'jhi-song',
  templateUrl: './song.component.html'
})
export class SongComponent implements OnInit, OnDestroy {
  songs: ISong[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected songService: SongService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.songService
      .query()
      .pipe(
        filter((res: HttpResponse<ISong[]>) => res.ok),
        map((res: HttpResponse<ISong[]>) => res.body)
      )
      .subscribe(
        (res: ISong[]) => {
          this.songs = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSongs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISong) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInSongs() {
    this.eventSubscriber = this.eventManager.subscribe('songListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
