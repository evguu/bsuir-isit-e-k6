package com.example.demo.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity(name = "examination_date")
public class ExaminationDate {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "Id")
    private int id;
    @Basic
    @Column(name = "ExaminationYear")
    private Integer examinationYear;
    @Basic
    @Column(name = "Tour")
    private Integer tour;
}
