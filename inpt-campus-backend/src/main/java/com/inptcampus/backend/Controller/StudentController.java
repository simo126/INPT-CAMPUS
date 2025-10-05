package com.inptcampus.backend.Controller;

import com.inptcampus.backend.DTO.RoomReservationDTO;
import com.inptcampus.backend.DTO.StudentRequestDTO;
import com.inptcampus.backend.DTO.StudentResponseDTO;
import com.inptcampus.backend.Mapper.StudentMapper;
import com.inptcampus.backend.Model.Room;
import com.inptcampus.backend.Model.Student;
import com.inptcampus.backend.Service.StudentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }


    @GetMapping
    public List<StudentResponseDTO> getAllStudents() {
        return studentService.getAllStudents().stream()
                .map(StudentMapper::toDTO)  // convert entity -> DTO
                .toList();
    }

    @PostMapping
    public ResponseEntity<StudentResponseDTO> createStudent(@RequestBody @Valid StudentRequestDTO dto) {
        Student student = studentService.createStudent(dto);
        return ResponseEntity.ok(StudentMapper.toDTO(student));
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentResponseDTO> getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id)
                .map(student -> ResponseEntity.ok(StudentMapper.toDTO(student)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/available")
    public List<StudentResponseDTO> getAvailableStudents() {
        return studentService.getAvailableStudents().stream()
                .map(StudentMapper::toDTO)
                .toList();
    }



    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return ResponseEntity.ok(studentService.updateStudent(id, student));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/reserve")
    public String reserveRoom(@RequestBody RoomReservationDTO dto) {
        return studentService.reserveRoomWithRoommates(dto);
    }
    @PostMapping("/unreserve")
    public ResponseEntity<String> unreserveRoom() {
        try {
            studentService.unreserveRoomForConnectedStudent();
            return ResponseEntity.ok("Room unreserved successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
