package com.inptcampus.backend.Service;

import com.inptcampus.backend.DTO.StudentDTO;
import com.inptcampus.backend.Model.Student;
import com.inptcampus.backend.Repository.FiliereRepository;
import com.inptcampus.backend.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {
    @Autowired
    private FiliereRepository filiereRepository;
    @Autowired
    private StudentRepository studentRepository;



    public List<StudentDTO> getAllStudentsWithFiliereName() {
        List<Object[]> results = studentRepository.findAllWithFiliereName();
        List<StudentDTO> studentDTOs = new ArrayList<>();

        for (Object[] result : results) {
            studentDTOs.add(new StudentDTO(
                    (Long) result[0],
                    (String) result[1],
                    (String) result[2],
                    (String) result[5],
                    (String) result[3],
                    (String) result[4]
            ));
        }

        return studentDTOs;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }


    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }


    @Transactional
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }


    public Student updateStudent(Long id, Student updatedStudent) {
        return studentRepository.findById(id).map(student -> {
            student.setName(updatedStudent.getName());
            student.setEmail(updatedStudent.getEmail());
            student.setFiliereId(updatedStudent.getFiliereId());
            student.setYear(updatedStudent.getYear());
            student.setGender(updatedStudent.getGender());
            return studentRepository.save(student);
        }).orElse(null);
    }


    public boolean deleteStudent(Long id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public String getFiliereNameById(Long filiereId) {
        return filiereRepository.findNameById(filiereId);

    }


}
