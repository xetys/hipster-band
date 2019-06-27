/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HipsterBandTestModule } from '../../../test.module';
import { BandDetailComponent } from 'app/entities/band/band-detail.component';
import { Band } from 'app/shared/model/band.model';

describe('Component Tests', () => {
  describe('Band Management Detail Component', () => {
    let comp: BandDetailComponent;
    let fixture: ComponentFixture<BandDetailComponent>;
    const route = ({ data: of({ band: new Band(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HipsterBandTestModule],
        declarations: [BandDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BandDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BandDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.band).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
