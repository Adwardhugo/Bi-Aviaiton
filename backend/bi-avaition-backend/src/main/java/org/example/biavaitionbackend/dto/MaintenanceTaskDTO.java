package org.example.biavaitionbackend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MaintenanceTaskDTO {

    private Long taskId;
    private Long planId;
    private Long aircraftId;

    private String taskName;
    private String taskType;

    private LocalDateTime actualStartTime;
    private LocalDateTime actualEndTime;

    private String taskStatus;

    private Long engineerId;

    private String remark;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
