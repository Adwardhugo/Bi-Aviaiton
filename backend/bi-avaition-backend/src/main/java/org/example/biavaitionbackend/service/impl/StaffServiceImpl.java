package org.example.biavaitionbackend.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.biavaitionbackend.dto.StaffDTO;
import org.example.biavaitionbackend.mapper.StaffMapper;
import org.example.biavaitionbackend.pojo.PageResult;
import org.example.biavaitionbackend.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffServiceImpl implements StaffService {
    @Autowired
    private StaffMapper staffMapper;
    @Override
    public PageResult<StaffDTO> page(Integer page, Integer pageSize, String name, String department, String role, String status)
    {

        PageHelper.startPage(page, pageSize);


        List<StaffDTO> list = staffMapper.selectPage(
                name,
                department,
                role,
                status
        );

        PageInfo<StaffDTO> pageInfo = new PageInfo<>(list);

        return new PageResult<>(
                pageInfo.getTotal(),
                pageInfo.getList()
        );
    }
}
