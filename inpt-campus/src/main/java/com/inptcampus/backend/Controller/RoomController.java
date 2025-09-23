package com.inptcampus.backend.Controller;

import com.inptcampus.backend.DTO.RoomRequestDTO;
import com.inptcampus.backend.DTO.RoomResponseDTO;
import com.inptcampus.backend.Mapper.RoomMapper;
import com.inptcampus.backend.Model.Room;
import com.inptcampus.backend.Service.RoomService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }
    @DeleteMapping
    public ResponseEntity<Void> deleteAllRooms() {
        roomService.deleteAllRooms();
        return ResponseEntity.noContent().build();
    }
    @GetMapping
    public List<RoomResponseDTO> getAllRooms() {
        return roomService.getAllRooms().stream()
                .map(RoomMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomResponseDTO> getRoomById(@PathVariable Long id) {
        return roomService.getRoomById(id)
                .map(room -> ResponseEntity.ok(RoomMapper.toDTO(room)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RoomResponseDTO> createRoom(@RequestBody @Valid RoomRequestDTO dto) {
        Room room = roomService.createRoom(dto);
        return ResponseEntity.ok(RoomMapper.toDTO(room));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomResponseDTO> updateRoom(@PathVariable Long id, @RequestBody @Valid RoomRequestDTO dto) {
        Room room = roomService.updateRoom(id, dto);
        return ResponseEntity.ok(RoomMapper.toDTO(room));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}
