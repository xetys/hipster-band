import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { HipsterBandSharedModule } from 'app/shared';
import {
  BandComponent,
  BandDeleteDialogComponent,
  BandDeletePopupComponent,
  BandDetailComponent,
  bandPopupRoute,
  bandRoute,
  BandService,
  BandUpdateComponent
} from 'app/entities/band';
import { BandExtendedService } from 'app/sbs/band-extended/band-extended.service';
import { BandDetailExtendedComponent } from 'app/sbs/band-extended/band-detail-extended.component';
import { bandExtendedRoute, bandPopupExtendedRoute } from 'app/sbs/band-extended/band-extended.route';

const ENTITY_STATES = [...bandExtendedRoute, ...bandPopupExtendedRoute];

@NgModule({
  imports: [HipsterBandSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    BandComponent,
    BandDetailComponent,
    BandDetailExtendedComponent,
    BandUpdateComponent,
    BandDeleteDialogComponent,
    BandDeletePopupComponent
  ],
  entryComponents: [BandComponent, BandUpdateComponent, BandDeleteDialogComponent, BandDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }, { provide: BandService, useClass: BandExtendedService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HipsterBandBandExtendedModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
