package com.inptcampus.backend.Service;

import com.inptcampus.backend.DTO.FiliereRequestDTO;
import com.inptcampus.backend.Model.Filiere;
import com.inptcampus.backend.Repository.FiliereRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FiliereService {

    private final FiliereRepository filiereRepository;

    public FiliereService(FiliereRepository filiereRepository) {
        this.filiereRepository = filiereRepository;
    }

    public List<Filiere> getAllFilieres() {
        return filiereRepository.findAll();
    }

    public Optional<Filiere> getFiliereById(Long id) {
        return filiereRepository.findById(id);
    }

    public Filiere createFiliere(FiliereRequestDTO dto) {
        if (filiereRepository.existsByName(dto.getName())) {
            throw new RuntimeException("Filiere already exists with name: " + dto.getName());
        }
        Filiere filiere = new Filiere();
        filiere.setName(dto.getName());
        filiere.setCode(dto.getCode());
        filiere.setDescription(dto.getDescription());
        filiere.setActive(dto.getActive() != null ? dto.getActive() : true);
        return filiereRepository.save(filiere);
    }

    public Filiere updateFiliere(Long id, FiliereRequestDTO dto) {
        return filiereRepository.findById(id).map(filiere -> {
            filiere.setName(dto.getName());
            filiere.setCode(dto.getCode());
            filiere.setDescription(dto.getDescription());
            if (dto.getActive() != null) filiere.setActive(dto.getActive());
            return filiereRepository.save(filiere);
        }).orElseThrow(() -> new RuntimeException("Filiere not found with id " + id));
    }

    public void deleteFiliere(Long id) {
        if (!filiereRepository.existsById(id)) {
            throw new RuntimeException("Filiere not found with id " + id);
        }
        filiereRepository.deleteById(id);
    }
}
