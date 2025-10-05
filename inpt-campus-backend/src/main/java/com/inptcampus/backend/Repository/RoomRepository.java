package com.inptcampus.backend.Repository;

import com.inptcampus.backend.Model.Building;
import com.inptcampus.backend.Model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByRoomNumber(String roomNumber);
    boolean existsByRoomNumber(String roomNumber);
    boolean existsByBuildingAndRoomNumber(Building building, String roomNumber);
}