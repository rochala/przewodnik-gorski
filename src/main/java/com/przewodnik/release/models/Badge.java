package com.przewodnik.release.models;

import javax.persistence.*;
import java.util.ArrayList;
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

    @OneToMany(mappedBy = "badge", cascade = CascadeType.ALL)
    private List<Trip> badgeTrips = new ArrayList<>();

}
