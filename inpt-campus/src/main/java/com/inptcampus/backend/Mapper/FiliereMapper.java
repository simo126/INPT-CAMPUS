package com.inptcampus.backend.Mapper;

import com.inptcampus.backend.DTO.FiliereResponseDTO;
import com.inptcampus.backend.Model.Filiere;

public class FiliereMapper {

    public static FiliereResponseDTO toDTO(Filiere filiere) {
        FiliereResponseDTO dto = new FiliereResponseDTO();
        dto.setId(filiere.getId());
        dto.setName(filiere.getName());
        dto.setCode(filiere.getCode());
        dto.setDescription(filiere.getDescription());
        dto.setActive(filiere.isActive());
        dto.setStudentCount(filiere.getStudents() != null ? filiere.getStudents().size() : 0);
        return dto;
    }
}
