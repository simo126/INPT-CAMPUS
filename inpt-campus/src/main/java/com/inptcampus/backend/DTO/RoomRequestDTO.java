package com.inptcampus.backend.DTO;

import com.inptcampus.backend.Model.RoomType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class RoomRequestDTO {

    @NotBlank
    @Size(max = 20)
    private String roomNumber;

    @NotNull
    private Long buildingId;

    @Min(1)
    private int floor;

    @NotNull
    private RoomType roomType;


    @Min(1)
    private int maxCapacity;

    private Boolean active;


    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }

    public Long getBuildingId() { return buildingId; }
    public void setBuildingId(Long buildingId) { this.buildingId = buildingId; }

    public int getFloor() { return floor; }
    public void setFloor(int floor) { this.floor = floor; }

    public RoomType getRoomType() { return roomType; }
    public void setRoomType(RoomType roomType) { this.roomType = roomType; }

    public int getMaxCapacity() { return maxCapacity; }
    public void setMaxCapacity(int maxCapacity) { this.maxCapacity = maxCapacity; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}
