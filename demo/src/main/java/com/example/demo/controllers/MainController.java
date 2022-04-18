package com.example.demo.controllers;

import com.example.demo.models.Organization;
import com.example.demo.repositories.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/demo")
public class MainController {
    private final OrganizationRepository organizationRepository;

    public MainController(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Organization> getAllOrganizations() {
        return organizationRepository.findAll();
    }
}
