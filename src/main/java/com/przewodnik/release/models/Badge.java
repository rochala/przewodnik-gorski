package com.przewodnik.release.models;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

enum Grade {
    Popularna,
    MałaBrązowa,
}
@Entity
@Table(name="badges")
public class Badge {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private Grade grade;

    @Column()
    private Date dateAcquired;

    @Column()
    private int pointsNeeded;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public List<Trip> getTrips() {
        return trips;
    }

    @OneToMany(mappedBy = "badge", cascade = CascadeType.ALL)
    private List<Trip> trips;

    public Badge(Long id, Grade grade, Date dateAcquired, int pointsNeeded, User user, List<Trip> trips) {
        this.id = id;
        this.grade = grade;
        this.dateAcquired = dateAcquired;
        this.pointsNeeded = pointsNeeded;
        this.user = user;
        this.trips = trips;
    }

    public Badge() {

    }

    public Long getId() {
        return id;
    }

    public Grade getGrade() {
        return grade;
    }

    public Date getDateAcquired() {
        return dateAcquired;
    }

    public int getPointsNeeded() {
        return pointsNeeded;
    }

    @Override
    public String toString() {
        return "Badge{" +
                "id=" + id +
                ", grade=" + grade +
                ", dateAcquired=" + dateAcquired +
                ", pointsNeeded=" + pointsNeeded +
                ", trips=" + trips +
                '}';
    }
}
