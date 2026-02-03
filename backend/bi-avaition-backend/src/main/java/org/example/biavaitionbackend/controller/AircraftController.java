package org.example.biavaitionbackend.controller;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.example.biavaitionbackend.pojo.Aircraft;
import org.example.biavaitionbackend.pojo.PageResult;
import org.example.biavaitionbackend.pojo.Result;
import org.example.biavaitionbackend.service.AircraftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/aircraft/list")
@RestController
public class AircraftController {
    @Autowired
    private AircraftService aircraftService;
    @GetMapping
    public Result page(@RequestParam(defaultValue = "1")Integer page,
                       @RequestParam(defaultValue = "10")Integer pageSize,
                       String registrationNo,
                       String serialNumber,
                       String operatorCode,
                       String aircraftStatus){
        //设置分页参数
        PageResult<Aircraft> pageResult = aircraftService.finAll(page,pageSize,registrationNo,serialNumber,operatorCode,aircraftStatus);
        return Result.success(pageResult);
    }

}
