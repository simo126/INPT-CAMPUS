package com.inptcampus.backend.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

@Entity
@Table(name = "rooms",
        uniqueConstraints = @UniqueConstraint(columnNames = {"building_id", "room_number"}))
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    @Column(nullable = false)
    private String roomNumber;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "building_id", nullable = false)
    private Building building;

    @Min(1)
    @Column(nullable = false)
    private int floor;

    @NotNull
    @Column(name = "room_type", nullable = false)
    @Enumerated(EnumType.STRING) // stores the enum name (DOUBLE, QUADRUPLE) instead of ordinal number
    private RoomType roomType;

    @Min(1)
    @Column(name = "max_capacity", nullable = false)
    private int maxCapacity;

    @Min(0)
    @Column(name = "current_occupancy", nullable = false)
    private int currentOccupancy = 0;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Student> students;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Issue> issues;

    @Column(nullable = false)
    private boolean active = true;

    public Room() {
    }

    public Room(String roomNumber, Building building, int floor, RoomType roomType, int maxCapacity) {
        this.roomNumber = roomNumber;
        this.building = building;
        this.floor = floor;
        this.roomType = roomType;
        this.maxCapacity = maxCapacity;
        this.currentOccupancy = 0;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }

    public int getFloor() {
        return floor;
    }

    public void setFloor(int floor) {
        this.floor = floor;
    }

    public RoomType getRoomType() {
        return roomType;
    }

    public void setRoomType(RoomType roomType) {
        this.roomType = roomType;
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
        this.currentOccupancy = (students != null) ? students.size() : 0;
    }

    public List<Issue> getIssues() {
        return issues;
    }

    public void setIssues(List<Issue> issues) {
        this.issues = issues;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    // Helper method to check if room has available space
    public boolean hasAvailableSpace() {
        return currentOccupancy < maxCapacity;
    }
}
