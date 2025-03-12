package com.inptcampus.backend.Controller;

import com.inptcampus.backend.Model.Room;
import com.inptcampus.backend.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping("/building/{buildingId}")
    public List<Room> getRoomsByBuilding(@PathVariable Long buildingId) {
        return roomService.getRoomsByBuilding(buildingId);
    }

    @GetMapping("/search")
    public List<Room> searchRooms(@RequestParam Long buildingId,
                                  @RequestParam int floor,
                                  @RequestParam String roomType) {
        return roomService.searchRooms(buildingId, floor, roomType);
    }
}
