package com.przewodnik.release;

import com.przewodnik.release.models.Location;
import com.przewodnik.release.models.MountainRange;
import com.przewodnik.release.models.Section;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;

@SpringBootTest
public class SectionTests {
    Location loc1 = new Location("punkt1", MountainRange.BESKIDY_WSCHODNIE, 1250.0, new ArrayList<Section>(), new ArrayList<Section>());
    Location loc2 = new Location("punkt2", MountainRange.BESKIDY_WSCHODNIE, 1250.0, new ArrayList<Section>(), new ArrayList<Section>());
    Location loc3 = new Location("punkt3", MountainRange.BESKIDY_WSCHODNIE, 1250.0, new ArrayList<Section>(), new ArrayList<Section>());

    Section section1 = new Section(loc1, loc2, 2, 4, 1337.0);
    Section section2 = new Section(loc1, loc2, 2, 4, 1337.0);

    @AfterEach
    void resetSection() {
        section1 = new Section(loc1, loc2, 2, 4, 1337.0);
        section2 = new Section(loc1, loc2, 2, 4, 1337.0);
    }

    @Test
    void sectionEquals() {
        Assertions.assertEquals(section1, section2);
    }

    @Test
    void locationNotEqualsStart() {
        section1.setStart(loc3);
        Assertions.assertNotEquals(section1, section2);
    }

    @Test
    void locationNotEqualsEnd() {
        section1.setEnd(loc3);
        Assertions.assertNotEquals(section1, section2);
    }

    @Test
    void locationNotEqualsStartToEndPoints() {
        section1.setStartToEndPoints(10);
        Assertions.assertNotEquals(section1, section2);
    }

    @Test
    void locationNotEqualsEndToStartPoints() {
        section1.setEndToStartPoints(10);
        Assertions.assertNotEquals(section1, section2);
    }

    @Test
    void locationNotEqualsLength() {
        section1.setLength(10.0);
        Assertions.assertNotEquals(section1, section2);
    }
}
