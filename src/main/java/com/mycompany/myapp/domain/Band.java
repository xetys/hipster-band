package com.mycompany.myapp.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Band.
 */
@Entity
@Table(name = "band")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Band implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "genre")
    private String genre;

    @OneToMany(mappedBy = "band")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Song> songs = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "band_member",
               joinColumns = @JoinColumn(name = "band_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "member_id", referencedColumnName = "id"))
    private Set<User> members = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Band name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGenre() {
        return genre;
    }

    public Band genre(String genre) {
        this.genre = genre;
        return this;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Set<Song> getSongs() {
        return songs;
    }

    public Band songs(Set<Song> songs) {
        this.songs = songs;
        return this;
    }

    public Band addSong(Song song) {
        this.songs.add(song);
        song.setBand(this);
        return this;
    }

    public Band removeSong(Song song) {
        this.songs.remove(song);
        song.setBand(null);
        return this;
    }

    public void setSongs(Set<Song> songs) {
        this.songs = songs;
    }

    public Set<User> getMembers() {
        return members;
    }

    public Band members(Set<User> users) {
        this.members = users;
        return this;
    }

    public Band addMember(User user) {
        this.members.add(user);
        return this;
    }

    public Band removeMember(User user) {
        this.members.remove(user);
        return this;
    }

    public void setMembers(Set<User> users) {
        this.members = users;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Band)) {
            return false;
        }
        return id != null && id.equals(((Band) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Band{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", genre='" + getGenre() + "'" +
            "}";
    }
}
