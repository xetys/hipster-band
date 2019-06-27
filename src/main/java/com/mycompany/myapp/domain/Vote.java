package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Vote.
 */
@Entity
@Table(name = "vote")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Vote implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "vote_date", nullable = false)
    private LocalDate voteDate;

    @ManyToOne
    @JsonIgnoreProperties("votes")
    private User member;

    @ManyToOne
    @JsonIgnoreProperties("votes")
    private Song song;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getVoteDate() {
        return voteDate;
    }

    public Vote voteDate(LocalDate voteDate) {
        this.voteDate = voteDate;
        return this;
    }

    public void setVoteDate(LocalDate voteDate) {
        this.voteDate = voteDate;
    }

    public User getMember() {
        return member;
    }

    public Vote member(User user) {
        this.member = user;
        return this;
    }

    public void setMember(User user) {
        this.member = user;
    }

    public Song getSong() {
        return song;
    }

    public Vote song(Song song) {
        this.song = song;
        return this;
    }

    public void setSong(Song song) {
        this.song = song;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Vote)) {
            return false;
        }
        return id != null && id.equals(((Vote) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Vote{" +
            "id=" + getId() +
            ", voteDate='" + getVoteDate() + "'" +
            "}";
    }
}
