package com.przewodnik.release.models;

import javax.persistence.*;

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

    @ManyToOne
    @JoinColumn(name="trip_id")
    private Trip trip;

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
}
