package com.inptcampus.backend.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable=false, unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name="filiere_name", nullable = false)
    private Filiere filiere;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(name="num_room", nullable = true)
    private String numRoom;

    // No-argument constructor
    public student() {}

    public student(Long id, String name, String email, Filiere filiere, Gender gender, String numRoom) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.filiere = filiere;
        this.gender = gender;
        this.numRoom = numRoom;
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

    public Filiere getFiliere() {
        return filiere;
    }

    public void setFiliere(Filiere filiere) {
        this.filiere = filiere;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getNumRoom() {
        return numRoom;
    }

    public void setNumRoom(String numRoom) {
        this.numRoom = numRoom;
    }

    public enum Filiere {
        SCIENCE,
        LITERATURE,
        ENGINEERING,
        MEDICINE
    }

    public enum Gender {
        MALE,
        FEMALE,
        OTHER
    }
}
