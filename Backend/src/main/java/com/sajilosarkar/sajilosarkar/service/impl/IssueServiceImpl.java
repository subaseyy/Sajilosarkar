package com.sajilosarkar.sajilosarkar.service.impl;

import com.sajilosarkar.sajilosarkar.dto.IssueDto;
import com.sajilosarkar.sajilosarkar.dto.UserDto;
import com.sajilosarkar.sajilosarkar.entity.Issue;
import com.sajilosarkar.sajilosarkar.repository.IssueRepository;
import com.sajilosarkar.sajilosarkar.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class IssueServiceImpl implements IssueService {

    @Autowired
    private IssueRepository issueRepository;

    @Override
    public void saveIssue(IssueDto issueDto) {
        Issue issue = convertToEntity(issueDto);
        issueRepository.save(issue);
    }

    @Override
    public IssueDto findIssueById(Integer id) {
        Issue issue = issueRepository.findById(id).orElseThrow(() -> new RuntimeException("Issue not found"));
        return convertToDto(issue);
    }

    @Override
    public List<IssueDto> findAllIssues() {
        return issueRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void updateIssueStatus(Integer id, Boolean status) {
        Issue issue = issueRepository.findById(id).orElseThrow(() -> new RuntimeException("Issue not found"));
        issue.setStatus(status);
        issueRepository.save(issue);
    }

    @Override
    public void deleteIssueById(Integer id) {
        issueRepository.deleteById(id);
    }

    @Override
    public List<IssueDto> findIssueByTitle(String title) {
        return issueRepository.findByTitle(title).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssueByCategory(String category) {
        return issueRepository.findByCategory(category).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssueByLocation(String location) {
        return issueRepository.findByLocation(location).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssueByDescription(String description) {
        return issueRepository.findByDescription(description).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssueByPriority(String priority) {
        return issueRepository.findByPriority(priority).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssueByStatus(Boolean status) {
        return issueRepository.findByStatus(status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssueByUser(UserDto userDto) {
        return issueRepository.findByUserId(userDto.getId()).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssueByUserAndTitle(UserDto userDto, String title) {
        return issueRepository.findByUserIdAndTitle(userDto.getId(), title).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssueByUserAndCategory(UserDto userDto, String category) {
        return issueRepository.findByUserIdAndCategory(userDto.getId(), category).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssueByUserAndLocation(UserDto userDto, String location) {
        return issueRepository.findByUserIdAndLocation(userDto.getId(), location).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssueByUserAndDescription(UserDto userDto, String description) {
        return issueRepository.findByUserIdAndDescription(userDto.getId(), description).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssueByUserAndPriority(UserDto userDto, String priority) {
        return issueRepository.findByUserIdAndPriority(userDto.getId(), priority).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssueByUserAndStatus(UserDto userDto, Boolean status) {
        return issueRepository.findByUserIdAndStatus(userDto.getId(), status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private Issue convertToEntity(IssueDto issueDto) {
        // Conversion logic here
    }

    private IssueDto convertToDto(Issue issue) {
        // Conversion logic here
    }
}
