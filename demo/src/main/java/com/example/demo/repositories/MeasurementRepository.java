package com.example.demo.repositories;

import com.example.demo.models.ExaminationDate;
import com.example.demo.models.Measurement;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface MeasurementRepository extends PagingAndSortingRepository<Measurement, Integer> {
    List<Measurement> findAllByExaminationDateId(ExaminationDate examinationDate, Pageable pageable);
    Integer countByExaminationDateId(ExaminationDate examinationDate);
}
