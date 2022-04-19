package com.example.demo.services;

import com.example.demo.models.ExaminationDate;
import com.example.demo.repositories.ExaminationDateRepository;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExaminationDateService {
    private final ExaminationDateRepository examinationDateRepository;

    public ExaminationDateService(ExaminationDateRepository examinationDateRepository) {
        this.examinationDateRepository = examinationDateRepository;
    }

    public Map<Integer, List<ExaminationDate>> getDateYearMap() {
        Map<Integer, List<ExaminationDate>> dateYearMap = new HashMap<>();
        Iterable<ExaminationDate> examinationDates = examinationDateRepository.findAll();
        for (ExaminationDate examinationDate: examinationDates){
            Integer year = examinationDate.getExaminationYear();
            if (!dateYearMap.containsKey(year)){
                dateYearMap.put(year, new ArrayList<>());
            }
            dateYearMap.get(year).add(examinationDate);
        }
        return dateYearMap;
    }
}
