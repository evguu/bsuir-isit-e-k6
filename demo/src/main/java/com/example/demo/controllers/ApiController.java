package com.example.demo.controllers;

import com.example.demo.models.ExaminationDate;
import com.example.demo.models.Measurement;
import com.example.demo.models.Organization;
import com.example.demo.repositories.ExaminationDateRepository;
import com.example.demo.repositories.MeasurementRepository;
import com.example.demo.repositories.OrganizationRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/api")
public class ApiController {
    private final OrganizationRepository organizationRepository;
    private final MeasurementRepository measurementRepository;
    private final ExaminationDateRepository examinationDateRepository;

    public ApiController(OrganizationRepository organizationRepository, MeasurementRepository measurementRepository,
                         ExaminationDateRepository examinationDateRepository) {
        this.organizationRepository = organizationRepository;
        this.measurementRepository = measurementRepository;
        this.examinationDateRepository = examinationDateRepository;
    }

    @GetMapping(path="/organizations")
    public @ResponseBody Iterable<Organization> getAllOrganizations() {
        return organizationRepository.findAll();
    }

    @GetMapping(path="/examination_dates")
    public @ResponseBody Iterable<ExaminationDate> getAllExaminationDates() {
        return examinationDateRepository.findAll();
    }

    @GetMapping(path="/measurements")
    public @ResponseBody
    List<Measurement> getAllMeasurements(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "20") Integer size,
            @RequestParam Integer examinationDateId
    ){
        if (size > 1000) { size = 1000; }
        if (size < 1) { size = 1; }
        Pageable pageable = PageRequest.of(page, size);
        ExaminationDate examinationDate = examinationDateRepository.findById(examinationDateId).orElseThrow();
        return measurementRepository.findAllByExaminationDateId(examinationDate, pageable);
    }
}
