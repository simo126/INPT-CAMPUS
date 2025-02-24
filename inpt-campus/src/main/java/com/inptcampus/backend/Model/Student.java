package com.inptcampus.backend.Model;


import jakarta.persistence.*;

@Entity
@Table(name = "students", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
public class Student {

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
    private String password;

    @Column(name = "reservation_status", nullable = false)
    private boolean reservationStatus;


    public Student() {
    }

    public Student(String firstName, String lastName, String email, Filiere filiere, String gender, int currentStudyYear, String password, boolean reservationStatus) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.filiere = filiere;
        this.gender = gender;
        this.currentStudyYear = currentStudyYear;
        this.password = password;
        this.reservationStatus = reservationStatus;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getCurrentStudyYear() {
        return currentStudyYear;
    }

    public void setCurrentStudyYear(int currentStudyYear) {
        this.currentStudyYear = currentStudyYear;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isReservationStatus() {
        return reservationStatus;
    }

    public void setReservationStatus(boolean reservationStatus) {
        this.reservationStatus = reservationStatus;
    }
}
