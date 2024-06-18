package com.sajilosarkar.sajilosarkar.controller;


import org.springframework.web.bind.annotation.*;

import com.sajilosarkar.sajilosarkar.dto.IssueDto;
import com.sajilosarkar.sajilosarkar.service.IssueService;


import org.springframework.http.ResponseEntity;


import java.util.List;



@RestController
@RequestMapping("/api/issue")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addIssue(@RequestBody IssueDto issueDto) {
        if (issueDto.getStatus() == null) {
            issueDto.setStatus(true); // or some other default status
        }
        issueService.saveIssue(issueDto);
        return ResponseEntity.ok("Issue added successfully!");
    }

    @GetMapping("/list")
    public ResponseEntity<List<IssueDto>> getAllIssues() {
        List<IssueDto> issues = issueService.findAllIssues();
        return ResponseEntity.ok(issues);
    }
    
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteIssue(@PathVariable Integer id) {
        issueService.deleteIssueById(id);
        return ResponseEntity.ok("Issue deleted successfully!");
    }
   @GetMapping("/list/{title}")
   public ResponseEntity<List<IssueDto>> getIssueByTitle(@RequestParam String title) {
       List<IssueDto> issues = issueService.findIssueByTitle(title);
       return ResponseEntity.ok(issues);
   }
   
   @GetMapping("/list/{location}")
   public ResponseEntity<List<IssueDto>> getIssueByLocation(@RequestParam String location) {
       List<IssueDto> issues = issueService.findIssueByLocation(location);
       return ResponseEntity.ok(issues);
   }

   @GetMapping("/list/{status}")
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
