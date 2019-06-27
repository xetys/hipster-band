import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { BandComponent, BandDeletePopupComponent, BandDetailComponent, BandResolve, BandUpdateComponent } from 'app/entities/band';
import { BandDetailExtendedComponent } from 'app/sbs/band-extended/band-detail-extended.component';

export const bandExtendedRoute: Routes = [
  {
    path: '',
    component: BandComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'hipsterBandApp.band.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BandDetailExtendedComponent,
    resolve: {
      band: BandResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'hipsterBandApp.band.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BandUpdateComponent,
    resolve: {
      band: BandResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'hipsterBandApp.band.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BandUpdateComponent,
    resolve: {
      band: BandResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'hipsterBandApp.band.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const bandPopupExtendedRoute: Routes = [
  {
    path: ':id/delete',
    component: BandDeletePopupComponent,
    resolve: {
      band: BandResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'hipsterBandApp.band.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
