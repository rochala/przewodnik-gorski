package com.przewodnik.release.models;

import javax.persistence.*;
import java.util.List;
import java.util.ArrayList;


@Entity
@Table(name = "locations")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private MountainRange mountainRange;

    @Column(nullable = false)
    private Double height;

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
}
