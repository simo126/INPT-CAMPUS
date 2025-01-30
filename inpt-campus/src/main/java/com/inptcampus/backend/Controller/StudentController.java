package com.inptcampus.backend.Controller;

import com.inptcampus.backend.DTO.StudentDTO;
import com.inptcampus.backend.Model.Student;
import com.inptcampus.backend.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Get all students with filiere names
    @GetMapping
    public List<StudentDTO> getAllStudents() {
        return studentService.getAllStudentsWithFiliereName();
    }

    // Get a single student by ID
    @GetMapping("/{id}")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable Long id) {
        Student student = studentService.getStudentById(id);
        if (student == null) {
            return ResponseEntity.notFound().build();
        }

        String filiereName = studentService.getFiliereNameById(student.getFiliereId());
        StudentDTO studentDTO = new StudentDTO(
                student.getId(),
                student.getName(),
                student.getEmail(),
                filiereName,
                student.getYear(),
                student.getGender()
        );

        return ResponseEntity.ok(studentDTO);
    }

    // Add a new student
    @PostMapping
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        Student createdStudent = studentService.saveStudent(student);
        return ResponseEntity.ok(createdStudent);
    }

    // Update an existing student
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student updatedStudent) {
        Student student = studentService.updateStudent(id, updatedStudent);
        return student != null ? ResponseEntity.ok(student) : ResponseEntity.notFound().build();
    }

    // Delete a student by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        boolean isDeleted = studentService.deleteStudent(id);
        return isDeleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

}
