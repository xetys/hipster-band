import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { HipsterBandSharedModule } from 'app/shared';
import {
  VoteComponent,
  VoteDetailComponent,
  VoteUpdateComponent,
  VoteDeletePopupComponent,
  VoteDeleteDialogComponent,
  voteRoute,
  votePopupRoute
} from './';

const ENTITY_STATES = [...voteRoute, ...votePopupRoute];

@NgModule({
  imports: [HipsterBandSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [VoteComponent, VoteDetailComponent, VoteUpdateComponent, VoteDeleteDialogComponent, VoteDeletePopupComponent],
  entryComponents: [VoteComponent, VoteUpdateComponent, VoteDeleteDialogComponent, VoteDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HipsterBandVoteModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
