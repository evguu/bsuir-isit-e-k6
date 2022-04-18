package com.example.demo.controllers;

import com.example.demo.repositories.ExaminationDateRepository;
import org.jboss.jandex.Main;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class MainController {
    private final ExaminationDateRepository examinationDateRepository;

    public MainController(ExaminationDateRepository examinationDateRepository){
        this.examinationDateRepository = examinationDateRepository;
    }


    @GetMapping("/")
    public String showIndexPage(Model model){
        model.addAttribute("dates", examinationDateRepository.findAll());
        return "index";
    }
}
