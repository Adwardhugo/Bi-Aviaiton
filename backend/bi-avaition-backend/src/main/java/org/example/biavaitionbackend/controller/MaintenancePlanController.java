package org.example.biavaitionbackend.controller;

import org.example.biavaitionbackend.dto.CreateMaintenancePlanDTO;
import org.example.biavaitionbackend.dto.MaintenancePlanDTO;
import org.example.biavaitionbackend.dto.MaintenanceTaskDTO;
import org.example.biavaitionbackend.pojo.MaintenancePlan;
import org.example.biavaitionbackend.pojo.PageResult;
import org.example.biavaitionbackend.pojo.Result;
import org.example.biavaitionbackend.service.MaintenancePlanService;
import org.example.biavaitionbackend.service.MaintenanceTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/aircraft/maintenance")
@RestController
public class MaintenancePlanController {
    @Autowired
    private MaintenancePlanService maintenancePlanService;
    @Autowired
    private MaintenanceTaskService maintenanceTaskService;
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
    @PostMapping
        public Result create(@RequestBody CreateMaintenancePlanDTO dto){
            maintenancePlanService.create(dto);
            return Result.success();

        }
    @GetMapping("/task")
        public Result listTask(@RequestParam Long planId) {

            List<MaintenanceTaskDTO> list =
                    maintenanceTaskService.listByPlanId(planId);

            return Result.success(list);
        }
}
