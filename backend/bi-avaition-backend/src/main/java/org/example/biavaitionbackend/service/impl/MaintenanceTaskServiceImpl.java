package org.example.biavaitionbackend.service.impl;

import org.example.biavaitionbackend.dto.MaintenanceTaskDTO;
import org.example.biavaitionbackend.mapper.MaintenanceTaskMapper;
import org.example.biavaitionbackend.service.MaintenanceTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class MaintenanceTaskServiceImpl implements MaintenanceTaskService {
    @Autowired
    private MaintenanceTaskMapper maintenanceTaskMapper;
    @Override
    public List<MaintenanceTaskDTO> listByPlanId(Long planId) {
        return maintenanceTaskMapper.selectByPlanId(planId);
    }
}
