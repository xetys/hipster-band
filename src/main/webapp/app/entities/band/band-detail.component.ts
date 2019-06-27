import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBand } from 'app/shared/model/band.model';

@Component({
  selector: 'jhi-band-detail',
  templateUrl: './band-detail.component.html'
})
export class BandDetailComponent implements OnInit {
  band: IBand;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ band }) => {
      this.band = band;
    });
  }

  previousState() {
    window.history.back();
  }
}
