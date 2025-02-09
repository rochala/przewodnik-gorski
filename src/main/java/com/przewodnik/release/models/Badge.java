package com.przewodnik.release.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


enum Grade {
    @JsonProperty("Popularna")
    POPULARNA,
    @JsonProperty("Mała Brązowa")
    MALA_BRAZOWA
}

@Entity
@Table(name = "badges")
public class Badge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Grade grade;

    @Column()
    private Date dateAcquired;

    @Transient
    private int sumPointsForBadge;

    @Column()
    private int pointsNeeded;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @OneToMany(mappedBy = "badge", cascade = CascadeType.PERSIST)
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

    public List<Trip> getTrips() {
        return trips;
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


    public int getSumPointForBadge() {
        List<TripSection> sameSections = new ArrayList<>();
        int sumPoints = 0;
        for (Trip trip : this.getTrips()) {
            for (TripSection tripSection : trip.getTripSection()) {
                if (!sameSections.contains(tripSection)) {
                    sameSections.add(tripSection);
                    boolean direction = tripSection.getDirection();
                    if (direction) {
                        sumPoints += tripSection.getSection().getStartToEndPoints();
                    } else {
                        sumPoints += tripSection.getSection().getEndToStartPoints();
                    }
                }
            }
        }
        return sumPoints;
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
                ", actualBadgePoints=" + sumPointsForBadge +
                ", pointsNeeded=" + pointsNeeded +
                ", trips=" + trips +
                '}';
    }
}
