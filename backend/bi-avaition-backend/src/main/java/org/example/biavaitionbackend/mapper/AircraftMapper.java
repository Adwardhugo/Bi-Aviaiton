package org.example.biavaitionbackend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.example.biavaitionbackend.pojo.Aircraft;

import java.util.List;

@Mapper
public interface AircraftMapper {

    public List<Aircraft> findAll( String registrationNo,
                                   String serialNumber,
                                   String operatorCode,
                                   String aircraftStatus);
}
