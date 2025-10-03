package com.inptcampus.backend.Controller;

import com.inptcampus.backend.DTO.BuildingRequestDTO;
import com.inptcampus.backend.DTO.BuildingResponseDTO;
import com.inptcampus.backend.Mapper.BuildingMapper;
import com.inptcampus.backend.Model.Building;
import com.inptcampus.backend.Service.BuildingService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/buildings")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class BuildingController {

    private final BuildingService buildingService;

    public BuildingController(BuildingService buildingService) {
        this.buildingService = buildingService;
    }

    @GetMapping
    public List<BuildingResponseDTO> getAllBuildings() {
        return buildingService.getAllBuildings().stream()
                .map(BuildingMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BuildingResponseDTO> getBuildingById(@PathVariable Long id) {
        return buildingService.getBuildingById(id)
                .map(building -> ResponseEntity.ok(BuildingMapper.toDTO(building)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BuildingResponseDTO> createBuilding(@RequestBody @Valid BuildingRequestDTO dto) {
        Building building = buildingService.createBuilding(dto);
        return ResponseEntity.ok(BuildingMapper.toDTO(building));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BuildingResponseDTO> updateBuilding(@PathVariable Long id, @RequestBody @Valid BuildingRequestDTO dto) {
        Building building = buildingService.updateBuilding(id, dto);
        return ResponseEntity.ok(BuildingMapper.toDTO(building));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBuilding(@PathVariable Long id) {
        buildingService.deleteBuilding(id);
        return ResponseEntity.noContent().build();
    }
}
