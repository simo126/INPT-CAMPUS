package com.inptcampus.backend.Controller;

import com.inptcampus.backend.DTO.IssueRequestDTO;
import com.inptcampus.backend.DTO.IssueResponseDTO;
import com.inptcampus.backend.Mapper.IssueMapper;
import com.inptcampus.backend.Model.Issue;
import com.inptcampus.backend.Service.IssueService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
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
