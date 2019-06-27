/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HipsterBandTestModule } from '../../../test.module';
import { BandComponent } from 'app/entities/band/band.component';
import { BandService } from 'app/entities/band/band.service';
import { Band } from 'app/shared/model/band.model';

describe('Component Tests', () => {
  describe('Band Management Component', () => {
    let comp: BandComponent;
    let fixture: ComponentFixture<BandComponent>;
    let service: BandService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HipsterBandTestModule],
        declarations: [BandComponent],
        providers: []
      })
        .overrideTemplate(BandComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BandComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BandService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Band(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.bands[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
