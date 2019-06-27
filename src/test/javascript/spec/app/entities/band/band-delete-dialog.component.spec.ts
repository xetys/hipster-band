/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HipsterBandTestModule } from '../../../test.module';
import { BandDeleteDialogComponent } from 'app/entities/band/band-delete-dialog.component';
import { BandService } from 'app/entities/band/band.service';

describe('Component Tests', () => {
  describe('Band Management Delete Component', () => {
    let comp: BandDeleteDialogComponent;
    let fixture: ComponentFixture<BandDeleteDialogComponent>;
    let service: BandService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HipsterBandTestModule],
        declarations: [BandDeleteDialogComponent]
      })
        .overrideTemplate(BandDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BandDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BandService);
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
