package com.inptcampus.backend.Mapper;

import com.inptcampus.backend.DTO.RoomResponseDTO;
import com.inptcampus.backend.Model.Room;

public class RoomMapper {

    public static RoomResponseDTO toDTO(Room room) {
        RoomResponseDTO dto = new RoomResponseDTO();
        dto.setId(room.getId());
        dto.setRoomNumber(room.getRoomNumber());
        dto.setBuildingName(room.getBuilding() != null ? room.getBuilding().getName() : null);
        dto.setFloor(room.getFloor());
        dto.setRoomType(room.getRoomType());
        dto.setMaxCapacity(room.getMaxCapacity());
        dto.setCurrentOccupancy(room.getCurrentOccupancy());
        dto.setActive(room.isActive());
        return dto;
    }
}
