package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Vote;
import com.mycompany.myapp.repository.VoteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Vote}.
 */
@Service
@Transactional
public class VoteService {

    private final Logger log = LoggerFactory.getLogger(VoteService.class);

    private final VoteRepository voteRepository;

    public VoteService(VoteRepository voteRepository) {
        this.voteRepository = voteRepository;
    }

    /**
     * Save a vote.
     *
     * @param vote the entity to save.
     * @return the persisted entity.
     */
    public Vote save(Vote vote) {
        log.debug("Request to save Vote : {}", vote);
        return voteRepository.save(vote);
    }

    /**
     * Get all the votes.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Vote> findAll() {
        log.debug("Request to get all Votes");
        return voteRepository.findAll();
    }


    /**
     * Get one vote by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Vote> findOne(Long id) {
        log.debug("Request to get Vote : {}", id);
        return voteRepository.findById(id);
    }

    /**
     * Delete the vote by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Vote : {}", id);
        voteRepository.deleteById(id);
    }
}
