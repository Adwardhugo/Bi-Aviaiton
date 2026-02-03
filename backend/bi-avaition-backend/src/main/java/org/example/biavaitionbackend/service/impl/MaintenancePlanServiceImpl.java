package org.example.biavaitionbackend.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.biavaitionbackend.dto.MaintenancePlanDTO;
import org.example.biavaitionbackend.mapper.MaintenancePlanMapper;
import org.example.biavaitionbackend.pojo.MaintenancePlan;
import org.example.biavaitionbackend.pojo.PageResult;
import org.example.biavaitionbackend.service.MaintenancePlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaintenancePlanServiceImpl implements MaintenancePlanService {

    @Autowired
    private MaintenancePlanMapper maintenancePlanMapper;

    @Override
    public PageResult<MaintenancePlanDTO> page(
            Integer page,
            Integer pageSize,
            String registrationNo,
            String maintenanceType,
            String planStatus
    ) {

        // 1️⃣ 开启分页
        PageHelper.startPage(page, pageSize);

        // 2️⃣ 查询 DTO 列表
        List<MaintenancePlanDTO> list =
                maintenancePlanMapper.selectMaintenancePage(
                        registrationNo,
                        maintenanceType,
                        planStatus
                );

        // 3️⃣ 用 PageInfo 包装
        PageInfo<MaintenancePlanDTO> pageInfo = new PageInfo<>(list);

        // 4️⃣ 返回统一分页结构
        return new PageResult<>(
                pageInfo.getTotal(),
                pageInfo.getList()
        );
    }
}

