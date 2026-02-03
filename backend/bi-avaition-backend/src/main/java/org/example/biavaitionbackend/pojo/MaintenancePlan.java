package org.example.biavaitionbackend.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MaintenancePlan {
    private Long planId;
    private Long aircraftId;
    private String maintenanceType;
    private LocalDateTime plannedStartTime;
    private LocalDateTime plannedEndTime;
    private String maintenanceReason;
    private String planStatus;
    private String createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
