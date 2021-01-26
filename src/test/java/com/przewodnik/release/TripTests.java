package com.przewodnik.release;

import com.przewodnik.release.models.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class TripTests {
    Location loc1 = new Location("punkt1", MountainRange.BESKIDY_WSCHODNIE, 1250.0, new ArrayList<Section>(), new ArrayList<Section>());
    Location loc2 = new Location("punkt2", MountainRange.BESKIDY_WSCHODNIE, 1250.0, new ArrayList<Section>(), new ArrayList<Section>());
    Location loc3 = new Location("punkt3", MountainRange.BESKIDY_WSCHODNIE, 1250.0, new ArrayList<Section>(), new ArrayList<Section>());

    Section section1 = new Section(loc1, loc2, 2, 4, 1337.0);
    Section section2 = new Section(loc2, loc3, 4, 6, 1000.0);

    ArrayList<TripSection> sections = new ArrayList<>();


    Trip trip = new Trip(null,null, null,true,null,null, sections);

    @AfterEach
    void resetTrip() {
        sections.clear();
    }

    @Test
    void getTripNameManySections() {
        sections.add(new TripSection(true ,section1,null,0));
        sections.add(new TripSection(true, section2, null, 1));
        Assertions.assertEquals(trip.getTripName(), "punkt1 - punkt3");
    }

    @Test
    void getTripNameNoSections() {
        Assertions.assertEquals(trip.getTripName(), "");
    }

    @Test
    void getTripNameOneTrip() {
        sections.add(new TripSection(true ,section1,null,0));
        Assertions.assertEquals(trip.getTripName(), "punkt1 - punkt2");
    }

    @Test
    void getSumPointsManySections() {
        sections.add(new TripSection(true ,section1,null,0));
        sections.add(new TripSection(true, section2, null, 1));
        Assertions.assertEquals(trip.getSumPoints(), 6);
    }

    @Test
    void getSumPointsNoSections() {
        Assertions.assertEquals(trip.getSumPoints(), 0);
    }

    @Test
    void getSumPointsOneSection() {
        sections.add(new TripSection(true ,section1,null,0));
        Assertions.assertEquals(trip.getSumPoints(), 2);
    }
}
