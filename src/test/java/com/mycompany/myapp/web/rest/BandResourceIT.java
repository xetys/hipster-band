package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.HipsterBandApp;
import com.mycompany.myapp.domain.Band;
import com.mycompany.myapp.repository.BandRepository;
import com.mycompany.myapp.service.BandService;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link BandResource} REST controller.
 */
@SpringBootTest(classes = HipsterBandApp.class)
public class BandResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_GENRE = "AAAAAAAAAA";
    private static final String UPDATED_GENRE = "BBBBBBBBBB";

    @Autowired
    private BandRepository bandRepository;

    @Mock
    private BandRepository bandRepositoryMock;

    @Mock
    private BandService bandServiceMock;

    @Autowired
    private BandService bandService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restBandMockMvc;

    private Band band;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BandResource bandResource = new BandResource(bandService);
        this.restBandMockMvc = MockMvcBuilders.standaloneSetup(bandResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Band createEntity(EntityManager em) {
        Band band = new Band()
            .name(DEFAULT_NAME)
            .genre(DEFAULT_GENRE);
        return band;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Band createUpdatedEntity(EntityManager em) {
        Band band = new Band()
            .name(UPDATED_NAME)
            .genre(UPDATED_GENRE);
        return band;
    }

    @BeforeEach
    public void initTest() {
        band = createEntity(em);
    }

    @Test
    @Transactional
    public void createBand() throws Exception {
        int databaseSizeBeforeCreate = bandRepository.findAll().size();

        // Create the Band
        restBandMockMvc.perform(post("/api/bands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(band)))
            .andExpect(status().isCreated());

        // Validate the Band in the database
        List<Band> bandList = bandRepository.findAll();
        assertThat(bandList).hasSize(databaseSizeBeforeCreate + 1);
        Band testBand = bandList.get(bandList.size() - 1);
        assertThat(testBand.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBand.getGenre()).isEqualTo(DEFAULT_GENRE);
    }

    @Test
    @Transactional
    public void createBandWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bandRepository.findAll().size();

        // Create the Band with an existing ID
        band.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBandMockMvc.perform(post("/api/bands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(band)))
            .andExpect(status().isBadRequest());

        // Validate the Band in the database
        List<Band> bandList = bandRepository.findAll();
        assertThat(bandList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = bandRepository.findAll().size();
        // set the field null
        band.setName(null);

        // Create the Band, which fails.

        restBandMockMvc.perform(post("/api/bands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(band)))
            .andExpect(status().isBadRequest());

        List<Band> bandList = bandRepository.findAll();
        assertThat(bandList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBands() throws Exception {
        // Initialize the database
        bandRepository.saveAndFlush(band);

        // Get all the bandList
        restBandMockMvc.perform(get("/api/bands?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(band.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].genre").value(hasItem(DEFAULT_GENRE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllBandsWithEagerRelationshipsIsEnabled() throws Exception {
        BandResource bandResource = new BandResource(bandServiceMock);
        when(bandServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restBandMockMvc = MockMvcBuilders.standaloneSetup(bandResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restBandMockMvc.perform(get("/api/bands?eagerload=true"))
        .andExpect(status().isOk());

        verify(bandServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllBandsWithEagerRelationshipsIsNotEnabled() throws Exception {
        BandResource bandResource = new BandResource(bandServiceMock);
            when(bandServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restBandMockMvc = MockMvcBuilders.standaloneSetup(bandResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restBandMockMvc.perform(get("/api/bands?eagerload=true"))
        .andExpect(status().isOk());

            verify(bandServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getBand() throws Exception {
        // Initialize the database
        bandRepository.saveAndFlush(band);

        // Get the band
        restBandMockMvc.perform(get("/api/bands/{id}", band.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(band.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.genre").value(DEFAULT_GENRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBand() throws Exception {
        // Get the band
        restBandMockMvc.perform(get("/api/bands/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBand() throws Exception {
        // Initialize the database
        bandService.save(band);

        int databaseSizeBeforeUpdate = bandRepository.findAll().size();

        // Update the band
        Band updatedBand = bandRepository.findById(band.getId()).get();
        // Disconnect from session so that the updates on updatedBand are not directly saved in db
        em.detach(updatedBand);
        updatedBand
            .name(UPDATED_NAME)
            .genre(UPDATED_GENRE);

        restBandMockMvc.perform(put("/api/bands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBand)))
            .andExpect(status().isOk());

        // Validate the Band in the database
        List<Band> bandList = bandRepository.findAll();
        assertThat(bandList).hasSize(databaseSizeBeforeUpdate);
        Band testBand = bandList.get(bandList.size() - 1);
        assertThat(testBand.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBand.getGenre()).isEqualTo(UPDATED_GENRE);
    }

    @Test
    @Transactional
    public void updateNonExistingBand() throws Exception {
        int databaseSizeBeforeUpdate = bandRepository.findAll().size();

        // Create the Band

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBandMockMvc.perform(put("/api/bands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(band)))
            .andExpect(status().isBadRequest());

        // Validate the Band in the database
        List<Band> bandList = bandRepository.findAll();
        assertThat(bandList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBand() throws Exception {
        // Initialize the database
        bandService.save(band);

        int databaseSizeBeforeDelete = bandRepository.findAll().size();

        // Delete the band
        restBandMockMvc.perform(delete("/api/bands/{id}", band.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Band> bandList = bandRepository.findAll();
        assertThat(bandList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Band.class);
        Band band1 = new Band();
        band1.setId(1L);
        Band band2 = new Band();
        band2.setId(band1.getId());
        assertThat(band1).isEqualTo(band2);
        band2.setId(2L);
        assertThat(band1).isNotEqualTo(band2);
        band1.setId(null);
        assertThat(band1).isNotEqualTo(band2);
    }
}
