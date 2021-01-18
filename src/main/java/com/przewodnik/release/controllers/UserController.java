package com.przewodnik.release.controllers;

import com.przewodnik.release.models.User;
import com.przewodnik.release.services.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

@RestController
public class UserController {

    private final UserRepository repository;

    UserController(UserRepository repository) {
        this.repository = repository;
    }


    @GetMapping(value= "/api/users")
    List<User> all() {
        return repository.findAll();
    }

    @PostMapping(value= "/api/users")
    User newUser(@RequestBody User newSection) {
        return repository.save(newSection);
    }

    @GetMapping(value = "/api/users/{id}")
    User one(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }
    @GetMapping(value = "/api/users_email/{email}")
    User getByEmail(@PathVariable String email){
        User user = repository.findByEmail(email);
        if(user == null){
            throw new UserEmailNotFoundException(email);
        }
        return user;
    }
}
