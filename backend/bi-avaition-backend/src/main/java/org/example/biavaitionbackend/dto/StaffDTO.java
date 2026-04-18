package org.example.biavaitionbackend.dto;

import lombok.Data;

@Data
public class StaffDTO {
    private Long staffId;
    private String name;
    private String role;
    private String contact;
    private String department;
    private String status;
}
