package com.example.demo.controllers;

import com.example.demo.dto.UserDto;
import com.example.demo.exceptions.UserAlreadyExistException;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.Valid;

@Controller
public class AuthenticationController {
    @Autowired
    private UserService userService;

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        UserDto userDto = new UserDto();
        model.addAttribute("user", userDto);
        return "registration";
    }

    @PostMapping("/register")
    public String registerUserAccount(
            @Valid UserDto userDto, BindingResult bindingResult, Model model) {

        if (bindingResult.hasErrors()) {
            model.addAttribute("errors", bindingResult.getAllErrors());
            model.addAttribute("user", userDto);
            return "registration";
        }
        try {
            userService.registerNewUserAccount(userDto);
        } catch (UserAlreadyExistException e) {
            bindingResult.rejectValue("username", "userDto.username", "Имя пользователя занято.");
            model.addAttribute("errors", bindingResult.getAllErrors());
            model.addAttribute("user", userDto);
            return "registration";
        }
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String showLoginForm(Model model) {
        return "login";
    }
}
