import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVote } from 'app/shared/model/vote.model';
import { AccountService } from 'app/core';
import { VoteService } from './vote.service';

@Component({
  selector: 'jhi-vote',
  templateUrl: './vote.component.html'
})
export class VoteComponent implements OnInit, OnDestroy {
  votes: IVote[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected voteService: VoteService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.voteService
      .query()
      .pipe(
        filter((res: HttpResponse<IVote[]>) => res.ok),
        map((res: HttpResponse<IVote[]>) => res.body)
      )
      .subscribe(
        (res: IVote[]) => {
          this.votes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInVotes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IVote) {
    return item.id;
  }

  registerChangeInVotes() {
    this.eventSubscriber = this.eventManager.subscribe('voteListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
