package com.example.demo.controllers;

import com.example.demo.dto.UserDto;
import com.example.demo.exceptions.UserAlreadyExistException;
import com.example.demo.models.User;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
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

        if(bindingResult.hasErrors()){
            System.out.println("Binding result has errors");
            // Print errors
            for (Object object : bindingResult.getAllErrors()) { // TODO: remove this
                System.out.println(object);
            }
            model.addAttribute("user", userDto);
            return "registration";
        }
        try {
            userService.registerNewUserAccount(userDto);
        }catch (UserAlreadyExistException e){
            bindingResult.rejectValue("username", "userDto.username","Имя пользователя занято.");
            model.addAttribute("user", userDto);
            return "registration";
        }
        return "redirect:/login";
    }
}
