package com.inptcampus.backend.Controller;

import com.inptcampus.backend.Model.Issue;
import com.inptcampus.backend.Service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @PostMapping
    public Issue reportIssue(@RequestParam Long studentId,
                             @RequestParam String roomId,
                             @RequestParam String description) {
        return issueService.reportIssue(studentId, roomId, description);
    }
}
