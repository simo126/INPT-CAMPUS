package com.inptcampus.backend.DTO;

public class RegisterResponseDTO {
    private Long id;
    private String email;
    private String role = "STUDENT";
    private String message;

    public RegisterResponseDTO(Long id, String email, String message) {
        this.id = id;
        this.email = email;
        this.message = message;
    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
