package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Band;
import com.mycompany.myapp.domain.SongWithVotes;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongExtendedRepository extends SongRepository {

    @Query("select new com.mycompany.myapp.domain.SongWithVotes(song, count(distinct v)) " +
        "from Song song " +
        "inner join song.band b " +
        "inner join b.members m " +
        "left outer join song.votes v " +
        "where song.band = :band " +
        "and (m.login = ?#{principal.username} or 1 = ?#{hasRole('ROLE_ADMIN') ? 1 : 0}) " +
        "group by song")
    List<SongWithVotes> findAllByBand(@Param("band") Band band);
}
