package com.inptcampus.backend.Mapper;

import com.inptcampus.backend.DTO.FiliereSimpleDTO;
import com.inptcampus.backend.DTO.StudentResponseDTO;
import com.inptcampus.backend.Model.Student;

public class StudentMapper {

    public static StudentResponseDTO toDTO(Student student) {
        StudentResponseDTO dto = new StudentResponseDTO();
        dto.setId(student.getId());
        dto.setFirstName(student.getFirstName());
        dto.setLastName(student.getLastName());
        dto.setEmail(student.getEmail());
        dto.setGender(student.getGender());
        dto.setCurrentStudyYear(student.getCurrentStudyYear());
        dto.setReservationStatus(student.isReservationStatus());
        dto.setActive(student.isActive());

        if (student.getFiliere() != null) {
            dto.setFiliere(new FiliereSimpleDTO(
                    student.getFiliere().getId(),
                    student.getFiliere().getName()
            ));
        }

        if (student.getRoom() != null) {
            dto.setRoomId(student.getRoom().getId());
            dto.setRoomNumber(student.getRoom().getRoomNumber());
        }

        return dto;
    }
}
