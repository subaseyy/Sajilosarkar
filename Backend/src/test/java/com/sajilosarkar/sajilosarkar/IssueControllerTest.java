package com.sajilosarkar.sajilosarkar;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.sajilosarkar.sajilosarkar.controller.IssueController;
import com.sajilosarkar.sajilosarkar.dto.IssueDto;
import com.sajilosarkar.sajilosarkar.service.IssueService;

public class IssueControllerTest {

    @Mock
    private IssueService issueService;

    @InjectMocks
    private IssueController issueController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateIssueSuccess() throws Exception {
        Integer userId = 1;
        IssueDto issueDto = new IssueDto();
        MultipartFile file = mock(MultipartFile.class);

        doNothing().when(issueService).saveIssue(issueDto, file, userId);

        ResponseEntity<?> response = issueController.createIssue(userId, issueDto, file);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Issue added successfully!", ((Map) response.getBody()).get("message"));
    }

    @Test
    public void testCreateIssueFailure() throws Exception {
        Integer userId = 1;
        IssueDto issueDto = new IssueDto();
        MultipartFile file = mock(MultipartFile.class);

        doThrow(new RuntimeException()).when(issueService).saveIssue(issueDto, file, userId);

        ResponseEntity<?> response = issueController.createIssue(userId, issueDto, file);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Failed to add issue", ((Map) response.getBody()).get("message"));
    }

    @Test
    public void testGetAllIssues() {
        List<IssueDto> issues = new ArrayList<>();
        when(issueService.findAllIssues()).thenReturn(issues);

        ResponseEntity<List<IssueDto>> response = issueController.getAllIssues();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(issues, response.getBody());
    }

    @Test
    public void testGetIssuesByUser() {
        Integer userId = 1;
        List<IssueDto> issues = new ArrayList<>();
        when(issueService.findIssuesByUserId(userId)).thenReturn(issues);

        ResponseEntity<List<IssueDto>> response = issueController.getIssuesByUser(userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(issues, response.getBody());
    }

    @Test
    public void testDeleteIssueByIdSuccess() {
        Integer userId = 1;
        Integer issueId = 1;

        doNothing().when(issueService).deleteIssueById(issueId);

        ResponseEntity<String> response = issueController.deleteIssueById(userId, issueId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Issue deleted successfully", response.getBody());
    }

    @Test
    public void testDeleteIssueByIdFailure() {
        Integer userId = 1;
        Integer issueId = 1;

        doThrow(new RuntimeException("Error deleting issue")).when(issueService).deleteIssueById(issueId);

        ResponseEntity<String> response = issueController.deleteIssueById(userId, issueId);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Failed to delete issue: Error deleting issue", response.getBody());
    }

    @Test
    public void testGetIssueDetails() {
        Integer issueId = 1;
        IssueDto issueDto = new IssueDto();
        when(issueService.findIssueById(issueId)).thenReturn(issueDto);

        ResponseEntity<IssueDto> response = issueController.getIssueDetails(issueId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(issueDto, response.getBody());
    }

    @Test
    public void testGetIssueDetailsNotFound() {
        Integer issueId = 1;
        when(issueService.findIssueById(issueId)).thenReturn(null);

        ResponseEntity<IssueDto> response = issueController.getIssueDetails(issueId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
