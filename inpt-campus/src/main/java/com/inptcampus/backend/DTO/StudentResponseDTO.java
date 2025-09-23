package com.inptcampus.backend.DTO;

import com.inptcampus.backend.Model.Gender;

public class StudentResponseDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Gender gender;
    private int currentStudyYear;
    private boolean reservationStatus;
    private boolean active;
    private FiliereSimpleDTO filiere; // only id and name
    private String roomNumber;  // instead of whole Room entity
    private Long roomId;        // optional if you want the room id

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }

    public int getCurrentStudyYear() { return currentStudyYear; }
    public void setCurrentStudyYear(int currentStudyYear) { this.currentStudyYear = currentStudyYear; }

    public boolean isReservationStatus() { return reservationStatus; }
    public void setReservationStatus(boolean reservationStatus) { this.reservationStatus = reservationStatus; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public FiliereSimpleDTO getFiliere() { return filiere; }
    public void setFiliere(FiliereSimpleDTO filiere) { this.filiere = filiere; }

    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }

    public Long getRoomId() { return roomId; }
    public void setRoomId(Long roomId) { this.roomId = roomId; }
}
