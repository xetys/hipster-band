/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { HipsterBandTestModule } from '../../../test.module';
import { BandUpdateComponent } from 'app/entities/band/band-update.component';
import { BandService } from 'app/entities/band/band.service';
import { Band } from 'app/shared/model/band.model';

describe('Component Tests', () => {
  describe('Band Management Update Component', () => {
    let comp: BandUpdateComponent;
    let fixture: ComponentFixture<BandUpdateComponent>;
    let service: BandService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HipsterBandTestModule],
        declarations: [BandUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BandUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BandUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BandService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Band(123);
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
        const entity = new Band();
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
