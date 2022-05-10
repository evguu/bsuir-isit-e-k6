package com.example.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class MainController {
    @GetMapping("/")
    public String showIndexPage(Model model){
        return "index";
    }

    @GetMapping("/entity_view")
    public String showMeasurementViewPage(Model model){
        return "entity_view";
    }

    @GetMapping("/403")
    public String accessDeniedPage(Model model){
        return "403";
    }
}
