package com.przewodnik.release.models;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "trip_sections")
public class TripSection {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column()
    private Boolean direction;

    @Column()
    private Integer orderSection;

    @ManyToOne
    @JoinColumn(name="section_id")
    private Section section;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="trip_id", nullable = false)
    private Trip trip;

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    protected TripSection() {}

    public TripSection(Boolean direction, Section section, Trip trip, Integer orderSection) {
        this.direction = direction;
        this.section = section;
        this.trip = trip;
        this.orderSection = orderSection;
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

    public Integer getOrder() { return orderSection;}

    @Override
    public String toString() {
        return "TripSection{" +
                "id=" + id +
                ", orderSection=" + orderSection +
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
