package com.przewodnik.release.controllers;

import com.przewodnik.release.models.Trip;
import com.przewodnik.release.models.TripSection;
import com.przewodnik.release.services.TripRepository;
import com.przewodnik.release.services.TripSectionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

class TripNotFoundException extends RuntimeException {
    public TripNotFoundException(Long id) {
        super("Could not find trip " + id);
    }
}

@ControllerAdvice
class TripNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(SectionNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String tripNotFoundHandler(TripNotFoundException exception) {
        return exception.getMessage();
    }
}

@CrossOrigin(origins = "http://localhost:8080", maxAge = 3600)
@RestController
public class TripController {
    private final TripRepository repository;
    private final TripSectionRepository tripSectionRepository;

    public TripController(TripRepository repository, TripSectionRepository tripSectionRepository) {
        this.repository = repository;
        this.tripSectionRepository = tripSectionRepository;
    }

    @GetMapping(value = "/api/trips")
    List<Trip> all() {
        return repository.findAll();
    }

    @GetMapping(value = "/api/trips/{id}")
    Trip one(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new TripNotFoundException(id));
    }

    @GetMapping(value = "/api/trips/")
    List<TripSection> tripTripSection(@RequestParam Optional<Long> tripTripSectionId) {
        if (tripTripSectionId.isPresent()) {
            Trip selectedTrip = one(tripTripSectionId.get());
            return selectedTrip.getTripSection();
        }
        return new ArrayList<>();
    }

    @PostMapping(value = "/api/trips")
    Trip newTrip(@RequestBody Trip newTrip) {
        for (TripSection tripSection : newTrip.getTripSection()) {
            tripSection.setTrip(newTrip);
        }
        return repository.save(newTrip);
    }

    @PutMapping(value = "/api/trips")
    Trip updateTrip(@RequestBody Trip newTrip) {
        tripSectionRepository.deleteAllByTripId(newTrip.getId());
        for (TripSection tripSection : newTrip.getTripSection()) {
            tripSection.setTrip(newTrip);
        }
        return repository.save(newTrip);
    }

    @DeleteMapping(value = "/api/trips")
    void deleteTrip(@RequestParam Long id) {
        Optional<Trip> trip = repository.findById(id);
        if (trip.isPresent()) {
            tripSectionRepository.deleteAllByTripId(trip.get().getId());
            repository.deleteById(trip.get().getId());
        } else {
            throw new TripNotFoundException(id);
        }
    }
}
