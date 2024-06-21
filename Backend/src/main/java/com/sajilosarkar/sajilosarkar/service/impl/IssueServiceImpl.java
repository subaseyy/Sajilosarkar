package com.sajilosarkar.sajilosarkar.service.impl;

import com.sajilosarkar.sajilosarkar.dto.IssueDto;
import com.sajilosarkar.sajilosarkar.dto.UserDto;
import com.sajilosarkar.sajilosarkar.entity.Issue;
import com.sajilosarkar.sajilosarkar.entity.User;
import com.sajilosarkar.sajilosarkar.repository.IssueRepository;
import com.sajilosarkar.sajilosarkar.repository.UserRepository;
import com.sajilosarkar.sajilosarkar.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class IssueServiceImpl implements IssueService {

    private final String UPLOAD_DIRECTORY = new StringBuilder().append(System.getProperty("user.dir")).append("/media/images/issue_raise").toString();

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void saveIssue(IssueDto issueDto) throws IOException {
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
        User user = userRepository.findById(userDto.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        return issueRepository.findByUser(user).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssueByUserAndTitle(UserDto userDto, String title) {
        User user = userRepository.findById(userDto.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        return issueRepository.findByUserAndTitle(user, title).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssueByUserAndCategory(UserDto userDto, String category) {
        User user = userRepository.findById(userDto.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        return issueRepository.findByUserAndCategory(user, category).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssueByUserAndLocation(UserDto userDto, String location) {
        User user = userRepository.findById(userDto.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        return issueRepository.findByUserAndLocation(user, location).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssueByUserAndDescription(UserDto userDto, String description) {
        User user = userRepository.findById(userDto.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        return issueRepository.findByUserAndDescription(user, description).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssueByUserAndPriority(UserDto userDto, String priority) {
        User user = userRepository.findById(userDto.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        return issueRepository.findByUserAndPriority(user, priority).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssueByUserAndStatus(UserDto userDto, Boolean status) {
        User user = userRepository.findById(userDto.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        return issueRepository.findByUserAndStatus(user, status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private Issue convertToEntity(IssueDto issueDto) throws IOException {
        // Implement your conversion logic here
        Issue issue = new Issue();
        issue.setId(issueDto.getId());
        issue.setTitle(issueDto.getTitle());
        issue.setCategory(issueDto.getCategory());
        issue.setLocation(issueDto.getLocation());
        issue.setDescription(issueDto.getDescription());
        issue.setPriority(issueDto.getPriority());
        issue.setStatus(issueDto.getStatus());
        
        if (issueDto.getUserId() != null) {
            User user = userRepository.findById(issueDto.getUserId())
                                      .orElseThrow(() -> new RuntimeException("User not found"));
            issue.setUser(user);
        }

        if (issueDto.getImage() != null) {

            StringBuilder fileNames = new StringBuilder();
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, issueDto.getImage().getOriginalFilename());
            fileNames.append(issueDto.getImage().getOriginalFilename());
            Files.write(fileNameAndPath, issueDto.getImage().getBytes());
            issue.setImage(issueDto.getImage().getOriginalFilename());

        }
        // Set user and role here as needed
        return issue;
    }

    private IssueDto convertToDto(Issue issue) {
        // Implement your conversion logic here
        IssueDto issueDto = new IssueDto();
        issueDto.setId(issue.getId());
        issueDto.setTitle(issue.getTitle());
        issueDto.setCategory(issue.getCategory());
        issueDto.setLocation(issue.getLocation());
        issueDto.setDescription(issue.getDescription());
        issueDto.setPriority(issue.getPriority());
        issueDto.setStatus(issue.getStatus());
        issueDto.setGetImage(issue.getImage());
        // Set user and role here as needed
        return issueDto;
    }
}
