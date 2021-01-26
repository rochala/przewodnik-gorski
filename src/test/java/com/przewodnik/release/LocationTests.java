package com.przewodnik.release;

import com.przewodnik.release.models.Location;
import com.przewodnik.release.models.MountainRange;
import com.przewodnik.release.models.Section;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;

public class LocationTests {
    Location loc1 = new Location("punkt testowy", MountainRange.BESKIDY_WSCHODNIE, 1250.0, new ArrayList<Section>(), new ArrayList<Section>());
    Location loc2 = new Location("punkt testowy", MountainRange.BESKIDY_WSCHODNIE, 1250.0, new ArrayList<Section>(), new ArrayList<Section>());

    @AfterEach
    void resetLocations() {
        loc1 = new Location("punkt testowy", MountainRange.BESKIDY_WSCHODNIE, 1250.0, new ArrayList<Section>(), new ArrayList<Section>());
        loc2 = new Location("punkt testowy", MountainRange.BESKIDY_WSCHODNIE, 1250.0, new ArrayList<Section>(), new ArrayList<Section>());
    }

    @Test
    void locationEquals() {
        Assertions.assertEquals(loc2, loc1);
    }

    @Test
    void locationNotEqualsLocationName() {
        loc1.setLocationName("punkt");
        Assertions.assertNotEquals(loc1, loc2);
    }

    @Test
    void locationNotEqualsMountainRange() {
        loc1.setMountainRange(MountainRange.BESKIDY_ZACHODNIE);
        Assertions.assertNotEquals(loc1, loc2);
    }

    @Test
    void locationNotEqualsHeight() {
        loc1.setHeight(0.0);
        Assertions.assertNotEquals(loc1, loc2);
    }
}
