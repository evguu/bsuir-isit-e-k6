package com.example.demo.repositories;

import com.example.demo.models.ExaminationDate;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ExaminationDateRepository extends CrudRepository<ExaminationDate, Integer> {
}
