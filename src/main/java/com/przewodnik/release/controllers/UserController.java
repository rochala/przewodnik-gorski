package com.przewodnik.release.controllers;

import com.przewodnik.release.models.Badge;
import com.przewodnik.release.models.User;
import com.przewodnik.release.services.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("Could not find user " + id);
    }
}

class UserEmailNotFoundException extends RuntimeException {
    public UserEmailNotFoundException(String email) {
        super("Could not find user " + email);
    }
}

@ControllerAdvice
class UserNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String userNotFoundHandler(UserNotFoundException exception) {
        return exception.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(UserEmailNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String userEmailNotFoundHandler(UserEmailNotFoundException exception) {
        return exception.getMessage();
    }
}

@CrossOrigin(origins = "http://localhost:8080", maxAge = 3600)
@RestController
public class UserController {

    private final UserRepository repository;

    UserController(UserRepository repository) {
        this.repository = repository;
    }


    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value = "/api/users")
    List<User> all() {
        return repository.findAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value = "/api/users")
    User newUser(@RequestBody User newSection) {
        return repository.save(newSection);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value = "/api/users/{id}")
    User one(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value = "/api/users_email/{email}")
    User getByEmail(@PathVariable String email) {
        User user = repository.findByEmail(email);
        if (user == null) {
            throw new UserEmailNotFoundException(email);
        }
        return user;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value = "/api/users/badges")
    List<Badge> userBadges(@RequestParam Optional<String> email) {
        if (email.isPresent()) {
            User selectedUser = repository.findByEmail(email.get());
            if (selectedUser == null) {
                throw new UserEmailNotFoundException(email.get());
            }
            return selectedUser.getBadges();
        } else return new ArrayList<>();
    }
}
