package com.inptcampus.backend.DTO;

import com.inptcampus.backend.Model.RoomType;

public class RoomResponseDTO {

    private Long id;
    private String roomNumber;
    private String buildingName;
    private int floor;
    private RoomType roomType;
    private int maxCapacity;
    private int currentOccupancy;
    private boolean active;


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }

    public String getBuildingName() { return buildingName; }
    public void setBuildingName(String buildingName) { this.buildingName = buildingName; }

    public int getFloor() { return floor; }
    public void setFloor(int floor) { this.floor = floor; }

    public RoomType getRoomType() { return roomType; }
    public void setRoomType(RoomType roomType) { this.roomType = roomType; }

    public int getMaxCapacity() { return maxCapacity; }
    public void setMaxCapacity(int maxCapacity) { this.maxCapacity = maxCapacity; }

    public int getCurrentOccupancy() { return currentOccupancy; }
    public void setCurrentOccupancy(int currentOccupancy) { this.currentOccupancy = currentOccupancy; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
