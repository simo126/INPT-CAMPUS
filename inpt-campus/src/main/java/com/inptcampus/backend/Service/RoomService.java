package com.inptcampus.backend.Service;

import com.inptcampus.backend.DTO.RoomRequestDTO;
import com.inptcampus.backend.Model.Building;
import com.inptcampus.backend.Model.Room;
import com.inptcampus.backend.Repository.BuildingRepository;
import com.inptcampus.backend.Repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final BuildingRepository buildingRepository;

    public RoomService(RoomRepository roomRepository, BuildingRepository buildingRepository) {
        this.roomRepository = roomRepository;
        this.buildingRepository = buildingRepository;
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    public Room createRoom(RoomRequestDTO dto) {
        if (roomRepository.existsByRoomNumber(dto.getRoomNumber())) {
            throw new RuntimeException("Room already exists with number: " + dto.getRoomNumber());
        }

        Building building = buildingRepository.findById(dto.getBuildingId())
                .orElseThrow(() -> new RuntimeException("Building not found"));

        Room room = new Room();
        room.setRoomNumber(dto.getRoomNumber());
        room.setBuilding(building);
        room.setFloor(dto.getFloor());
        room.setRoomType(dto.getRoomType());
        room.setMaxCapacity(dto.getMaxCapacity());
        room.setActive(dto.getActive() != null ? dto.getActive() : true);

        return roomRepository.save(room);
    }

    public Room updateRoom(Long id, RoomRequestDTO dto) {
        return roomRepository.findById(id).map(room -> {
            room.setRoomNumber(dto.getRoomNumber());
            Building building = buildingRepository.findById(dto.getBuildingId())
                    .orElseThrow(() -> new RuntimeException("Building not found"));
            room.setBuilding(building);
            room.setFloor(dto.getFloor());
            room.setRoomType(dto.getRoomType());
            room.setMaxCapacity(dto.getMaxCapacity());
            if (dto.getActive() != null) room.setActive(dto.getActive());
            return roomRepository.save(room);
        }).orElseThrow(() -> new RuntimeException("Room not found with id " + id));
    }

    public void deleteRoom(Long id) {
        if (!roomRepository.existsById(id)) {
            throw new RuntimeException("Room not found with id " + id);
        }
        roomRepository.deleteById(id);
    }
    public void deleteAllRooms() {
        roomRepository.deleteAll();
    }
}
