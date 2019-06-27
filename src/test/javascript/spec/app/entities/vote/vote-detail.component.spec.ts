/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HipsterBandTestModule } from '../../../test.module';
import { VoteDetailComponent } from 'app/entities/vote/vote-detail.component';
import { Vote } from 'app/shared/model/vote.model';

describe('Component Tests', () => {
  describe('Vote Management Detail Component', () => {
    let comp: VoteDetailComponent;
    let fixture: ComponentFixture<VoteDetailComponent>;
    const route = ({ data: of({ vote: new Vote(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HipsterBandTestModule],
        declarations: [VoteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(VoteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VoteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.vote).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
