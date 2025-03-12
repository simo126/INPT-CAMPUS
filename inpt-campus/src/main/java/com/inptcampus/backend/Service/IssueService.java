package com.inptcampus.backend.Service;

import com.inptcampus.backend.Model.Issue;
import com.inptcampus.backend.Model.Room;
import com.inptcampus.backend.Model.Student;
import com.inptcampus.backend.Repository.IssueRepository;
import com.inptcampus.backend.Repository.RoomRepository;
import com.inptcampus.backend.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IssueService {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private StudentRepository studentRepository;

    public Issue reportIssue(Long studentId, String roomId, String description) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        Issue issue = new Issue(room, description, false, student);
        return issueRepository.save(issue);
    }
}
