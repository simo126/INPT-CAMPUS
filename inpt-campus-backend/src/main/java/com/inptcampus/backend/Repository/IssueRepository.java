package com.inptcampus.backend.Repository;

import com.inptcampus.backend.Model.Issue;
import com.inptcampus.backend.Model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByRoomId(Long roomId);
    List<Issue> findByResolved(boolean resolved);
    List<Issue> findByStudent(Student student);
    List<Issue> findByStudentId(Long studentId);
}

