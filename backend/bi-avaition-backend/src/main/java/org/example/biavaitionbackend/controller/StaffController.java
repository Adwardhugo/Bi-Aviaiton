package org.example.biavaitionbackend.controller;

import org.example.biavaitionbackend.dto.StaffDTO;
import org.example.biavaitionbackend.pojo.PageResult;
import org.example.biavaitionbackend.pojo.Result;
import org.example.biavaitionbackend.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RequestMapping("/api/dispatch/staff")
@RestController
public class StaffController {
    @Autowired
    private StaffService staffService;
    @GetMapping
    public Result page(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer pageSize,
            String name,
            String department,
            String role,
            String status
    ) {

        PageResult<StaffDTO> result =
                staffService.page(page, pageSize, name, department, role, status);

        return Result.success(result);
    }
}
