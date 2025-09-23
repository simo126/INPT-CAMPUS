package com.inptcampus.backend.DTO;

import com.inptcampus.backend.Model.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class StudentRequestDTO {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private Gender gender;

    @NotNull
    private Integer currentStudyYear;

    @NotBlank
    private String password; // plain text (will be hashed in service)

    @NotNull
    private Long filiereId; // instead of whole Filiere object

    private Long roomId; // optional

    // Getters & setters
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }

    public Integer getCurrentStudyYear() { return currentStudyYear; }
    public void setCurrentStudyYear(Integer currentStudyYear) { this.currentStudyYear = currentStudyYear; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Long getFiliereId() { return filiereId; }
    public void setFiliereId(Long filiereId) { this.filiereId = filiereId; }

    public Long getRoomId() { return roomId; }
    public void setRoomId(Long roomId) { this.roomId = roomId; }
}
