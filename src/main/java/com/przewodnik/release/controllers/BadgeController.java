package com.przewodnik.release.controllers;

import com.przewodnik.release.models.Badge;
import com.przewodnik.release.models.Trip;
import com.przewodnik.release.models.User;
import com.przewodnik.release.services.BadgeRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
class BadgeNotFoundException extends RuntimeException{
    public BadgeNotFoundException(Long id) {
        super("Could not find badge " + id);
    }
}

@RestController
public class BadgeController {

    private final BadgeRepository repository;

    public BadgeController(BadgeRepository repository){
        this.repository = repository;
    }

    @GetMapping(value = "/api/badges")
    List<Badge> all(){
        return repository.findAll();
    }

    @GetMapping(value = "/api/badges/{id}")
    Badge one(@PathVariable Long id)
    {
        return repository.findById(id).orElseThrow(() -> new BadgeNotFoundException(id));
    }
    @GetMapping(value ="/api/badges/")
    List<Trip> badgeTrips(@RequestParam Optional<Long> tripsBadgeId){
        if (tripsBadgeId.isPresent()){
            return one(tripsBadgeId.get()).getTrips();
        }
        return new ArrayList<>();
    }
}
