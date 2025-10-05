package com.inptcampus.backend.Service;

import com.inptcampus.backend.DTO.IssueRequestDTO;
import com.inptcampus.backend.Model.Issue;
import com.inptcampus.backend.Model.Room;
import com.inptcampus.backend.Model.Student;
import com.inptcampus.backend.Repository.IssueRepository;
import com.inptcampus.backend.Repository.RoomRepository;
import com.inptcampus.backend.Repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IssueService {

    private final IssueRepository issueRepository;
    private final RoomRepository roomRepository;
    private final StudentRepository studentRepository;
    public IssueService(IssueRepository issueRepository, RoomRepository roomRepository, StudentRepository studentRepository) {
        this.issueRepository = issueRepository;
        this.roomRepository = roomRepository;
        this.studentRepository = studentRepository;
    }
    public List<Issue> getUnresolvedIssues() {
        return issueRepository.findByResolved(false);
    }
    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    public Issue createIssue(IssueRequestDTO dto) {
        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Issue issue = new Issue();
        issue.setTitle(dto.getTitle());
        issue.setDescription(dto.getDescription());
        issue.setRoom(room);
        issue.setStudent(student);  // associate student
        return issueRepository.save(issue);
    }
    public List<Issue> getIssuesForStudent(Student student) {
        return issueRepository.findByStudent(student);
    }
    public Issue resolveIssue(Long id) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));
        issue.setResolved(true);
        return issueRepository.save(issue);
    }
}
