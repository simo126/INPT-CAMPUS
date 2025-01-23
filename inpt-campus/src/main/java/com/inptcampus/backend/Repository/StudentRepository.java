package com.inptcampus.backend.Repository;



import com.inptcampus.backend.Model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    @Query("SELECT s.id AS id, s.name AS name, s.email AS email, s.year AS year, s.gender AS gender, f.name AS filiereName " +
            "FROM Student s JOIN Filliere f ON s.filiereId = f.id")
    List<Object[]> findAllWithFiliereName();

}