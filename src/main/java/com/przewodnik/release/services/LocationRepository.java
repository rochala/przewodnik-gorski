package com.przewodnik.release.services;

import com.przewodnik.release.models.Location;
import com.przewodnik.release.models.MountainRange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "sections", path = "sections")
public interface LocationRepository extends JpaRepository<Location,Long> {
}
