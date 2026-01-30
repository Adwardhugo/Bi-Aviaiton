package org.example.biavaitionbackend.service;


import org.example.biavaitionbackend.pojo.Aircraft;
import org.example.biavaitionbackend.pojo.PageResult;

import java.util.List;

public interface AircraftService {

    PageResult<Aircraft> finAll(Integer page, Integer pageSize ,
                                String registrationNo,
                                String serialNumber,
                                String operatorCode,
                                String aircraftStatus);

    List<Aircraft> finAll();
}
