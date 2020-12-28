package com.przewodnik.release.services;

import org.springframework.stereotype.Service;

@Service
public class TripService implements ITripService {

    public TripService(){

    }
    @Override
    public String getTrip() {
        return "PLACEHOLDER TRIP";
    }
}
