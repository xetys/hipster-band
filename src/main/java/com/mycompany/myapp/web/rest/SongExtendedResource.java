package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Song;
import com.mycompany.myapp.service.SongExtendedService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/")
public class SongExtendedResource {

    private final SongResource songResource;
    ;

    private final SongExtendedService songExtendedService;

    public SongExtendedResource(SongExtendedService songExtendedService) {
        this.songExtendedService = songExtendedService;
        this.songResource = new SongResource(songExtendedService);
    }

    @PostMapping("/songs/{id}/vote")
    public ResponseEntity<Song> voteForSong(@PathVariable Long id) {
        return songExtendedService.findOne(id)
            .map(song -> {
                songExtendedService.voteForSong(song);
                return ResponseEntity.ok(song);
            })
            .orElseThrow(NoSuchElementException::new);
    }


    @PostMapping("/songs")
    public ResponseEntity<Song> createSong(@RequestBody @Valid Song song) throws URISyntaxException {
        return songResource.createSong(song);
    }

    @PutMapping("/songs")
    public ResponseEntity<Song> updateSong(@RequestBody @Valid Song song) throws URISyntaxException {
        return songResource.updateSong(song);
    }

    @GetMapping("/songs")
    public List<Song> getAllSongs() {
        return songResource.getAllSongs();
    }

    @GetMapping("/songs/{id}")
    public ResponseEntity<Song> getSong(@PathVariable Long id) {
        return songResource.getSong(id);
    }

    @DeleteMapping("/songs/{id}")
    public ResponseEntity<Void> deleteSong(@PathVariable Long id) {
        return songResource.deleteSong(id);
    }
}
