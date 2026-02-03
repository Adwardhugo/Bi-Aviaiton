package org.example.biavaitionbackend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.example.biavaitionbackend.dto.MaintenancePlanDTO;
import org.example.biavaitionbackend.pojo.MaintenancePlan;

import java.util.List;

@Mapper
public interface MaintenancePlanMapper {

    List<MaintenancePlanDTO> selectMaintenancePage(
            @Param("registrationNo") String registrationNo,
            @Param("maintenanceType") String maintenanceType,
            @Param("planStatus") String planStatus);
}
