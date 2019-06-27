import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBand } from 'app/shared/model/band.model';
import { AccountService } from 'app/core';
import { BandService } from './band.service';

@Component({
  selector: 'jhi-band',
  templateUrl: './band.component.html'
})
export class BandComponent implements OnInit, OnDestroy {
  bands: IBand[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected bandService: BandService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.bandService
      .query()
      .pipe(
        filter((res: HttpResponse<IBand[]>) => res.ok),
        map((res: HttpResponse<IBand[]>) => res.body)
      )
      .subscribe(
        (res: IBand[]) => {
          this.bands = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInBands();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBand) {
    return item.id;
  }

  registerChangeInBands() {
    this.eventSubscriber = this.eventManager.subscribe('bandListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
