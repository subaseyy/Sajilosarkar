package com.sajilosarkar.sajilosarkar.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.sajilosarkar.sajilosarkar.dto.IssueDto;
import com.sajilosarkar.sajilosarkar.service.IssueService;

import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/issue")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createIssue(@RequestParam Integer userId,
            @RequestPart("issue") IssueDto issueDto,
            @RequestPart("image") MultipartFile file) {
        try {
            issueService.saveIssue(issueDto, file, userId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Issue added successfully!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception details
            Map<String, String> response = new HashMap<>();
            response.put("message", "Failed to add issue");
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<IssueDto>> getAllIssues() {
        List<IssueDto> issues = issueService.findAllIssues();
        return ResponseEntity.ok(issues);
    }

    @GetMapping("{userid}/list")
    public ResponseEntity<List<IssueDto>> getIssuesByUser(@PathVariable Integer userid) {
        List<IssueDto> issues = issueService.findIssuesByUserId(userid);
        return ResponseEntity.ok(issues);
    }

    @GetMapping("{userid}/list/{id}")
    public ResponseEntity<List<IssueDto>> getIssuesByUser(@PathVariable Integer userid, @PathVariable Integer id) {
        List<IssueDto> issues = issueService.findIssuesByUserId(userid);
        return ResponseEntity.ok(issues);
    }

    @DeleteMapping("{id}/delete")
    public ResponseEntity<String> deleteIssue(@PathVariable Integer id) {
        issueService.deleteIssueById(id);
        return ResponseEntity.ok("Issue deleted successfully!");
    }

    @GetMapping("details/{id}")
    public ResponseEntity<IssueDto> getIssueDetails(@PathVariable Integer id) {
        IssueDto issueDto = issueService.findIssueById(id);
        if (issueDto != null) {
            return ResponseEntity.ok(issueDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("list/{title}")
    public ResponseEntity<List<IssueDto>> getIssueByTitle(@RequestParam String title) {
        List<IssueDto> issues = issueService.findIssuesByTitle(title);
        return ResponseEntity.ok(issues);
    }

    @GetMapping("list/{location}")
    public ResponseEntity<List<IssueDto>> getIssueByLocation(@RequestParam String location) {
        List<IssueDto> issues = issueService.findIssuesByLocation(location);
        return ResponseEntity.ok(issues);
    }

    @GetMapping("list/{status}")
    public ResponseEntity<List<IssueDto>> getIssueByStatus(@RequestParam Boolean status) {
        List<IssueDto> issues = issueService.findIssuesByStatus(status);
        return ResponseEntity.ok(issues);
    }

    @GetMapping("/list/{category}")
    public ResponseEntity<List<IssueDto>> getIssueByCategory(@RequestParam String category) {
        List<IssueDto> issues = issueService.findIssuesByCategory(category);
        return ResponseEntity.ok(issues);
    }

}
