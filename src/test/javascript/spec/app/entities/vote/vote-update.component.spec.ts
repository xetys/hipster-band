/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { HipsterBandTestModule } from '../../../test.module';
import { VoteUpdateComponent } from 'app/entities/vote/vote-update.component';
import { VoteService } from 'app/entities/vote/vote.service';
import { Vote } from 'app/shared/model/vote.model';

describe('Component Tests', () => {
  describe('Vote Management Update Component', () => {
    let comp: VoteUpdateComponent;
    let fixture: ComponentFixture<VoteUpdateComponent>;
    let service: VoteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HipsterBandTestModule],
        declarations: [VoteUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(VoteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VoteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VoteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Vote(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Vote();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
