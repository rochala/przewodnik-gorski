package com.przewodnik.release.controllers;

import com.przewodnik.release.models.Location;
import com.przewodnik.release.models.MountainRange;
import com.przewodnik.release.models.Section;
import com.przewodnik.release.services.LocationRepository;
import com.przewodnik.release.services.SectionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;


class LocationNotFoundException extends RuntimeException {
    public LocationNotFoundException(String range) {
        super("Wrong parameter argument range: " + range);
    }
}

@ControllerAdvice
class LocationNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(SectionNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String sectionNotFoundHandler(SectionNotFoundException exception) {
        return exception.getMessage();
    }
}
@CrossOrigin(origins = "http://localhost:8080", maxAge = 3600)
@RestController
public class LocationController {

    private final LocationRepository repository;

    LocationController(LocationRepository repository) {
        this.repository = repository;
    }

    @GetMapping(value= "api/locations")
    List<Location> getAll(){
        return repository.findAll();
    }

    @PostMapping(value= "/api/locations")
    Location newLocation(@RequestBody Location newLocation) {
        return repository.save(newLocation);
    }

}
