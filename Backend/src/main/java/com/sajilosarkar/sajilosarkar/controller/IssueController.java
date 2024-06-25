package com.sajilosarkar.sajilosarkar.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.sajilosarkar.sajilosarkar.dto.IssueDto;
import com.sajilosarkar.sajilosarkar.service.IssueService;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import javax.naming.Binding;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
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
    public ResponseEntity<Map<String, String>> addIssue(
            @RequestPart("issue") IssueDto issueDto,
            @RequestPart("image") MultipartFile image,
            @RequestPart("userId") Integer userId,
            HttpServletRequest request) throws IOException {

        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Unauthorized");
            return ResponseEntity.status(401).body(response);
        }

        try {
            // Assume issueService.saveIssue() handles saving the issue details and image
            issueService.saveIssue(issueDto, image, userId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Issue added successfully!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
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

    // @GetMapping("{userid}/list")
    // public ResponseEntity<List<IssueDto>> getIssuesByUser(@PathVariable("userId")
    // Integer userId) {
    // List<IssueDto> issues = issueService.findIssueByUserId(userId);
    // return ResponseEntity.ok(issues);
    // }

    @GetMapping("{userid}/list")
    public ResponseEntity<List<IssueDto>> getIssuesByUser(@PathVariable Integer userid) {
        List<IssueDto> issues = issueService.findIssueByUserId(userid);
        return ResponseEntity.ok(issues);
    }

    @GetMapping("{userid}/list/{id}")
    public ResponseEntity<List<IssueDto>> getIssuesByUser(@PathVariable Integer userid, @PathVariable Integer id) {
        List<IssueDto> issues = issueService.findIssueByUserId(userid);
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
        List<IssueDto> issues = issueService.findIssueByTitle(title);
        return ResponseEntity.ok(issues);
    }

    @GetMapping("list/{location}")
    public ResponseEntity<List<IssueDto>> getIssueByLocation(@RequestParam String location) {
        List<IssueDto> issues = issueService.findIssueByLocation(location);
        return ResponseEntity.ok(issues);
    }

    @GetMapping("list/{status}")
    public ResponseEntity<List<IssueDto>> getIssueByStatus(@RequestParam Boolean status) {
        List<IssueDto> issues = issueService.findIssueByStatus(status);
        return ResponseEntity.ok(issues);
    }

    @GetMapping("/list/{category}")
    public ResponseEntity<List<IssueDto>> getIssueByCategory(@RequestParam String category) {
        List<IssueDto> issues = issueService.findIssueByCategory(category);
        return ResponseEntity.ok(issues);
    }

}
