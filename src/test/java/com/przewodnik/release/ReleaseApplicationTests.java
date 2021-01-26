package com.przewodnik.release;

import com.przewodnik.release.models.Location;
import com.przewodnik.release.models.Section;

import com.przewodnik.release.models.MountainRange;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;

@SpringBootTest
class ReleaseApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void sectionEquals() {
		Location loc1 = new Location("punkt1", MountainRange.BESKIDY_WSCHODNIE, 1250.0, new ArrayList<Section>(), new ArrayList<Section>());
		Location loc2 = new Location("punkt2", MountainRange.BESKIDY_WSCHODNIE, 1250.0, new ArrayList<Section>(), new ArrayList<Section>());
		Location loc3 = new Location("punkt3", MountainRange.BESKIDY_WSCHODNIE, 1250.0, new ArrayList<Section>(), new ArrayList<Section>());

		Section section1 = new Section(loc1, loc2, 2, 4, 1337.0);
		Section section2 = new Section(loc1, loc2, 2, 4, 1337.0);

		Assertions.assertEquals(section1.equals(section2), true);

		section2.setStart(loc3);
		Assertions.assertEquals(section1.equals(section2), false);

		section2.setStart(loc1);
		Assertions.assertEquals(section1.equals(section2), true);
		section2.setEnd(loc3);

		Assertions.assertEquals(section1.equals(section2), false);

		section2.setEnd(loc2);
		Assertions.assertEquals(section1.equals(section2), true);
		section2.setStartToEndPoints(1);

		Assertions.assertEquals(section1.equals(section2), false);

		section2.setStartToEndPoints(2);
		Assertions.assertEquals(section1.equals(section2), true);
		section2.setEndToStartPoints(3);

		Assertions.assertEquals(section1.equals(section2), false);
		section2.setEndToStartPoints(4);

		Assertions.assertEquals(section1.equals(section2), true);

		section2.setLength(100.0);
		Assertions.assertEquals(section1.equals(section2), false);
	}
}
