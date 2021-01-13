package com.przewodnik.release.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "trip_sections")
public class TripSection {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Boolean direction;

    @OneToOne
    private Section section;
    @ManyToOne
    @JoinColumn(name="trip_id")
    private Trip trip;

    protected TripSection() {}

    public TripSection(Boolean direction, Section section, Trip trip) {
        this.direction = direction;
        this.section = section;
        this.trip = trip;
    }

    public Long getId() {
        return id;
    }

    public Boolean getDirection() {
        return direction;
    }

    public Section getSection() {
        return section;
    }

    public Trip getTrip() {
        return trip;
    }

    @Override
    public String toString() {
        return "TripSection{" +
                "id=" + id +
                ", direction=" + direction +
                ", section=" + section +
                ", trip=" + trip +
                '}';
    }
}
