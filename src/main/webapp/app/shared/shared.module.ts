import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HipsterBandSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [HipsterBandSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [HipsterBandSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HipsterBandSharedModule {
  static forRoot() {
    return {
      ngModule: HipsterBandSharedModule
    };
  }
}
