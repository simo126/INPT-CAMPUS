package com.inptcampus.backend.Mapper;

import com.inptcampus.backend.DTO.BuildingResponseDTO;
import com.inptcampus.backend.Model.Building;

public class BuildingMapper {

    public static BuildingResponseDTO toDTO(Building building) {
        BuildingResponseDTO dto = new BuildingResponseDTO();
        dto.setId(building.getId());
        dto.setName(building.getName());
        dto.setAddress(building.getAddress());
        dto.setNumFloors(building.getNumFloors());
        dto.setDescription(building.getDescription());
        dto.setActive(building.isActive());
        dto.setGender(building.getGender());
        dto.setRoomCount(building.getRooms() != null ? building.getRooms().size() : 0);
        return dto;
    }
}
