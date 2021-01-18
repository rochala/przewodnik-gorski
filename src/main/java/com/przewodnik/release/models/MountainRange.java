package com.przewodnik.release.models;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

public enum MountainRange {
    TATRY("Tatry",0) ,
    BESKIDY_ZACHODNIE("Beskidy Zachodnie", 1),
    BESKIDY_WSCHODNIE("Beskidy Wschodnie", 2),
    SUDETY("Sudety", 3),
    GORY_SWIETOKRZYSKIE("Góry Świętokrzyskie", 4);

    String fullName;
    Integer id;
    MountainRange(String fullName, Integer id) {
        this.fullName = fullName;
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public Integer getId() {
        return id;
    }
}

