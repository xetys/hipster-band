package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class SongWithVotes {

    @JsonIgnoreProperties("audioContent")
    private Song song;

    private Long numberVotes;

    public SongWithVotes() {
    }

    public SongWithVotes(Song song, Long numberVotes) {
        this.song = song;
        this.numberVotes = numberVotes;
    }

    public Song getSong() {
        return song;
    }

    public void setSong(Song song) {
        this.song = song;
    }

    public Long getNumberVotes() {
        return numberVotes;
    }

    public void setNumberVotes(Long numberVotes) {
        this.numberVotes = numberVotes;
    }
}
