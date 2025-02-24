package com.inptcampus.backend.Model;


import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    private String id; // Custom ID format: {building}-{floor}-{roomNumber}

    @Column(nullable = false)
    private int maxCapacity;

    @Column(nullable = false)
    private int currentOccupancy = 0;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Student> students;


    public Room() {
    }

    public Room(String building, int floor, int roomNumber, int maxCapacity) {
        this.id = building + "-" + floor + "-" + roomNumber;
        this.maxCapacity = maxCapacity;
        this.currentOccupancy = 0;
    }


    public String getId() {
        return id;
    }

    public void setId(String building, int floor, int roomNumber) {
        this.id = building + "-" + floor + "-" + roomNumber;
    }

    public int getMaxCapacity() {
        return maxCapacity;
    }

    public void setMaxCapacity(int maxCapacity) {
        this.maxCapacity = maxCapacity;
    }

    public int getCurrentOccupancy() {
        return currentOccupancy;
    }

    public void setCurrentOccupancy(int currentOccupancy) {
        this.currentOccupancy = currentOccupancy;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
        this.currentOccupancy = students != null ? students.size() : 0;
    }
}
