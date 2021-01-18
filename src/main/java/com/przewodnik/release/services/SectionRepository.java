package com.przewodnik.release.services;

import com.przewodnik.release.models.MountainRange;
import com.przewodnik.release.models.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "sections", path = "sections")
public interface SectionRepository extends JpaRepository<Section,Long> {
    List<Section> findByEnd_MountainRangeAndStart_MountainRange(MountainRange rangeEnd, MountainRange rangeStart);
}
