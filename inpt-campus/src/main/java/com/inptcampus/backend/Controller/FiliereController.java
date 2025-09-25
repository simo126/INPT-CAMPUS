package com.inptcampus.backend.Controller;

import com.inptcampus.backend.DTO.FiliereRequestDTO;
import com.inptcampus.backend.DTO.FiliereResponseDTO;
import com.inptcampus.backend.Mapper.FiliereMapper;
import com.inptcampus.backend.Model.Filiere;
import com.inptcampus.backend.Service.FiliereService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/filieres")
@CrossOrigin(origins = "*")
@SecurityRequirement(name = "BearerAuth") // Requires JWT token
public class FiliereController {

    private final FiliereService filiereService;

    public FiliereController(FiliereService filiereService) {
        this.filiereService = filiereService;
    }

    @GetMapping
    public List<FiliereResponseDTO> getAllFilieres() {
        return filiereService.getAllFilieres().stream()
                .map(FiliereMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FiliereResponseDTO> getFiliereById(@PathVariable Long id) {
        return filiereService.getFiliereById(id)
                .map(f -> ResponseEntity.ok(FiliereMapper.toDTO(f)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<FiliereResponseDTO> createFiliere(@RequestBody @Valid FiliereRequestDTO dto) {
        Filiere filiere = filiereService.createFiliere(dto);
        return ResponseEntity.ok(FiliereMapper.toDTO(filiere));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FiliereResponseDTO> updateFiliere(@PathVariable Long id, @RequestBody @Valid FiliereRequestDTO dto) {
        Filiere filiere = filiereService.updateFiliere(id, dto);
        return ResponseEntity.ok(FiliereMapper.toDTO(filiere));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFiliere(@PathVariable Long id) {
        filiereService.deleteFiliere(id);
        return ResponseEntity.noContent().build();
    }
}
