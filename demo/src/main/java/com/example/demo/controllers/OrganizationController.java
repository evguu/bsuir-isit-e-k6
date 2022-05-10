package com.example.demo.controllers;

import com.example.demo.models.Organization;
import com.example.demo.services.OrganizationService;
import com.turkraft.springfilter.boot.Filter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/api")
public class OrganizationController {
    private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @GetMapping(value = "/organization")
    public @ResponseBody Page<Organization> search(@Filter Specification<Organization> spec, Pageable page) {
        return organizationService.findAll(spec, page);
    }
}
