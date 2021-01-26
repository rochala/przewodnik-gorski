package com.przewodnik.release;

import com.przewodnik.release.models.*;
import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Arrays;

public class BadgeTests {
    Location loc1 = new Location("punkt1", MountainRange.BESKIDY_WSCHODNIE, 1250.0, new ArrayList<Section>(), new ArrayList<Section>());
    Location loc2 = new Location("punkt2", MountainRange.BESKIDY_WSCHODNIE, 1250.0, new ArrayList<Section>(), new ArrayList<Section>());
    Location loc3 = new Location("punkt3", MountainRange.BESKIDY_WSCHODNIE, 1250.0, new ArrayList<Section>(), new ArrayList<Section>());

    Section section1 = new Section(loc1, loc2, 2, 4, 1337.0);
    Section section2 = new Section(loc2, loc3, 4, 6, 1000.0);
    Section section3 = new Section(loc1, loc3, 6, 8, 2337.0);

    ArrayList<TripSection> sections1 = new ArrayList<>(Arrays.asList(new TripSection(true, section1, null, 0),
            new TripSection(true, section2, null, 1),
            new TripSection(false, section2, null, 2),
            new TripSection(false, section1, null, 3)
            ));

    ArrayList<TripSection> sections2 = new ArrayList<>(Arrays.asList(new TripSection(true, section1, null, 0),
            new TripSection(true, section2, null, 1),
            new TripSection(false, section3, null, 2)
    ));

    Trip trip1 = new Trip(null, null, null, true, null, null, sections1);
    Trip trip2 = new Trip(null, null, null, true, null, null, sections2);

    ArrayList<Trip> trips = new ArrayList<>();

    Badge badge = new Badge(1L, null, null, 70, null, trips);

    @AfterEach
    void resetTrips() {
        trips.clear();
    }

    @Test
    void getSumPointsForBadgeManyTrips() {
        trips.add(trip1);
        trips.add(trip2);
        Assertions.assertEquals(badge.getSumPointForBadge(), 24);
    }


    @Test
    void getSumPointsForBadgeNoTrips() {
        Assertions.assertEquals(badge.getSumPointForBadge(), 0);
    }

    @Test
    void getSumPointsForBadgeOneTrip() {
        trips.add(trip1);
        Assertions.assertEquals(badge.getSumPointForBadge(), 16);
    }
}