import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Band } from 'app/shared/model/band.model';
import { BandService } from './band.service';
import { BandComponent } from './band.component';
import { BandDetailComponent } from './band-detail.component';
import { BandUpdateComponent } from './band-update.component';
import { BandDeletePopupComponent } from './band-delete-dialog.component';
import { IBand } from 'app/shared/model/band.model';

@Injectable({ providedIn: 'root' })
export class BandResolve implements Resolve<IBand> {
  constructor(private service: BandService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBand> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Band>) => response.ok),
        map((band: HttpResponse<Band>) => band.body)
      );
    }
    return of(new Band());
  }
}

export const bandRoute: Routes = [
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
    component: BandDetailComponent,
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

export const bandPopupRoute: Routes = [
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
