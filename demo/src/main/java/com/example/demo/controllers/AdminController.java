package com.example.demo.controllers;

import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserService userService;

    @GetMapping("")
    public String adminPage(Model model) {
        model.addAttribute("unactivatedUsers", userService.findUnactivatedUsers());
        return "admin";
    }

    @PostMapping("/activate/{id}")
    public String activate(@PathVariable("id") Integer userId) {
        userService.activateUser(userService.findById(userId));
        return "redirect:/admin";
    }

}
