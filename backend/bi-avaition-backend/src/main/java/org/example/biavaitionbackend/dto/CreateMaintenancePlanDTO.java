package org.example.biavaitionbackend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateMaintenancePlanDTO {

    private Long aircraftId;
    private String maintenanceType;
    private String maintenanceReason;
    private LocalDateTime plannedStartTime;
    private LocalDateTime plannedEndTime;
    private String planStatus;
    private String createdBy;
}
