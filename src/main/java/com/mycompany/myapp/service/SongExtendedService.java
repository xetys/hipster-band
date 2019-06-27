package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Band;
import com.mycompany.myapp.domain.Song;
import com.mycompany.myapp.domain.SongWithVotes;
import com.mycompany.myapp.domain.Vote;
import com.mycompany.myapp.repository.SongExtendedRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SongExtendedService extends SongService {
    private final SongExtendedRepository songExtendedRepository;
    private final UserService userService;
    private final VoteService voteService;

    public SongExtendedService(SongExtendedRepository songExtendedRepository, UserService userService, VoteService voteService) {
        super(songExtendedRepository);
        this.songExtendedRepository = songExtendedRepository;
        this.userService = userService;
        this.voteService = voteService;
    }

    public List<SongWithVotes> listSongWithVotesByBand(Band band) {
        return songExtendedRepository.findAllByBand(band);
    }


    public void voteForSong(Song song) {
        userService.getUserWithAuthorities()
            .ifPresent(user -> voteService.save(new Vote()
                .voteDate(LocalDate.now())
                .member(user)
                .song(song)));
    }
}
