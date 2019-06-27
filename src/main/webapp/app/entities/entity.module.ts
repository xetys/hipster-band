import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'band',
        loadChildren: './band/band.module#HipsterBandBandModule'
      },
      {
        path: 'song',
        loadChildren: './song/song.module#HipsterBandSongModule'
      },
      {
        path: 'vote',
        loadChildren: './vote/vote.module#HipsterBandVoteModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HipsterBandEntityModule {}
