import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { HipsterBandSharedModule } from 'app/shared';
import {
  SongComponent,
  SongDeleteDialogComponent,
  SongDeletePopupComponent,
  SongDetailComponent,
  songPopupRoute,
  songRoute,
  SongService,
  SongUpdateComponent
} from 'app/entities/song';
import { SongExtendedService } from 'app/sbs/song-extended/song-extended.service';

const ENTITY_STATES = [...songRoute, ...songPopupRoute];

@NgModule({
  imports: [HipsterBandSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [SongComponent, SongDetailComponent, SongUpdateComponent, SongDeleteDialogComponent, SongDeletePopupComponent],
  entryComponents: [SongComponent, SongUpdateComponent, SongDeleteDialogComponent, SongDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }, { provide: SongService, useClass: SongExtendedService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HipsterBandSongExtendedModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
