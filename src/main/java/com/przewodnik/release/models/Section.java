package com.przewodnik.release.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "sections")
public class Section {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Integer startToEndPoints;
    private Integer endToStartPoints;
    private Double length;

    @ManyToOne
    @JoinColumn(name="start_id", nullable = false)
    private Location start;

    @ManyToOne
    @JoinColumn(name="end_id", nullable = false)
    private Location end;

    @OneToMany(mappedBy = "section", cascade = CascadeType.ALL)
    private List<TripSection> sections  = new ArrayList<>();

    protected Section() {}

    public Section(Location start, Location end, Integer startToEndPoints, Integer endToStartPoints, Double length) {
        this.start = start;
        this.end = end;
        this.startToEndPoints = startToEndPoints;
        this.endToStartPoints = endToStartPoints;
        this.length = length;
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

    @Override
    public String toString() {
        return "Section{" +
                "id=" + id +
                ", startToEndPoints=" + startToEndPoints +
                ", endToStartPoints=" + endToStartPoints +
                ", length=" + length +
                ", start=" + start +
                ", end=" + end +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Section section = (Section) o;
        return startToEndPoints.equals(section.startToEndPoints) &&
                endToStartPoints.equals(section.endToStartPoints) &&
                length.equals(section.length) &&
                start.equals(section.start) &&
                end.equals(section.end);
    }

    @Override
    public int hashCode() {
        return Objects.hash(startToEndPoints, endToStartPoints, length, start, end);
    }
}
