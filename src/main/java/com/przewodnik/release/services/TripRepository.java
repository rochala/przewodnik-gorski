package com.przewodnik.release.services;

import com.przewodnik.release.models.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface TripRepository extends JpaRepository<Trip, Long> {
    @Transactional
    void deleteById(Long aLong);
}
