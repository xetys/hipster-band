/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HipsterBandTestModule } from '../../../test.module';
import { VoteDeleteDialogComponent } from 'app/entities/vote/vote-delete-dialog.component';
import { VoteService } from 'app/entities/vote/vote.service';

describe('Component Tests', () => {
  describe('Vote Management Delete Component', () => {
    let comp: VoteDeleteDialogComponent;
    let fixture: ComponentFixture<VoteDeleteDialogComponent>;
    let service: VoteService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HipsterBandTestModule],
        declarations: [VoteDeleteDialogComponent]
      })
        .overrideTemplate(VoteDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VoteDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VoteService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
