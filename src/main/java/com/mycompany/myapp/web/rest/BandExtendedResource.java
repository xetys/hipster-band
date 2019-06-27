package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.SongWithVotes;
import com.mycompany.myapp.service.BandExtendedService;
import com.mycompany.myapp.service.SongExtendedService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1")
public class BandExtendedResource extends BandResource {
    private final BandExtendedService bandExtendedService;

    private final SongExtendedService songExtendedService;

    public BandExtendedResource(BandExtendedService bandExtendedService, SongExtendedService songExtendedService) {
        super(bandExtendedService);
        this.bandExtendedService = bandExtendedService;
        this.songExtendedService = songExtendedService;
    }

    @GetMapping("/bands/{id}/songs")
    public List<SongWithVotes> getSongWithVotes(@PathVariable Long id) {
        return bandExtendedService.findOne(id)
            .map(songExtendedService::listSongWithVotesByBand)
            .orElseThrow(NoSuchElementException::new);
    }
}
