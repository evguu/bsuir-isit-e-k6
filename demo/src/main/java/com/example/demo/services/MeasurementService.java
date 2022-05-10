package com.example.demo.services;

import com.example.demo.models.Measurement;
import com.example.demo.repositories.MeasurementRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class MeasurementService {
    MeasurementRepository measurementRepository;

    public MeasurementService(MeasurementRepository measurementRepository) {
        this.measurementRepository = measurementRepository;
    }

    public Page<Measurement> findAll(Specification<Measurement> spec, Pageable page) {
        return measurementRepository.findAll(spec, page);
    }
}
