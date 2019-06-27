/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HipsterBandTestModule } from '../../../test.module';
import { SongComponent } from 'app/entities/song/song.component';
import { SongService } from 'app/entities/song/song.service';
import { Song } from 'app/shared/model/song.model';

describe('Component Tests', () => {
  describe('Song Management Component', () => {
    let comp: SongComponent;
    let fixture: ComponentFixture<SongComponent>;
    let service: SongService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HipsterBandTestModule],
        declarations: [SongComponent],
        providers: []
      })
        .overrideTemplate(SongComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SongComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SongService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Song(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.songs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
