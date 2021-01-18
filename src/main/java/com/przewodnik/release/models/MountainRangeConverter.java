package com.przewodnik.release.models;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply = true)
public class MountainRangeConverter implements AttributeConverter<MountainRange, Integer> {

    @Override
    public Integer convertToDatabaseColumn(MountainRange range) {
        return range.getId();
    }


    @Override
    public MountainRange convertToEntityAttribute(Integer code) {
        if (code == null) {
            return null;
        }

        return Stream.of(MountainRange.values())
                .filter(c -> c.getId().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
