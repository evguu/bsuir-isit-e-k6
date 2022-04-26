package com.example.demo.repositories;

import com.example.demo.models.Measurement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface MeasurementRepository extends PagingAndSortingRepository<Measurement, Integer> {
    Page<Measurement> findAll(Specification<Measurement> spec, Pageable page);
}
