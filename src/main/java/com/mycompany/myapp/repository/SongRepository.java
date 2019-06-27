package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Song;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Song entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SongRepository extends JpaRepository<Song, Long> {

    @Query("select song from Song song where song.author.login = ?#{principal.username}")
    List<Song> findByAuthorIsCurrentUser();

}
