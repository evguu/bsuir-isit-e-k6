package com.example.demo.controllers;

import com.example.demo.services.ExaminationDateService;
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

    @GetMapping("/measurement_view")
    public String showMeasurementViewPage(Model model){
        return "measurement_view";
    }
}
