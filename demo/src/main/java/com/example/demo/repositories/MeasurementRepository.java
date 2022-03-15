package com.example.demo.repositories;

import com.example.demo.models.Measurement;
import org.springframework.data.repository.CrudRepository;

public interface MeasurementRepository extends CrudRepository<Measurement, Integer> {
}
