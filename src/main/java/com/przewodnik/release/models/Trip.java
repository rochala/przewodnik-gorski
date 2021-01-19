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

    @ManyToOne
    @JoinColumn(name = "badge_id", nullable = false)
    private Badge badge;

    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL)
    private List<TripSection> tripSection;

    public Trip(Date startDate, Date endDate, int sumPoints, Status status, boolean leaderAttendance, User user, Badge badge) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.sumPoints = sumPoints;
        this.status = status;
        this.leaderAttendance = leaderAttendance;
        this.user = user;
        this.badge = badge;
    }
    public Trip(){

    }

    public Long getId() {
        return id;
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public int getSumPoints() {
        return sumPoints;
    }

    public Status getStatus() {
        return status;
    }

    public boolean isLeaderAttendance() {
        return leaderAttendance;
    }

    public List<TripSection> getTripSection() {
        return tripSection;
    }

    @Override
    public String toString() {
        return "Trip{" +
                "id=" + id +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", sumPoints=" + sumPoints +
                ", status=" + status +
                ", leaderAttendance=" + leaderAttendance +
                ", tripSection=" + tripSection +
                '}';
    }
}
