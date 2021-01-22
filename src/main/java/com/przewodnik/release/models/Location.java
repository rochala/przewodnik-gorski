package com.przewodnik.release.models;

import javax.persistence.*;
import java.util.List;
import java.util.ArrayList;
import java.util.Objects;


@Entity
@Table(name = "locations")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String locationName;

    @Column(nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private MountainRange mountainRange;

    @Column(nullable = false)
    private Double height;

    @OneToMany(mappedBy = "start", cascade = CascadeType.ALL)
    private List<Section> starts  = new ArrayList<>();

    @OneToMany(mappedBy = "end", cascade = CascadeType.ALL)
    private List<Section> ends  = new ArrayList<>();

    protected Location() {
    }

    public Location(MountainRange mountainRange, Double height) {
        this.mountainRange = mountainRange;
        this.height = height;
    }

    @Override
    public String toString() {
        return String.format("Id: %d, Mountain range: %s, Height: %s", id, mountainRange, height);
    }

    public Long getId() {
        return id;
    }

    public MountainRange getMountainRange() {
        return mountainRange;
    }

    public Double getHeight() {
        return height;
    }

    public String getLocationName() {
        return locationName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Location location = (Location) o;
        return locationName.equals(location.locationName) &&
                mountainRange == location.mountainRange &&
                height.equals(location.height);
    }

    @Override
    public int hashCode() {
        return Objects.hash(locationName, mountainRange, height);
    }
}
