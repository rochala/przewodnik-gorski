package com.przewodnik.release.models;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "trip_sections")
public class TripSection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column()
    private Boolean direction;

    @Column()
    private Integer sectionOrder;

    @ManyToOne
    @JoinColumn(name="section_id")
    private Section section;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="trip_id", nullable = false)
    private Trip trip;

    public TripSection() {}

    public TripSection(Boolean direction, Section section, Trip trip, Integer sectionOrder) {
        this.direction = direction;
        this.section = section;
        this.trip = trip;
        this.sectionOrder = sectionOrder;
    }

    public Long getId() {
        return id;
    }

    public Integer getSectionOrder() { return sectionOrder;}

    public Boolean getDirection() {
        return direction;
    }

    public Section getSection() {
        return section;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    @Override
    public String toString() {
        return "TripSection{" +
                "id=" + id +
                ", orderSection=" + sectionOrder +
                ", direction=" + direction +
                ", section=" + section +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TripSection that = (TripSection) o;
        return direction.equals(that.direction) &&
                section.equals(that.section);
    }

    @Override
    public int hashCode() {
        return Objects.hash(direction, section);
    }
}
