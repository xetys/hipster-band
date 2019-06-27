import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BandDetailComponent } from 'app/entities/band';
import { BandExtendedService } from 'app/sbs/band-extended/band-extended.service';
import { SongWithVotes } from 'app/sbs/band-extended/song-with-votes';
import { ISong } from 'app/shared/model/song.model';
import { SongExtendedService } from 'app/sbs/song-extended/song-extended.service';

@Component({
  selector: 'jhi-band-detail',
  templateUrl: './band-detail-extended.component.html'
})
export class BandDetailExtendedComponent extends BandDetailComponent implements OnInit {
  songs: SongWithVotes[];

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected bandService: BandExtendedService,
    protected songService: SongExtendedService
  ) {
    super(activatedRoute);
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ band }) => {
      this.band = band;

      this.load();
    });
  }

  private load() {
    this.bandService.getSongWithVotesByBand(this.band).subscribe(songs => (this.songs = songs));
  }

  voteForSong(song: ISong) {
    this.songService.voteForSong(song).subscribe(() => this.load());
  }
}
