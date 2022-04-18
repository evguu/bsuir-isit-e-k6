package com.example.demo.repositories;

import com.example.demo.models.ExaminationDate;
import org.springframework.data.repository.CrudRepository;

public interface ExaminationDateRepository extends CrudRepository<ExaminationDate, Integer> {
}
