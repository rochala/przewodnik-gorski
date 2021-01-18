package com.przewodnik.release.controllers;

import com.przewodnik.release.models.MountainRange;
import com.przewodnik.release.models.Section;
import com.przewodnik.release.services.SectionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


class SectionNotFoundException extends RuntimeException {
    public SectionNotFoundException(Long id) {
        super("Could not find section " + id);
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

@RestController
public class SectionController {

    private final SectionRepository repository;

    SectionController(SectionRepository repository) {
        this.repository = repository;
    }

    @GetMapping(value= "api/sections")
    List<Section> getByRange(@RequestParam Optional<MountainRange> range){
        if (range.isPresent()) {
            return repository.findByEnd_MountainRangeAndStart_MountainRange(range.get(), range.get());
        }
        else {
            return repository.findAll();
        }
    }

    @PostMapping(value= "/api/sections")
    Section newSection(@RequestBody Section newSection) {
        return repository.save(newSection);
    }

}
