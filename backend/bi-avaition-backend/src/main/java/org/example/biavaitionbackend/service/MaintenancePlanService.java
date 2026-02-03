package org.example.biavaitionbackend.service;

import org.example.biavaitionbackend.dto.MaintenancePlanDTO;
import org.example.biavaitionbackend.pojo.MaintenancePlan;
import org.example.biavaitionbackend.pojo.PageResult;
import org.springframework.stereotype.Service;

@Service
public interface MaintenancePlanService {
    PageResult<MaintenancePlanDTO> page(
            Integer page,
            Integer pageSize,
            String registrationNo,
            String maintenanceType,
            String planStatus
    );
}
