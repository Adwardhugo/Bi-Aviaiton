package org.example.biavaitionbackend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MaintenancePlanDTO {

    private Long planId;
    private Long aircraftId;

    /** 来自 aircraft 表 */
    private String registrationNo;

    private String maintenanceType;
    private String maintenanceReason;
    private LocalDateTime plannedStartTime;
    private String planStatus;
}

