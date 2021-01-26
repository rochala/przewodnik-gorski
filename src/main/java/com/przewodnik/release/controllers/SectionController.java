package com.przewodnik.release.controllers;

import com.przewodnik.release.models.MountainRange;
import com.przewodnik.release.models.Section;
import com.przewodnik.release.services.SectionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;


class SectionNotFoundException extends RuntimeException {
    public SectionNotFoundException(String range) {
        super("Wrong parameter argument range: " + range);
    }
}

@ControllerAdvice
class SectionNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(SectionNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String sectionNotFoundHandler(SectionNotFoundException exception) {
        return exception.getMessage();
    }
}

@CrossOrigin(origins = "http://localhost:8080", maxAge = 3600)
@RestController
public class SectionController {

    private final SectionRepository repository;

    SectionController(SectionRepository repository) {
        this.repository = repository;
    }

    @GetMapping(value = "api/sections")
    List<Section> getByRange(@RequestParam Optional<String> range) {
        if (range.isPresent()) {
            if (Arrays.stream(MountainRange.values()).anyMatch(r -> r.name().equals(range.get().toUpperCase()))) {
                List<Section> sections = repository.findByEnd_MountainRangeAndStart_MountainRange(
                        MountainRange.valueOf(range.get().toUpperCase()),
                        MountainRange.valueOf(range.get().toUpperCase()));
                if (sections.isEmpty()) {
                    throw new SectionNotFoundException(range.get());
                } else {
                    return sections;
                }
            } else {
                throw new SectionNotFoundException(range.get());
            }
        } else {
            return repository.findAll();
        }
    }

    @PostMapping(value = "/api/sections")
    Section newSection(@RequestBody Section newSection) {
        return repository.save(newSection);
    }

    @PutMapping(value = "/api/sections")
    Section updateSection(@RequestBody Section newSection) {
        return repository.save(newSection);
    }

    @DeleteMapping(value = "/api/sections")
    void deleteTrip(@RequestParam Long id) {
        Optional<Section> section = repository.findById(id);
        if (section.isPresent()) {
            repository.deleteById(section.get().getId());
        } else {
            throw new TripNotFoundException(id);
        }
    }

}
