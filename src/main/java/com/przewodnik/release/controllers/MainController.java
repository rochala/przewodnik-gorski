package com.przewodnik.release.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin(origins = "http://localhost:8080", maxAge = 3600)
public class MainController {

    @RequestMapping(value= "/")
    public String index() {
        return "index";
    }

    @RequestMapping(value= "/sections")
    public String sections() {
        return "index";
    }
}
