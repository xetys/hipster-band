package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Band;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BandExtendedRepository extends BandRepository {

    @Query("select band " +
        "from Band band " +
        "inner join band.members m " +
        "where m.login = ?#{principal.username} or 1 = ?#{hasRole('ROLE_ADMIN') ? 1 : 0} " +
        "group by band.id, band.genre, band.name")
    List<Band> findMyVisibleBands();

}
