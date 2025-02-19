package com.przewodnik.release.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "sections")
public class Section {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer startToEndPoints;
    private Integer endToStartPoints;
    private Double length;

    @ManyToOne
    @JoinColumn(name = "start_id", nullable = false)
    private Location start;

    @ManyToOne
    @JoinColumn(name = "end_id", nullable = false)
    private Location end;

    @OneToMany(mappedBy = "section", cascade = CascadeType.ALL)
    private final List<TripSection> sections = new ArrayList<>();

    protected Section() {
    }

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

    public void setStart(Location start) {
        this.start = start;
    }

    public Location getEnd() {
        return end;
    }

    public void setEnd(Location end) {
        this.end = end;
    }

    public Integer getStartToEndPoints() {
        return startToEndPoints;
    }

    public void setStartToEndPoints(Integer startToEndPoints) {
        this.startToEndPoints = startToEndPoints;
    }

    public Integer getEndToStartPoints() {
        return endToStartPoints;
    }

    public void setEndToStartPoints(Integer endToStartPoints) {
        this.endToStartPoints = endToStartPoints;
    }

    public Double getLength() {
        return length;
    }

    public void setLength(Double length) {
        this.length = length;
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
