package com.przewodnik.release.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum MountainRange {
    @JsonProperty("Tatry")
    TATRY,
    @JsonProperty("Beskidy Zachodnie")
    BESKIDY_ZACHODNIE,
    @JsonProperty("Beskidy Wschodnie")
    BESKIDY_WSCHODNIE,
    @JsonProperty("Sudety")
    SUDETY,
    @JsonProperty("Góry Świętokrzyskie")
    GORY_SWIETOKRZYSKIE
}

