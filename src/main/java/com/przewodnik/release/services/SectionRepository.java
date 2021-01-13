package com.przewodnik.release.services;

import com.przewodnik.release.models.Section;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "sections", path = "sections")
public interface SectionRepository extends PagingAndSortingRepository<Section,Long> {
    List<Section> findByEndToStartPointsGreaterThanEqual(@Param("minpoints") Integer points);
}
