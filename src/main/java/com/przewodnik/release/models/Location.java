package com.przewodnik.release.models;

import com.przewodnik.release.MountainRange;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private MountainRange mountainRange;
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
