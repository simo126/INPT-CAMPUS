package com.inptcampus.backend.Service;
import com.inptcampus.backend.DTO.RegisterRequestDTO;
import com.inptcampus.backend.DTO.RegisterResponseDTO;
import com.inptcampus.backend.DTO.RoomReservationDTO;
import com.inptcampus.backend.DTO.StudentRequestDTO;
import com.inptcampus.backend.Model.*;
import com.inptcampus.backend.Repository.FiliereRepository;
import com.inptcampus.backend.Repository.IssueRepository;
import com.inptcampus.backend.Repository.RoomRepository;
import com.inptcampus.backend.Repository.StudentRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final FiliereRepository filiereRepository; // add this
    private final RoomRepository roomRepository;       // add this if you use rooms
    private final PasswordEncoder passwordEncoder;     // for hashing passwords
    private final IssueRepository issueRepository;
    public StudentService(StudentRepository studentRepository,
                          FiliereRepository filiereRepository,
                          RoomRepository roomRepository,
                          PasswordEncoder passwordEncoder,
                          IssueRepository issueRepository) {
        this.studentRepository = studentRepository;
        this.filiereRepository = filiereRepository;
        this.roomRepository = roomRepository;
        this.passwordEncoder = passwordEncoder;
        this.issueRepository = issueRepository;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    @Transactional
    public void unreserveRoomForConnectedStudent() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = (String) authentication.getPrincipal(); // <- just cast to String

        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Room room = student.getRoom();
        if (room == null) {
            throw new RuntimeException("You have no active reservation");
        }

        // Decrease room occupancy
        room.setCurrentOccupancy(Math.max(0, room.getCurrentOccupancy() - 1));
        roomRepository.save(room);

        // Reset student's reservation
        student.setRoom(null);
        student.setReservationStatus(false);
        studentRepository.save(student);
    }
    public RegisterResponseDTO registerStudent(RegisterRequestDTO request) {
        Student student = new Student();
        student.setFirstName(request.getFirstName());
        student.setLastName(request.getLastName());
        student.setEmail(request.getEmail());
        student.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        student.setGender(request.getGender());
        student.setCurrentStudyYear(request.getCurrentStudyYear());
        student.setReservationStatus(false);


        if (request.getFiliereId() != null) {
            Filiere filiere = filiereRepository.findById(request.getFiliereId())
                    .orElseThrow(() -> new RuntimeException("Filiere not found"));
            student.setFiliere(filiere);
        }

        student.setRole(Role.STUDENT);
        Student saved = studentRepository.save(student);
        return new RegisterResponseDTO(saved.getId(), saved.getEmail(), "Student registered successfully");
    }
    public Student createStudent(StudentRequestDTO dto) {
        Student student = new Student();
        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setEmail(dto.getEmail());
        student.setGender(dto.getGender());
        student.setCurrentStudyYear(dto.getCurrentStudyYear());
        student.setRole(Role.STUDENT);
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

    public void deleteStudent(Long studentId) {
        if (!studentRepository.existsById(studentId)) {
            throw new RuntimeException("Student not found with id " + studentId);
        }
        List<Issue> issues = issueRepository.findByStudentId(studentId);
        issues.forEach(issue -> issueRepository.delete(issue));
        studentRepository.deleteById(studentId);
    }

    public String reserveRoomWithRoommates(RoomReservationDTO dto) {
        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (student.getRoom() != null) {
            throw new RuntimeException("Student has already reserved a room");
        }

        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));


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


        if (room.getCurrentOccupancy() + allStudents.size() > room.getMaxCapacity()) {
            throw new RuntimeException("Not enough space in the room for all selected students");
        }


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

    public List<Student> getAvailableStudents() {
        return studentRepository.findByRoomIsNull();
    }


}
