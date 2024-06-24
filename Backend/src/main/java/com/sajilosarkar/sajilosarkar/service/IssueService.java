package com.sajilosarkar.sajilosarkar.service;
import com.sajilosarkar.sajilosarkar.dto.IssueDto;
import com.sajilosarkar.sajilosarkar.dto.UserDto;


import java.io.IOException;
import java.util.List;

public interface IssueService {
    void saveIssue(IssueDto issueDto) throws IOException;
    IssueDto findIssueById(Integer id);
    List<IssueDto> findAllIssues();
    void updateIssueStatus(Integer id, Boolean status);
    void deleteIssueById(Integer id);
    List<IssueDto> findIssueByTitle(String title);
    List<IssueDto> findIssueByCategory(String category);
    List<IssueDto> findIssueByLocation(String location);
    List<IssueDto> findIssueByDescription(String description);
    List<IssueDto> findIssueByPriority(String priority);
    List<IssueDto> findIssueByStatus(Boolean status);
    List<IssueDto> findIssueByUser(UserDto userDto);
    List<IssueDto> findIssueByUserId(Integer userId); // New method
    List<IssueDto> findIssueByUserAndTitle(UserDto userDto, String title);
    List<IssueDto> findIssueByUserAndCategory(UserDto userDto, String category);
    List<IssueDto> findIssueByUserAndLocation(UserDto userDto, String location);
    List<IssueDto> findIssueByUserAndDescription(UserDto userDto, String description);
    List<IssueDto> findIssueByUserAndPriority(UserDto userDto, String priority);
    List<IssueDto> findIssueByUserAndStatus(UserDto userDto, Boolean status);
}
