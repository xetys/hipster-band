/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HipsterBandTestModule } from '../../../test.module';
import { VoteComponent } from 'app/entities/vote/vote.component';
import { VoteService } from 'app/entities/vote/vote.service';
import { Vote } from 'app/shared/model/vote.model';

describe('Component Tests', () => {
  describe('Vote Management Component', () => {
    let comp: VoteComponent;
    let fixture: ComponentFixture<VoteComponent>;
    let service: VoteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HipsterBandTestModule],
        declarations: [VoteComponent],
        providers: []
      })
        .overrideTemplate(VoteComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VoteComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VoteService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Vote(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.votes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
