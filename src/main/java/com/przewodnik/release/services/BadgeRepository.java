package com.przewodnik.release.services;

import com.przewodnik.release.models.Badge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "sections", path = "sections")
public interface BadgeRepository extends JpaRepository<Badge, Long> {

}
