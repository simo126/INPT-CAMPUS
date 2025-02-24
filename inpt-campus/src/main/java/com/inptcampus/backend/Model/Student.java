package com.inptcampus.backend.Model;



import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "students", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
public class Student implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @ManyToOne
    @JoinColumn(name = "filiere_id", nullable = false)
    private Filiere filiere;

    @Column(nullable = false)
    private String gender;

    @Column(name = "current_study_year", nullable = false)
    private int currentStudyYear;

    @Column(nullable = false)
    private String passwordHash; // Secure password storage

    @Column(name = "reservation_status", nullable = false)
    private boolean reservationStatus;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = true)
    private Room room; // Link to assigned dormitory room

    public Student() {
    }

    public Student(String firstName, String lastName, String email, Filiere filiere, String gender, int currentStudyYear, String passwordHash, boolean reservationStatus) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.filiere = filiere;
        this.gender = gender;
        this.currentStudyYear = currentStudyYear;
        this.passwordHash = passwordHash;
        this.reservationStatus = reservationStatus;
    }
}
