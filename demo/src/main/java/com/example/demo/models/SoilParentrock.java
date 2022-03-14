package com.example.demo.models;

import lombok.*;

import javax.persistence.*;

@Data
@Entity
@Table(name = "soil_parentrock")
public class SoilParentrock {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "meaning")
    private String meaning;

}
