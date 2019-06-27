import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVote } from 'app/shared/model/vote.model';

@Component({
  selector: 'jhi-vote-detail',
  templateUrl: './vote-detail.component.html'
})
export class VoteDetailComponent implements OnInit {
  vote: IVote;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ vote }) => {
      this.vote = vote;
    });
  }

  previousState() {
    window.history.back();
  }
}
