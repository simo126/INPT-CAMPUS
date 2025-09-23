package com.inptcampus.backend.Service;

import com.inptcampus.backend.DTO.BuildingRequestDTO;
import com.inptcampus.backend.Model.Building;
import com.inptcampus.backend.Repository.BuildingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BuildingService {

    private final BuildingRepository buildingRepository;

    public BuildingService(BuildingRepository buildingRepository) {
        this.buildingRepository = buildingRepository;
    }

    public List<Building> getAllBuildings() {
        return buildingRepository.findAll();
    }

    public Optional<Building> getBuildingById(Long id) {
        return buildingRepository.findById(id);
    }

    public Building createBuilding(BuildingRequestDTO dto) {
        if (buildingRepository.existsByName(dto.getName())) {
            throw new RuntimeException("Building already exists with name: " + dto.getName());
        }
        Building building = new Building();
        building.setName(dto.getName());
        building.setAddress(dto.getAddress());
        building.setNumFloors(dto.getNumFloors());
        building.setDescription(dto.getDescription());
        building.setActive(dto.getActive() != null ? dto.getActive() : true);
        return buildingRepository.save(building);
    }

    public Building updateBuilding(Long id, BuildingRequestDTO dto) {
        return buildingRepository.findById(id).map(building -> {
            building.setName(dto.getName());
            building.setAddress(dto.getAddress());
            building.setNumFloors(dto.getNumFloors());
            building.setDescription(dto.getDescription());
            if (dto.getActive() != null) building.setActive(dto.getActive());
            return buildingRepository.save(building);
        }).orElseThrow(() -> new RuntimeException("Building not found with id " + id));
    }

    public void deleteBuilding(Long id) {
        if (!buildingRepository.existsById(id)) {
            throw new RuntimeException("Building not found with id " + id);
        }
        buildingRepository.deleteById(id);
    }
}
