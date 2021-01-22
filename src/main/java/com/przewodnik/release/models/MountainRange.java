package com.przewodnik.release.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

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
    GORY_SWIETOKRZYSKIE;
}

