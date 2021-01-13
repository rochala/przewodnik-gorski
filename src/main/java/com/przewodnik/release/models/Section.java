package com.przewodnik.release.models;

import javax.persistence.*;

@Entity
public class Section {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Integer startToEndPoints;
    private Integer endToStartPoints;
    private Double length;
    private String description;

    @OneToOne
    private Location start;
    @OneToOne
    private Location end;

    protected Section() {}

    public Section(Long id, Location start, Location end, Integer startToEndPoints, Integer endToStartPoints, Double length, String description) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.startToEndPoints = startToEndPoints;
        this.endToStartPoints = endToStartPoints;
        this.length = length;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public Location getStart() {
        return start;
    }

    public Location getEnd() {
        return end;
    }

    public Integer getStartToEndPoints() {
        return startToEndPoints;
    }

    public Integer getEndToStartPoints() {
        return endToStartPoints;
    }

    public Double getLength() {
        return length;
    }

    public String getDescription() {
        return description;
    }
}
