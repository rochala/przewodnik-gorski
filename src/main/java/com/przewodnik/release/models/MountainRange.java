package com.przewodnik.release.models;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

public enum MountainRange {
    TATRY("Tatry") ,
    BESKIDY_ZACHODNIE("Beskidy Zachodnie"),
    BESKIDY_WSCHODNIE("Beskidy Wschodnie"),
    SUDETY("Sudety"),
    GORY_SWIETOKRZYSKIE("Góry Świętokrzyskie");

    String fullName;
    Integer id;
    MountainRange(String fullName) {
        this.fullName = fullName;
    }

    public String getFullName() {
        return fullName;
    }
}

