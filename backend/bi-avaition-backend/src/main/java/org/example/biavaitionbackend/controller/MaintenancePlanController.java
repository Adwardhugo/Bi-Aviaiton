package org.example.biavaitionbackend.controller;

import org.example.biavaitionbackend.dto.MaintenancePlanDTO;
import org.example.biavaitionbackend.pojo.MaintenancePlan;
import org.example.biavaitionbackend.pojo.PageResult;
import org.example.biavaitionbackend.pojo.Result;
import org.example.biavaitionbackend.service.MaintenancePlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/aircraft/maintenance")
@RestController
public class MaintenancePlanController {
    @Autowired
    private MaintenancePlanService maintenancePlanService;
    @GetMapping
    public Result maintenancePage(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer pageSize,

            // ===== 查询条件（来自原型）=====
            String registrationNo,     // Registration
            String maintenanceType,    // Type
            String planStatus          // Status
    ) {

        PageResult<MaintenancePlanDTO> pageResult =
                maintenancePlanService.page(
                        page,
                        pageSize,
                        registrationNo,
                        maintenanceType,
                        planStatus
                );

        return Result.success(pageResult);
    }
}
