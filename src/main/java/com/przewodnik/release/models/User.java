package com.przewodnik.release.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

enum Gender{
    M,
    K
}

@Entity
@Table(name="users")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false,unique = true)
    private Long pesel;

    @Column()
    private Date birthDate;

    @Column(nullable = false, length = 40)
    private String name;

    @Column(nullable = false, length = 40)
    private String surname;

    @Column(length = 1)
    private Gender gender;

    @Column(length = 50, unique = true)
    private String email;

    @Column()
    private boolean isDisabled;

    @Column(nullable = false, length = 10)
    private String role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Trip> trips  = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Badge> badges = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public Long getPesel() {
        return pesel;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public Gender getGender() {
        return gender;
    }

    public String getEmail() {
        return email;
    }

    public boolean isDisabled() {
        return isDisabled;
    }

    public String getRole() {
        return role;
    }

    public List<Badge> getBadges() {
        return badges;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", pesel=" + pesel +
                ", birthDate=" + birthDate +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", gender=" + gender +
                ", email='" + email + '\'' +
                ", isDisabled=" + isDisabled +
                ", role='" + role + '\'' +
                '}';
    }
}
