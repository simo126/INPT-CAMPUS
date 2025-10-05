package com.inptcampus.backend.DTO;

import com.inptcampus.backend.Model.Gender;

public class RegisterRequestDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Long filiereId;
    private Gender gender;
    private Integer currentStudyYear;


    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Long getFiliereId() { return filiereId; }
    public void setFiliereId(Long filiereId) { this.filiereId = filiereId; }

    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }

    public Integer getCurrentStudyYear() { return currentStudyYear; }
    public void setCurrentStudyYear(Integer currentStudyYear) { this.currentStudyYear = currentStudyYear; }
}
