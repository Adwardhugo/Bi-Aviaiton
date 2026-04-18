package org.example.biavaitionbackend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.example.biavaitionbackend.dto.StaffDTO;

import java.util.List;

@Mapper
public interface StaffMapper{
    List<StaffDTO> selectPage(
            String name,
            String department,
            String role,
            String status
    );
}

