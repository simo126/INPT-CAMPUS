package com.inptcampus.backend.Model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "rooms")
public class Room implements Serializable {

    @Id
    @Column(unique = true, nullable = false)
    private String id; // Format: {building}-{floor}-{roomNumber}

    @Column(nullable = false)
    private int maxCapacity;

    @Column(nullable = false)
    private int currentOccupancy = 0;

    @Column(nullable = false)
    private int floor;

    @Column(nullable = false)
    private String roomType;

    @ManyToOne
    @JoinColumn(name = "building_id", nullable = false)
    private Building building;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Student> students;

    public Room() {
    }

    public Room(String id, int maxCapacity, int floor, String roomType, Building building) {
        this.id = id;
        this.maxCapacity = maxCapacity;
        this.floor = floor;
        this.roomType = roomType;
        this.currentOccupancy = 0;
        this.building = building;
    }

    // Getters and setters

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

    public int getFloor() {
        return floor;
    }

    public void setFloor(int floor) {
        this.floor = floor;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
        this.currentOccupancy = (students != null) ? students.size() : 0;
    }

    public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }
}
