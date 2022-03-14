package com.example.demo.models;


import lombok.*;

import javax.persistence.*;

@Data
@Entity
public class Territory {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "name")
    private String name;

}
