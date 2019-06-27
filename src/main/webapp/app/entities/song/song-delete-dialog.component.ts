import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISong } from 'app/shared/model/song.model';
import { SongService } from './song.service';

@Component({
  selector: 'jhi-song-delete-dialog',
  templateUrl: './song-delete-dialog.component.html'
})
export class SongDeleteDialogComponent {
  song: ISong;

  constructor(protected songService: SongService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.songService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'songListModification',
        content: 'Deleted an song'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-song-delete-popup',
  template: ''
})
export class SongDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ song }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SongDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.song = song;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/song', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/song', { outlets: { popup: null } }]);
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
