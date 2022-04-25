package com.example.demo.models;

import lombok.*;

import javax.persistence.*;

@Data
@Entity(name = "measurement")
public class Measurement {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "Id")
    private int id;
    @ManyToOne
    @JoinColumn(name = "ExaminationDateId", referencedColumnName = "id")
    private ExaminationDate examinationDateId;
    @ManyToOne
    @JoinColumn(name = "OrganizationId", referencedColumnName = "id")
    private Organization organizationId;
    @Basic
    @Column(name = "LineNo")
    private Integer lineNo;
    @Basic
    @Column(name = "LandCode")
    private Integer landCode;
    @Basic
    @Column(name = "ProductionAreaNo")
    private Integer productionAreaNo;
    @Basic
    @Column(name = "CropRotationNo")
    private Integer cropRotationNo;
    @Basic
    @Column(name = "CropRotationFieldNo")
    private Integer cropRotationFieldNo;
    @Basic
    @Column(name = "CropRotationFieldArea")
    private Integer cropRotationFieldArea;
    @Basic
    @Column(name = "WorkingAreaNo")
    private Integer workingAreaNo;
    @Basic
    @Column(name = "WorkingAreaArea")
    private Integer workingAreaArea;
    @Basic
    @Column(name = "ElementaryAreaNo")
    private Integer elementaryAreaNo;
    @Basic
    @Column(name = "ElementaryAreaArea")
    private Integer elementaryAreaArea;
    @ManyToOne
    @JoinColumn(name = "AmeliorativeStateId", referencedColumnName = "id")
    private AmeliorativeState ameliorativeStateId;
    @Basic
    @Column(name = "HumusHorizonThickness")
    private Integer humusHorizonThickness;
    @Basic
    @Column(name = "pH")
    private Integer pH;
    @Basic
    @Column(name = "Humus")
    private Integer humus;
    @Basic
    @Column(name = "Measurement_P2O5")
    private Integer measurementP2O5;
    @Basic
    @Column(name = "Measurement_K2O")
    private Integer measurementK2O;
    @Basic
    @Column(name = "Measurement_CaO")
    private Integer measurementCaO;
    @Basic
    @Column(name = "Measurement_MgO")
    private Integer measurementMgO;
    @Basic
    @Column(name = "Measurement_Sulphur")
    private Integer measurementSulphur;
    @Basic
    @Column(name = "Measurement_Boron")
    private Integer measurementBoron;
    @Basic
    @Column(name = "Measurement_Copper")
    private Integer measurementCopper;
    @Basic
    @Column(name = "Measurement_Zink")
    private Integer measurementZink;
    @Basic
    @Column(name = "Measurement_Manganese")
    private Integer measurementManganese;
    @Basic
    @Column(name = "Measurement_Cobalt")
    private Integer measurementCobalt;
    @Basic
    @Column(name = "CationExchangeCapacity")
    private Integer cationExchangeCapacity;
    @Basic
    @Column(name = "CationExchangeCapacityK20")
    private Integer cationExchangeCapacityK20;
    @Basic
    @Column(name = "P2O5InExtract")
    private Integer p2O5InExtract;
    @Basic
    @Column(name = "Measurement_NO3_An")
    private Integer measurementNo3An;
    @Basic
    @Column(name = "Measurement_NO3_A2")
    private Integer measurementNo3A2;
    @Basic
    @Column(name = "Measurement_NO4Plus_An")
    private Integer measurementNo4PlusAn;
    @Basic
    @Column(name = "Measurement_NO4Plus_A2")
    private Integer measurementNo4PlusA2;
    @Basic
    @Column(name = "Measurement_Lead")
    private Integer measurementLead;
    @Basic
    @Column(name = "Measurement_Cadmium")
    private Integer measurementCadmium;
    @Basic
    @Column(name = "GrossContent_Lead")
    private Integer grossContentLead;
    @Basic
    @Column(name = "GrossContent_Cadmium")
    private Integer grossContentCadmium;
    @Basic
    @Column(name = "GrossContent_Copper")
    private Integer grossContentCopper;
    @Basic
    @Column(name = "GrossContent_Zink")
    private Integer grossContentZink;
    @Basic
    @Column(name = "GammaBackground")
    private Integer gammaBackground;
    @Basic
    @Column(name = "Radionuclides_Cesium")
    private Integer radionuclidesCesium;
    @Basic
    @Column(name = "Radionuclides_Strontium")
    private Integer radionuclidesStrontium;
    @ManyToOne
    @JoinColumn(name = "SoilTypeId", referencedColumnName = "id")
    private SoilType soilTypeId;
    @ManyToOne
    @JoinColumn(name = "SoilHydrationAndTurfId", referencedColumnName = "id")
    private SoilHydrationAndTurf soilHydrationAndTurfId;
    @ManyToOne
    @JoinColumn(name = "SoilGranulometricCompositionId", referencedColumnName = "id")
    private SoilGranulometricComposition soilGranulometricCompositionId;
    @ManyToOne
    @JoinColumn(name = "SoilBedrockId", referencedColumnName = "id")
    private SoilBedrock soilBedrockId;
    @ManyToOne
    @JoinColumn(name = "SoilParentrockId", referencedColumnName = "id")
    private SoilParentrock soilParentrockId;
}
