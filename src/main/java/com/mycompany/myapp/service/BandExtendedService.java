package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Band;
import com.mycompany.myapp.repository.BandExtendedRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BandExtendedService extends BandService {
    private final BandExtendedRepository bandExtendedRepository;

    public BandExtendedService(BandExtendedRepository bandExtendedRepository) {
        super(bandExtendedRepository);
        this.bandExtendedRepository = bandExtendedRepository;
    }

    @Override
    public List<Band> findAll() {
        return bandExtendedRepository.findMyVisibleBands();
    }
}
