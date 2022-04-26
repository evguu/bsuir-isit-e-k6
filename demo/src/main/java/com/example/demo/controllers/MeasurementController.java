package com.example.demo.controllers;

import com.example.demo.models.Measurement;
import com.example.demo.services.MeasurementService;
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
public class MeasurementController {
    private final MeasurementService measurementService;

    public MeasurementController(MeasurementService measurementService) {
        this.measurementService = measurementService;
    }

    @GetMapping(value = "/measurement")
    public @ResponseBody Page<Measurement> search(@Filter Specification<Measurement> spec, Pageable page) {
        return measurementService.findAll(spec, page);
    }
}
