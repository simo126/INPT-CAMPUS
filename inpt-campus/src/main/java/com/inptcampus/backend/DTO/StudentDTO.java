package com.inptcampus.backend.DTO;

public class StudentDTO {
    private Long id;
    private String name;
    private String email;
    private String filiereName; // Filiere name
    private String year;
    private String gender;

    public StudentDTO(Long id, String name, String email, String filiereName, String year, String gender) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.filiereName = filiereName;
        this.year = year;
        this.gender = gender;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFiliereName() {
        return filiereName;
    }

    public void setFiliereName(String filiereName) {
        this.filiereName = filiereName;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    // Getters and Setters
}

