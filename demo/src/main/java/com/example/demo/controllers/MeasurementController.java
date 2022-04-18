package com.example.demo.controllers;

import com.example.demo.models.ExaminationDate;
import com.example.demo.models.Measurement;
import com.example.demo.repositories.ExaminationDateRepository;
import com.example.demo.repositories.MeasurementRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/api")
public class MeasurementController {
    private final ExaminationDateRepository examinationDateRepository;
    private final MeasurementRepository measurementRepository;

    public MeasurementController(ExaminationDateRepository examinationDateRepository, MeasurementRepository measurementRepository) {
        this.examinationDateRepository = examinationDateRepository;
        this.measurementRepository = measurementRepository;
    }

    @GetMapping(path="/measurements")
    public @ResponseBody
    List<Measurement> getAll(
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
    @GetMapping(path="/measurements/count_pages")
    public @ResponseBody Integer getPageCount(
            @RequestParam(defaultValue = "20") Integer size,
            @RequestParam Integer examinationDateId
    ){
        if (size > 1000) { size = 1000; }
        if (size < 1) { size = 1; }
        ExaminationDate examinationDate = examinationDateRepository.findById(examinationDateId).orElseThrow();
        return measurementRepository.countByExaminationDateId(examinationDate) / size;
    }
}
