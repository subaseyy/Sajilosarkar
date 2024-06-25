package com.sajilosarkar.sajilosarkar.service;

import com.sajilosarkar.sajilosarkar.dto.IssueDto;
import com.sajilosarkar.sajilosarkar.dto.UserDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IssueService {
    void saveIssue(IssueDto issueDto, MultipartFile image, Integer userId) throws IOException;

    IssueDto findIssueById(Integer id);
    List<IssueDto> findAllIssues();
    void updateIssueStatus(Integer id, Boolean status);
    void deleteIssueById(Integer id);
    
    List<IssueDto> findIssuesByTitle(String title);
    List<IssueDto> findIssuesByCategory(String category);
    List<IssueDto> findIssuesByLocation(String location);
    List<IssueDto> findIssuesByDescription(String description);
    List<IssueDto> findIssuesByPriority(String priority);
    List<IssueDto> findIssuesByStatus(Boolean status);
    List<IssueDto> findIssuesByUser(UserDto userDto);
    List<IssueDto> findIssuesByUserId(Integer userId); // New method
    
    List<IssueDto> findIssuesByUserAndTitle(UserDto userDto, String title);
    List<IssueDto> findIssuesByUserAndCategory(UserDto userDto, String category);
    List<IssueDto> findIssuesByUserAndLocation(UserDto userDto, String location);
    List<IssueDto> findIssuesByUserAndDescription(UserDto userDto, String description);
    List<IssueDto> findIssuesByUserAndPriority(UserDto userDto, String priority);
    List<IssueDto> findIssuesByUserAndStatus(UserDto userDto, Boolean status);
}
