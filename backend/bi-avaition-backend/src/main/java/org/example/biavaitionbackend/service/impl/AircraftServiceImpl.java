package org.example.biavaitionbackend.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.example.biavaitionbackend.mapper.AircraftMapper;
import org.example.biavaitionbackend.pojo.Aircraft;
import org.example.biavaitionbackend.pojo.PageResult;
import org.example.biavaitionbackend.service.AircraftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AircraftServiceImpl implements AircraftService {
    @Autowired
    private AircraftMapper aircraftMapper;

    @Override
    public PageResult<Aircraft> finAll(Integer page, Integer pageSize, String registrationNo,
                                       String serialNumber,
                                       String operatorCode,
                                       String aircraftStatus) {
        //1.设置分页参数
        PageHelper.startPage(page,pageSize);
        //2.执行查询
        List<Aircraft> aircraftList = aircraftMapper.findAll(registrationNo, serialNumber, operatorCode, aircraftStatus);
        //3.解析查询结果，并封装
        Page<Aircraft> p = (Page<Aircraft>) aircraftList;
        return new PageResult<Aircraft>(p.getTotal(),p.getResult());
    }

    @Override
    public List<Aircraft> finAll() {
        return List.of();
    }
}
