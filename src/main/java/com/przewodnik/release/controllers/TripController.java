package com.przewodnik.release.controllers;

import com.przewodnik.release.models.Trip;
import com.przewodnik.release.models.TripSection;
import com.przewodnik.release.services.TripRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

class TripNotFoundException extends RuntimeException{
    public TripNotFoundException(Long id) { super("Could not find trip " + id);}
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

@RestController
public class TripController {
    private final TripRepository repository;

    public TripController(TripRepository repository){
        this.repository = repository;
    }

    @GetMapping(value = "/api/trips")
    List<Trip> all(){
        return repository.findAll();
    }
    @GetMapping(value = "/api/trips/{id}")
    Trip one(@PathVariable Long id){
        return repository.findById(id).orElseThrow(() -> new TripNotFoundException(id));
    }

    @GetMapping(value ="/api/trips/")
    List<TripSection> tripTripSection(@RequestParam Optional<Long> tripTripSectionId){
        if(tripTripSectionId.isPresent()) {
            Trip selectedTrip = one(tripTripSectionId.get());
            return selectedTrip.getTripSection();
        }
        return new ArrayList<>();
    }
}
