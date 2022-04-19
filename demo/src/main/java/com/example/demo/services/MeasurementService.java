package com.example.demo.services;

import com.example.demo.models.ExaminationDate;
import com.example.demo.models.Measurement;
import com.example.demo.repositories.ExaminationDateRepository;
import com.example.demo.repositories.MeasurementRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeasurementService {
    MeasurementRepository measurementRepository;
    ExaminationDateRepository examinationDateRepository;

    public MeasurementService(
            MeasurementRepository measurementRepository, ExaminationDateRepository examinationDateRepository) {
        this.measurementRepository = measurementRepository;
        this.examinationDateRepository = examinationDateRepository;
    }

    private static final Integer MAX_PAGE_SIZE = 1000;

    private Integer getSizeLimited(Integer size){
        if (size > MAX_PAGE_SIZE) { return MAX_PAGE_SIZE; }
        if (size < 1) { return 1; }
        return size;
    }

    public List<Measurement> getPageByExaminationDate(
            Integer page,
            Integer size,
            Integer examinationDateId
    ){
        size = getSizeLimited(size);
        Pageable pageable = PageRequest.of(page, size);
        ExaminationDate examinationDate = examinationDateRepository.findById(examinationDateId).orElseThrow();
        return measurementRepository.findAllByExaminationDateId(examinationDate, pageable);
    }

    public Integer getPageCountByExaminationDate(
            Integer size,
            Integer examinationDateId
    ){
        size = getSizeLimited(size);
        ExaminationDate examinationDate = examinationDateRepository.findById(examinationDateId).orElseThrow();
        return measurementRepository.countByExaminationDateId(examinationDate) / size;
    }
}
