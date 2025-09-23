package com.inptcampus.backend.DTO;

import java.util.List;

public class RoomReservationDTO {

    private Long studentId;               // student making the reservation
    private Long roomId;                  // room to reserve
    private List<String> roommateEmails;  // optional emails of roommates

    // Getters & setters
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

    public List<String> getRoommateEmails() {
        return roommateEmails;
    }

    public void setRoommateEmails(List<String> roommateEmails) {
        this.roommateEmails = roommateEmails;
    }
}
