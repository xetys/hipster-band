package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Band;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Band entity.
 */
@Repository
public interface BandRepository extends JpaRepository<Band, Long> {

    @Query(value = "select distinct band from Band band left join fetch band.members",
        countQuery = "select count(distinct band) from Band band")
    Page<Band> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct band from Band band left join fetch band.members")
    List<Band> findAllWithEagerRelationships();

    @Query("select band from Band band left join fetch band.members where band.id =:id")
    Optional<Band> findOneWithEagerRelationships(@Param("id") Long id);

}
