package com.inptcampus.backend.Service;

import com.inptcampus.backend.DTO.ReservationDTO;
import com.inptcampus.backend.Model.Reservation;
import com.inptcampus.backend.Model.Room;
import com.inptcampus.backend.Model.Student;
import com.inptcampus.backend.Repository.ReservationRepository;
import com.inptcampus.backend.Repository.RoomRepository;
import com.inptcampus.backend.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.Set;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private StudentRepository studentRepository;

    public String createReservation(ReservationDTO reservationDTO) {
        // 🚨 Check if the main student already has an active reservation
        if (reservationRepository.existsByStudentIdAndStatus(reservationDTO.getStudentId())) {
            return "You already have an active reservation.";
        }

        // Fetch main student
        Student student = studentRepository.findById(reservationDTO.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found."));

        // Fetch the room
        Room room = roomRepository.findById(reservationDTO.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found."));

        // 🚨 Check if room is already full
        if (room.getCurrentOccupancy() >= room.getMaxCapacity()) {
            return "Room is already full.";
        }

        // Process roommates
        Set<Student> roommates = new HashSet<>();
        for (Long roommateId : reservationDTO.getRoommateIds()) {
            Student roommate = studentRepository.findById(roommateId)
                    .orElseThrow(() -> new RuntimeException("Roommate with ID " + roommateId + " not found."));

            // 🚨 Check if the roommate already has an active reservation
            if (reservationRepository.existsByStudentIdAndStatus(roommate.getId())) {
                return "Roommate with ID " + roommateId + " already has a reservation.";
            }
            roommates.add(roommate);
        }

        // 🚨 Ensure total occupancy does not exceed max capacity
        if (roommates.size() + 1 > room.getMaxCapacity()) {
            return "Room exceeds max capacity.";
        }

        // Create a single reservation that includes both the main student and roommates
        Reservation reservation = new Reservation();
        reservation.setStudent(student);
        reservation.setRoom(room);
        reservation.setStartDate(reservationDTO.getStartDate());
        reservation.setEndDate(reservationDTO.getEndDate());
        reservation.setStatus("ACTIVE");
        reservation.setRoommates(roommates);

        // Save the reservation
        reservationRepository.save(reservation);

        // 🚨 Correctly update room occupancy
        room.setCurrentOccupancy(room.getCurrentOccupancy() + 1 + roommates.size());
        roomRepository.save(room);

        return "Reservation successful!";
    }


}
