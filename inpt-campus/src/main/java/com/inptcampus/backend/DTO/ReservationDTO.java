package com.inptcampus.backend.DTO;


import java.time.LocalDate;
import java.util.Set;


public class ReservationDTO {
    private Long studentId;
    private Long roomId;
    private Set<Long> roommateIds; // List of selected roommate IDs
    private LocalDate startDate;
    private LocalDate endDate;

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public Set<Long> getRoommateIds() {
        return roommateIds;
    }

    public void setRoommateIds(Set<Long> roommateIds) {
        this.roommateIds = roommateIds;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
