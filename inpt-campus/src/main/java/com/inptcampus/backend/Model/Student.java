package com.inptcampus.backend.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@DiscriminatorValue("STUDENT")
public class Student extends User {


    @ManyToOne
    @JoinColumn(name = "filiere_id", nullable = true)
    private Filiere filiere;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)   // Allow null for Admin
    private Gender gender;

    @Column(name = "current_study_year", nullable = true)
    private Integer currentStudyYear; // use Integer instead of int

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = true)
    private Room room;

    @Column(name = "reservation_status", nullable = true)
    private Boolean reservationStatus;

    // Getters and Setters
    public Filiere getFiliere() { return filiere; }
    public void setFiliere(Filiere filiere) { this.filiere = filiere; }

    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }

    public Integer getCurrentStudyYear() { return currentStudyYear; }
    public void setCurrentStudyYear(Integer currentStudyYear) { this.currentStudyYear = currentStudyYear; }

    public Room getRoom() { return room; }
    public void setRoom(Room room) { this.room = room; }

    public Boolean isReservationStatus() { return reservationStatus; }
    public void setReservationStatus(Boolean reservationStatus) { this.reservationStatus = reservationStatus; }

}
