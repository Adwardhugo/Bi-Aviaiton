package org.example.biavaitionbackend.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Aircraft {
    private Long aircraftId;
    private String registrationNo;
    private String aircraftType;
    private String manufacturer;
    private String serialNumber;
    private String aircraftStatus;
    private LocalDate deliveryDate;
    private LocalDate inServiceDate;
    private Integer seatCapacity;
    private BigDecimal maxTakeoffWeight;
    private String operatorCode;
    private String baseAirport;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
