package com.przewodnik.release.models;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
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

    @Transient
    private int sumPoints;

    @Column()
    private Status status;

    @Column()
    private boolean leaderAttendance;

    @Transient()
    private String tripName;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "badge_id", nullable = false)
    private Badge badge;

    @OneToMany(mappedBy = "trip", cascade = CascadeType.MERGE)
    private List<TripSection> tripSection;

    public Trip(Date startDate, Date endDate, Status status, boolean leaderAttendance, User user, Badge badge) {
        this.startDate = startDate;
        this.endDate = endDate;
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

    public void setUser(User user) {
        this.user = user;
    }

    public void setBadge(Badge badge) {
        this.badge = badge;
    }

    public int getSumPoints() {
        int sum = 0;
        for (TripSection tripSection : this.getTripSection()){
            boolean direction = tripSection.getDirection();
            if(direction){
                sumPoints+=tripSection.getSection().getStartToEndPoints();
            }
            else {
                sumPoints+=tripSection.getSection().getEndToStartPoints();
            }
        }
        return sum;
    }

    public Status getStatus() {
        return status;
    }

    public String getTripName() {
        String tripName ="";
        List<TripSection> sections = this.getTripSection();
        if (sections.size() >= 1)
        {
            tripName+= sections.get(0).getSection().getStart().getLocationName() + " - "
                    + sections.get(sections.size()-1).getSection().getEnd().getLocationName();
        }
        return tripName;
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
