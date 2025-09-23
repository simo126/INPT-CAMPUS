package com.inptcampus.backend.Service;

import com.inptcampus.backend.DTO.RoomReservationDTO;
import com.inptcampus.backend.DTO.StudentRequestDTO;
import com.inptcampus.backend.Model.Filiere;
import com.inptcampus.backend.Model.Room;
import com.inptcampus.backend.Model.Student;
import com.inptcampus.backend.Repository.FiliereRepository;
import com.inptcampus.backend.Repository.RoomRepository;
import com.inptcampus.backend.Repository.StudentRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final FiliereRepository filiereRepository; // add this
    private final RoomRepository roomRepository;       // add this if you use rooms
    private final PasswordEncoder passwordEncoder;     // for hashing passwords

    public StudentService(StudentRepository studentRepository,
                          FiliereRepository filiereRepository,
                          RoomRepository roomRepository,
                          PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.filiereRepository = filiereRepository;
        this.roomRepository = roomRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public Student createStudent(StudentRequestDTO dto) {
        Student student = new Student();
        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setEmail(dto.getEmail());
        student.setGender(dto.getGender());
        student.setCurrentStudyYear(dto.getCurrentStudyYear());

        // hash password here
        student.setPasswordHash(passwordEncoder.encode(dto.getPassword()));

        // attach filiere & room by id
        Filiere filiere = filiereRepository.findById(dto.getFiliereId())
                .orElseThrow(() -> new RuntimeException("Filiere not found"));
        student.setFiliere(filiere);

        if (dto.getRoomId() != null) {
            Room room = roomRepository.findById(dto.getRoomId())
                    .orElseThrow(() -> new RuntimeException("Room not found"));
            student.setRoom(room);
        }

        return studentRepository.save(student);
    }

    public Student updateStudent(Long id, Student updatedStudent) {
        return studentRepository.findById(id).map(student -> {
            student.setFirstName(updatedStudent.getFirstName());
            student.setLastName(updatedStudent.getLastName());
            student.setEmail(updatedStudent.getEmail());
            student.setFiliere(updatedStudent.getFiliere());
            student.setGender(updatedStudent.getGender());
            student.setCurrentStudyYear(updatedStudent.getCurrentStudyYear());
            student.setPasswordHash(updatedStudent.getPasswordHash());
            student.setReservationStatus(updatedStudent.isReservationStatus());
            student.setRoom(updatedStudent.getRoom());
            student.setActive(updatedStudent.isActive());
            return studentRepository.save(student);
        }).orElseThrow(() -> new RuntimeException("Student not found with id " + id));
    }

    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Student not found with id " + id);
        }
        studentRepository.deleteById(id);
    }

    public String reserveRoomWithRoommates(RoomReservationDTO dto) {
        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (student.getRoom() != null) {
            throw new RuntimeException("Student has already reserved a room");
        }

        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        // Gather all students to reserve together
        List<Student> allStudents = new ArrayList<>();
        allStudents.add(student);

        if (dto.getRoommateEmails() != null) {
            for (String email : dto.getRoommateEmails()) {
                Student roommate = studentRepository.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("Roommate not found: " + email));

                if (roommate.getRoom() != null) {
                    throw new RuntimeException("Roommate " + email + " has already reserved a room");
                }

                if (roommate.getGender() != student.getGender()) {
                    throw new RuntimeException("Roommate " + email + " has a different gender");
                }

                allStudents.add(roommate);
            }
        }

        // Check capacity
        if (room.getCurrentOccupancy() + allStudents.size() > room.getMaxCapacity()) {
            throw new RuntimeException("Not enough space in the room for all selected students");
        }

        // Reserve room for all students
        for (Student s : allStudents) {
            s.setRoom(room);
            s.setReservationStatus(true);
            studentRepository.save(s);
            room.getStudents().add(s);
        }

        room.setCurrentOccupancy(room.getStudents().size());
        roomRepository.save(room);

        return room.getRoomNumber();
    }

}
