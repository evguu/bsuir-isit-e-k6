package com.example.demo.controllers;

import com.example.demo.services.ExaminationDateService;
import org.jboss.jandex.Main;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class MainController {
    private final ExaminationDateService examinationDateService;

    public MainController(ExaminationDateService examinationDateService){
        this.examinationDateService = examinationDateService;
    }


    @GetMapping("/")
    public String showIndexPage(Model model){
        model.addAttribute("dates", examinationDateService.getDateYearMap());
        return "index";
    }
}
