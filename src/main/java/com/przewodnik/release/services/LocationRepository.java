package com.przewodnik.release.services;

import com.przewodnik.release.models.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "sections", path = "sections")
public interface LocationRepository extends JpaRepository<Location, Long> {
}
