import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVote } from 'app/shared/model/vote.model';
import { VoteService } from './vote.service';

@Component({
  selector: 'jhi-vote-delete-dialog',
  templateUrl: './vote-delete-dialog.component.html'
})
export class VoteDeleteDialogComponent {
  vote: IVote;

  constructor(protected voteService: VoteService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.voteService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'voteListModification',
        content: 'Deleted an vote'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-vote-delete-popup',
  template: ''
})
export class VoteDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ vote }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(VoteDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.vote = vote;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/vote', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/vote', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
