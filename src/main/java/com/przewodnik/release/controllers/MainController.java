package com.przewodnik.release.controllers;

import com.przewodnik.release.services.ITripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
    private ITripService tripService;


    @Autowired
    public MainController(ITripService tripService){
        this.tripService = tripService;
    }

    @RequestMapping({"/",""})
    public String index(Model model)
    {
        model.addAttribute("trip", tripService.getTrip());

        return "index";
    }

}
