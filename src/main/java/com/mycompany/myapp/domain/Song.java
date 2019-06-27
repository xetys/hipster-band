package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.Duration;
import java.util.HashSet;
import java.util.Set;

/**
 * A Song.
 */
@Entity
@Table(name = "song")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Song implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "duration", nullable = false)
    private Duration duration;

    @Lob
    @Column(name = "audio_content")
    private byte[] audioContent;

    @Column(name = "audio_content_content_type")
    private String audioContentContentType;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "lyrics")
    private String lyrics;

    @OneToMany(mappedBy = "song")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Vote> votes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("songs")
    private User author;

    @ManyToOne
    @JsonIgnoreProperties("songs")
    private Band band;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Song title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Duration getDuration() {
        return duration;
    }

    public Song duration(Duration duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    public byte[] getAudioContent() {
        return audioContent;
    }

    public Song audioContent(byte[] audioContent) {
        this.audioContent = audioContent;
        return this;
    }

    public void setAudioContent(byte[] audioContent) {
        this.audioContent = audioContent;
    }

    public String getAudioContentContentType() {
        return audioContentContentType;
    }

    public Song audioContentContentType(String audioContentContentType) {
        this.audioContentContentType = audioContentContentType;
        return this;
    }

    public void setAudioContentContentType(String audioContentContentType) {
        this.audioContentContentType = audioContentContentType;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public Song creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public String getLyrics() {
        return lyrics;
    }

    public Song lyrics(String lyrics) {
        this.lyrics = lyrics;
        return this;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }

    public Set<Vote> getVotes() {
        return votes;
    }

    public Song votes(Set<Vote> votes) {
        this.votes = votes;
        return this;
    }

    public Song addVote(Vote vote) {
        this.votes.add(vote);
        vote.setSong(this);
        return this;
    }

    public Song removeVote(Vote vote) {
        this.votes.remove(vote);
        vote.setSong(null);
        return this;
    }

    public void setVotes(Set<Vote> votes) {
        this.votes = votes;
    }

    public User getAuthor() {
        return author;
    }

    public Song author(User user) {
        this.author = user;
        return this;
    }

    public void setAuthor(User user) {
        this.author = user;
    }

    public Band getBand() {
        return band;
    }

    public Song band(Band band) {
        this.band = band;
        return this;
    }

    public void setBand(Band band) {
        this.band = band;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Song)) {
            return false;
        }
        return id != null && id.equals(((Song) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Song{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", duration='" + getDuration() + "'" +
            ", audioContent='" + getAudioContent() + "'" +
            ", audioContentContentType='" + getAudioContentContentType() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", lyrics='" + getLyrics() + "'" +
            "}";
    }
}
