package com.przewodnik.release.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "sections")
public class Section {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Integer startToEndPoints;
    private Integer endToStartPoints;
    private Double length;
    private String description;

    @ManyToOne
    @JoinColumn(name="start_id", nullable = false)
    private Location start;

    @ManyToOne
    @JoinColumn(name="end_id", nullable = false)
    private Location end;

    @OneToMany(mappedBy = "section", cascade = CascadeType.ALL)
    private List<TripSection> sections  = new ArrayList<>();

    protected Section() {}

    public Section(Location start, Location end, Integer startToEndPoints, Integer endToStartPoints, Double length, String description) {
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

    @Override
    public String toString() {
        return "Section{" +
                "id=" + id +
                ", startToEndPoints=" + startToEndPoints +
                ", endToStartPoints=" + endToStartPoints +
                ", length=" + length +
                ", description='" + description + '\'' +
                ", start=" + start +
                ", end=" + end +
                '}';
    }
}
