package com.przewodnik.release.models;

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
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @Column()
    private int pesel;

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
}
