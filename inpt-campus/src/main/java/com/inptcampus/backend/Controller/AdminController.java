package com.inptcampus.backend.Controller;

import com.inptcampus.backend.Repository.ReservationRepository;
import com.inptcampus.backend.Repository.RoomRepository;
import com.inptcampus.backend.Repository.StudentRepository;
import com.inptcampus.backend.Model.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private RoomRepository roomRepository;

    /**
     * Deletes all students, reservations, and resets all room occupancies to zero.
     */
    @DeleteMapping("/reset")
    public String resetDatabase() {
        try {
            // Step 1: Delete all reservations
            reservationRepository.deleteAll();

            // Step 2: Delete all students
            studentRepository.deleteAll();

            // Step 3: Reset all room occupancies to zero
            List<Room> rooms = roomRepository.findAll();
            for (Room room : rooms) {
                room.setCurrentOccupancy(0);
            }
            roomRepository.saveAll(rooms);

            return "All students and reservations deleted. Room occupancies reset.";
        } catch (Exception e) {
            return "Error during reset: " + e.getMessage();
        }
    }
}
