package com.inptcampus.backend.Service;

import com.inptcampus.backend.Repository.BuildingRepository;
import com.inptcampus.backend.Repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.inptcampus.backend.DTO.RoomDTO;
import com.inptcampus.backend.Model.Building;
import com.inptcampus.backend.Model.Room;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private BuildingRepository buildingRepository;



    public List<RoomDTO> getAllRooms() {
        List<Room> rooms = roomRepository.findAll();
        return rooms.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public RoomDTO getRoomById(Long id) {
        Optional<Room> room = roomRepository.findById(id);
        return room.map(this::convertToDTO).orElse(null);
    }

    public RoomDTO addRoom(RoomDTO roomDTO) {
        Optional<Building> building = buildingRepository.findById(roomDTO.getBuildingId());
        if (building.isEmpty()) {
            throw new RuntimeException("Building not found");
        }

        Room room = new Room();
        room.setRoomNumber(roomDTO.getRoomNumber());
        room.setBuilding(building.get());
        room.setFloor(roomDTO.getFloor());
        room.setRoomType(roomDTO.getRoomType());
        room.setMaxCapacity(roomDTO.getMaxCapacity());
        room.setCurrentOccupancy(roomDTO.getCurrentOccupancy());

        Room savedRoom = roomRepository.save(room);
        return convertToDTO(savedRoom);
    }

    public RoomDTO updateRoom(Long id, RoomDTO roomDTO) {
        Optional<Room> existingRoom = roomRepository.findById(id);
        if (existingRoom.isPresent()) {
            Room room = existingRoom.get();
            room.setRoomNumber(roomDTO.getRoomNumber());
            room.setFloor(roomDTO.getFloor());
            room.setRoomType(roomDTO.getRoomType());
            room.setMaxCapacity(roomDTO.getMaxCapacity());
            room.setCurrentOccupancy(roomDTO.getCurrentOccupancy());

            Room updatedRoom = roomRepository.save(room);
            return convertToDTO(updatedRoom);
        }
        return null;
    }

    public boolean deleteRoom(Long id) {
        if (roomRepository.existsById(id)) {
            roomRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private RoomDTO convertToDTO(Room room) {
        RoomDTO dto = new RoomDTO();
        dto.setId(room.getId());
        dto.setRoomNumber(room.getRoomNumber());
        dto.setBuildingId(room.getBuilding().getId());
        dto.setBuildingName(room.getBuilding().getName());
        dto.setFloor(room.getFloor());
        dto.setRoomType(room.getRoomType());
        dto.setMaxCapacity(room.getMaxCapacity());
        dto.setCurrentOccupancy(room.getCurrentOccupancy());
        return dto;
    }
}

