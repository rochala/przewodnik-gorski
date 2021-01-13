package com.przewodnik.release.models;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

enum Status {
    Niezatwierdzona,
    Zatwierdzona
}
@Entity
@Table(name = "trips")
public class Trip {

    @Id
    @GeneratedValue
    private Long id;

    @Column()
    private Date startDate;

    @Column()
    private Date endDate;

    @Column()
    private int sumPoints;

    @Column()
    private Status status;

    @Column()
    private boolean leaderAttendance;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "trip_section")
    private List<TripSection> tripSection;

    public Trip(Date startDate, Date endDate, int sumPoints, Status status, boolean leaderAttendance, User user) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.sumPoints = sumPoints;
        this.status = status;
        this.leaderAttendance = leaderAttendance;
        this.user = user;
    }
    public Trip(){

    }
}
