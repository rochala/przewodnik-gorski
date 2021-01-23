package com.przewodnik.release.services;

import com.przewodnik.release.models.TripSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "trip_sections", path = "trip_sections")
public interface TripSectionRepository extends JpaRepository<TripSection, Long> {
    @Transactional
    void deleteAllByTripId(Long id);
}
