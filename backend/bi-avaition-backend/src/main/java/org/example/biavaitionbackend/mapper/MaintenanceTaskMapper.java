package org.example.biavaitionbackend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.example.biavaitionbackend.dto.MaintenanceTaskDTO;

import java.util.List;

@Mapper
public interface MaintenanceTaskMapper {
    List<MaintenanceTaskDTO> selectByPlanId(Long planId);
}
