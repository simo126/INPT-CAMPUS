package com.inptcampus.backend.Controller;

import com.inptcampus.backend.DTO.IssueRequestDTO;
import com.inptcampus.backend.DTO.IssueResponseDTO;
import com.inptcampus.backend.Mapper.IssueMapper;
import com.inptcampus.backend.Model.Issue;
import com.inptcampus.backend.Model.Student;
import com.inptcampus.backend.Repository.StudentRepository;
import com.inptcampus.backend.Service.IssueService;
import com.inptcampus.backend.Service.StudentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class IssueController {

    private final IssueService issueService;

    private final StudentRepository studentRepository;

    public IssueController(IssueService issueService, StudentRepository studentRepository) {
        this.issueService = issueService;
        this.studentRepository = studentRepository;
    }
    @GetMapping("/my")
    public List<IssueResponseDTO> getMyIssues(Authentication authentication) {

        String email = authentication.getName();

        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return issueService.getIssuesForStudent(student).stream()
                .map(IssueMapper::toDTO)
                .collect(Collectors.toList());
    }
    @GetMapping("/unresolved")
    public List<IssueResponseDTO> getUnresolvedIssues() {
        return issueService.getUnresolvedIssues().stream()
                .map(IssueMapper::toDTO)
                .collect(Collectors.toList());
    }
    @GetMapping
    public List<IssueResponseDTO> getAllIssues() {
        return issueService.getAllIssues().stream()
                .map(IssueMapper::toDTO)
                .collect(Collectors.toList());
    }

    @PostMapping
    public IssueResponseDTO createIssue(@RequestBody IssueRequestDTO dto) {
        Issue issue = issueService.createIssue(dto);
        return IssueMapper.toDTO(issue);
    }

    @PatchMapping("/{id}/resolve")
    public IssueResponseDTO resolveIssue(@PathVariable Long id) {
        Issue issue = issueService.resolveIssue(id);
        return IssueMapper.toDTO(issue);
    }
}
