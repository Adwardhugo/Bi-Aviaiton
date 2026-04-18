package org.example.biavaitionbackend.service;

import org.example.biavaitionbackend.dto.MaintenanceTaskDTO;

import java.util.List;

public interface MaintenanceTaskService {
    List<MaintenanceTaskDTO> listByPlanId(Long planId);
}
