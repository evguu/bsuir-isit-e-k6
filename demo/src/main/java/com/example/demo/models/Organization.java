package com.example.demo.models;

import lombok.*;

import javax.persistence.*;

@Data
@Entity
public class Organization {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "Id")
    private int id;
    @Basic
    @Column(name = "Name")
    private String name;
    @Basic
    @Column(name = "MinVedCode")
    private Integer minVedCode;
    @Basic
    @Column(name = "ControlCode")
    private Integer controlCode;
    @ManyToOne
    @JoinColumn(name = "TerritoryId", referencedColumnName = "id")
    private Territory territory;
    @Basic
    @Column(name = "PrintingOrder")
    private Integer printingOrder;
}
