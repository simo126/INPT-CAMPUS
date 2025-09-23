package com.inptcampus.backend.DTO;

public class BuildingResponseDTO {

    private Long id;
    private String name;
    private String address;
    private int numFloors;
    private String description;
    private boolean active;
    private int roomCount; // optional: number of rooms

    // Getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public int getNumFloors() { return numFloors; }
    public void setNumFloors(int numFloors) { this.numFloors = numFloors; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public int getRoomCount() { return roomCount; }
    public void setRoomCount(int roomCount) { this.roomCount = roomCount; }
}
