import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBand } from 'app/shared/model/band.model';
import { BandService } from './band.service';

@Component({
  selector: 'jhi-band-delete-dialog',
  templateUrl: './band-delete-dialog.component.html'
})
export class BandDeleteDialogComponent {
  band: IBand;

  constructor(protected bandService: BandService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.bandService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'bandListModification',
        content: 'Deleted an band'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-band-delete-popup',
  template: ''
})
export class BandDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ band }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(BandDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.band = band;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/band', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/band', { outlets: { popup: null } }]);
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
