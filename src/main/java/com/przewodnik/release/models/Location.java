package com.przewodnik.release.models;

import javax.persistence.*;
import java.util.List;
import java.util.ArrayList;
import java.util.Objects;


@Entity
@Table(name = "locations")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String locationName;

    @Column(nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private MountainRange mountainRange;

    @Column(nullable = false)
    private Double height;

    @OneToMany(mappedBy = "start", cascade = CascadeType.MERGE)
    private List<Section> starts  = new ArrayList<>();

    @OneToMany(mappedBy = "end", cascade = CascadeType.MERGE)
    private List<Section> ends  = new ArrayList<>();

    protected Location() {
    }


    public Location(String locationName, MountainRange mountainRange, Double height, List<Section> starts, List<Section> ends) {
        this.mountainRange = mountainRange;
        this.height = height;
        this.starts = starts;
        this.ends=ends;
        this.locationName = locationName;
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

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public void setMountainRange(MountainRange mountainRange) {
        this.mountainRange = mountainRange;
    }

    public void setHeight(Double height) {
        this.height = height;
    }
}

