package org.example.biavaitionbackend.service;

import org.example.biavaitionbackend.dto.StaffDTO;
import org.example.biavaitionbackend.pojo.PageResult;
import org.springframework.stereotype.Service;

@Service
public interface StaffService {
    PageResult<StaffDTO> page(
            Integer page,
            Integer pageSize,
            String name,
            String department,
            String role,
            String status
    );
}
