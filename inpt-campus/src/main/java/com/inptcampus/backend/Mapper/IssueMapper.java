package com.inptcampus.backend.Mapper;

import com.inptcampus.backend.DTO.IssueResponseDTO;
import com.inptcampus.backend.Model.Issue;

public class IssueMapper {

    public static IssueResponseDTO toDTO(Issue issue) {
        IssueResponseDTO dto = new IssueResponseDTO();
        dto.setId(issue.getId());
        dto.setTitle(issue.getTitle());
        dto.setDescription(issue.getDescription());
        dto.setRoomId(issue.getRoom().getId());
        dto.setResolved(issue.isResolved());
        dto.setCreatedAt(issue.getCreatedAt());
        dto.setStudentId(issue.getStudent().getId());
        dto.setStudentName(issue.getStudent().getFirstName() + " " + issue.getStudent().getLastName());
        return dto;
    }
}
