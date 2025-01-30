package com.inptcampus.backend.Repository;

import com.inptcampus.backend.Model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByBuildingId(Long buildingId);
}
