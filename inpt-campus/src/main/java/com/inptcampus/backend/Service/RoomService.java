package com.inptcampus.backend.Service;

import com.inptcampus.backend.Model.Building;
import com.inptcampus.backend.Model.Room;
import com.inptcampus.backend.Repository.BuildingRepository;
import com.inptcampus.backend.Repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private BuildingRepository buildingRepository;

    public List<Room> getRoomsByBuilding(Long buildingId) {
        Building building = buildingRepository.findById(buildingId)
                .orElseThrow(() -> new RuntimeException("Building not found"));
        return roomRepository.findByBuilding(building);
    }

    public List<Room> searchRooms(Long buildingId, int floor, String roomType) {
        Building building = buildingRepository.findById(buildingId)
                .orElseThrow(() -> new RuntimeException("Building not found"));

        return roomRepository.findByBuildingAndFloorAndRoomType(building, floor, roomType);
    }
}
