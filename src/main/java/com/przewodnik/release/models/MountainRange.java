package com.przewodnik.release.models;

public enum MountainRange {
    TATRY("Tatry"),
    BESKIDY_ZACHODNIE("Beskidy Zachodnie"),
    BESKIDY_WSCHODNIE("Beskidy Wschodnie"),
    SUDETY("Sudety"),
    GORY_SWIETOKRZYSKIE("Góry Świętokrzyskie");

    String fullName;
    MountainRange(String fullName) {
        this.fullName = fullName;
    }
}
