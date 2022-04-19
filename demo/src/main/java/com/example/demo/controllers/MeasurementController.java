package com.example.demo.controllers;

import com.example.demo.models.ExaminationDate;
import com.example.demo.models.Measurement;
import com.example.demo.repositories.ExaminationDateRepository;
import com.example.demo.repositories.MeasurementRepository;
import com.example.demo.services.ExaminationDateService;
import com.example.demo.services.MeasurementService;
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
    private final MeasurementService measurementService;

    public MeasurementController(MeasurementService measurementService) {
        this.measurementService = measurementService;
    }

    @GetMapping(path="/measurements")
    public @ResponseBody
    List<Measurement> getAll(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "20") Integer size,
            @RequestParam Integer examinationDateId
    ){
        return measurementService.getPageByExaminationDate(page, size, examinationDateId);
    }
    @GetMapping(path="/measurements/count_pages")
    public @ResponseBody Integer getPageCount(
            @RequestParam(defaultValue = "20") Integer size,
            @RequestParam Integer examinationDateId
    ){
        return measurementService.getPageCountByExaminationDate(size, examinationDateId);
    }
}
