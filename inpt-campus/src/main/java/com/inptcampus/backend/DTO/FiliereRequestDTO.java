package com.inptcampus.backend.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class FiliereRequestDTO {

    @NotBlank
    @Size(max = 100)
    private String name;

    @Size(max = 10)
    private String code;

    @Size(max = 500)
    private String description;

    private Boolean active;


    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}
