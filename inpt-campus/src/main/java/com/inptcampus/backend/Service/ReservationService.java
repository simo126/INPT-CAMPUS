package com.inptcampus.backend.Service;

import com.inptcampus.backend.Model.Room;
import com.inptcampus.backend.Model.Student;
import com.inptcampus.backend.Repository.RoomRepository;
import com.inptcampus.backend.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private StudentRepository studentRepository;

    public Student reserveRoom(Long studentId, String roomId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (room.getCurrentOccupancy() >= room.getMaxCapacity()) {
            throw new RuntimeException("Room is full");
        }

        if (student.isReservationStatus()) {
            throw new RuntimeException("Student already reserved a room");
        }

        student.setRoom(room);
        student.setReservationStatus(true);
        room.setCurrentOccupancy(room.getCurrentOccupancy() + 1);

        roomRepository.save(room);
        return studentRepository.save(student);
    }
}
