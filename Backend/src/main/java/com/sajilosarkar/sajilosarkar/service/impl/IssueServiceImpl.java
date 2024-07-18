package com.sajilosarkar.sajilosarkar.service.impl;

import com.sajilosarkar.sajilosarkar.dto.IssueDto;
import com.sajilosarkar.sajilosarkar.dto.UserDto;
import com.sajilosarkar.sajilosarkar.entity.Issue;
import com.sajilosarkar.sajilosarkar.entity.User;
import com.sajilosarkar.sajilosarkar.repository.IssueRepository;
import com.sajilosarkar.sajilosarkar.repository.UserRepository;
import com.sajilosarkar.sajilosarkar.service.IssueService;

import com.sajilosarkar.sajilosarkar.service.UserService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class IssueServiceImpl implements IssueService {

    private IssueRepository issueRepository;
    private UserRepository userRepository;
    private UserService userService;

    public IssueServiceImpl(IssueRepository issueRepository, UserRepository userRepository, UserService userService) {
        this.issueRepository = issueRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    private final String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/media/images/issue_raise";

    // @Override
    // public void saveIssue(IssueDto issueDto, MultipartFile image, Integer userId) throws IOException {
    //     Issue issue = convertToEntity(issueDto);
    //     UserDto userDto = userService.findUserById(userId);
    //     issue.setUserId(userDto.getId());
    //     if (image != null && !image.isEmpty()) {
    //         String filename = FilenameUtils.getName(image.getOriginalFilename());
    //         Path path = Paths.get(UPLOAD_DIRECTORY + "/" + filename);
    //         Files.write(path, image.getBytes());
    //         issue.setImage(filename);
    //     } else {
    //         issue.setImage(null);
    //     }
    //     issueRepository.save(issue);
    // }

    @Override
    public void saveIssue(IssueDto issueDto, MultipartFile image, Integer userId) throws IOException {
        Issue issue = convertToEntity(issueDto);
        
        // Ensure userDto is not null
        UserDto userDto = userService.findUserById(userId);
        if (userDto != null) {
            issue.setUserId(userDto.getId()); // Ensure this method correctly handles the user
        } else {
            throw new RuntimeException("User not found with id: " + userId);
        }
        
        // Handle image upload
        if (image != null && !image.isEmpty()) {
            String filename = FilenameUtils.getName(image.getOriginalFilename());
            Path path = Paths.get(UPLOAD_DIRECTORY + "/" + filename);
            if (!Files.exists(path.getParent())) {
                Files.createDirectories(path.getParent());
            }
            Files.write(path, image.getBytes());
            issue.setImage(filename);
        } else {
            issue.setImage(null);
        }
        
        issueRepository.save(issue);
    }

    private Issue convertToEntity(IssueDto issueDto) {
        Issue issue = new Issue();
        issue.setTitle(issueDto.getTitle());
        issue.setCategory(issueDto.getCategory());
        issue.setLocation(issueDto.getLocation());
        issue.setDescription(issueDto.getDescription());
        issue.setPriority(issueDto.getPriority());
        issue.setStatus(true);

        if (issueDto.getImage() != null && !issueDto.getImage().isEmpty()) {
            @SuppressWarnings("null")
            String fileName = StringUtils.cleanPath(issueDto.getImage().getOriginalFilename());
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, fileName);
            try {
                Files.write(fileNameAndPath, issueDto.getImage().getBytes());
                issue.setImage(fileName); // Set the image filename in the User entity
            } catch (IOException e) {
                throw new RuntimeException("Failed to store file " + fileName, e);
            }
        }

        return issue;
    }

    @Override
    public IssueDto findIssueById(Integer id) {
        Optional<Issue> optionalIssue = issueRepository.findById(id);

        if (optionalIssue.isPresent()) {
            Issue issue = optionalIssue.get();
            return convertToDto(issue);
        } else {
            throw new RuntimeException("Issue not found with id: " + id);
        }
    }

    private IssueDto convertToDto(Issue issue) {
        IssueDto issueDto = new IssueDto();
        issueDto.setId(issue.getId());
        issueDto.setTitle(issue.getTitle());
        issueDto.setCategory(issue.getCategory());
        issueDto.setLocation(issue.getLocation());
        issueDto.setDescription(issue.getDescription());
        issueDto.setPriority(issue.getPriority());
        issueDto.setStatus(issue.getStatus());
        issueDto.setGetImage(issue.getImage());
        issueDto.setUserId(Long.valueOf(issue.getUser().getId()));
        return issueDto;
    }

    @Override
    public List<IssueDto> findAllIssues() {
        List<Issue> issues = issueRepository.findAll();
        return issues.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void updateIssueStatus(Integer id, Boolean status) {
        Optional<Issue> optionalIssue = issueRepository.findById(id);
        if (optionalIssue.isPresent()) {
            Issue issue = optionalIssue.get();
            issue.setStatus(status);
            issueRepository.save(issue);
        } else {
            throw new RuntimeException("Issue not found with id: " + id);
        }
    }

    @Override
    public void deleteIssueById(Integer id) {
        Optional<Issue> optionalIssue = issueRepository.findById(id);
        if (optionalIssue.isPresent()) {
            issueRepository.deleteById(id);
        } else {
            throw new RuntimeException("Issue not found with id: " + id);
        }
    }

    @Override
    public List<IssueDto> findIssuesByTitle(String title) {
        List<Issue> issues = issueRepository.findByTitle(title);
        return issues.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssuesByCategory(String category) {
        List<Issue> issues = issueRepository.findByCategory(category);
        return issues.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssuesByLocation(String location) {

        List<Issue> issues = issueRepository.findByLocation(location);
        return issues.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssuesByDescription(String description) {

        List<Issue> issues = issueRepository.findByDescription(description);
        return issues.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssuesByPriority(String priority) {
        List<Issue> issues = issueRepository.findByPriority(priority);
        return issues.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssuesByStatus(Boolean status) {

        List<Issue> issues = issueRepository.findByStatus(status);
        return issues.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssuesByUser(UserDto userDto) {
        User user = userRepository.findById(userDto.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        List<Issue> issues = issueRepository.findByUser(user);
        return issues.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssuesByUserId(Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<Issue> issues = issueRepository.findByUser(user);
        return issues.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssuesByUserAndTitle(UserDto userDto, String title) {
        User user = userRepository.findById(userDto.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        List<Issue> issues = issueRepository.findByUserAndTitle(user, title);
        return issues.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssuesByUserAndCategory(UserDto userDto, String category) {
        User user = userRepository.findById(userDto.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        List<Issue> issues = issueRepository.findByUserAndCategory(user, category);
        return issues.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssuesByUserAndLocation(UserDto userDto, String location) {
        User user = userRepository.findById(userDto.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        List<Issue> issues = issueRepository.findByUserAndLocation(user, location);
        return issues.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssuesByUserAndDescription(UserDto userDto, String description) {
        User user = userRepository.findById(userDto.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        List<Issue> issues = issueRepository.findByUserAndDescription(user, description);
        return issues.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssuesByUserAndPriority(UserDto userDto, String priority) {
        User user = userRepository.findById(userDto.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        List<Issue> issues = issueRepository.findByUserAndPriority(user, priority);
        return issues.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueDto> findIssuesByUserAndStatus(UserDto userDto, Boolean status) {
        User user = userRepository.findById(userDto.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        List<Issue> issues = issueRepository.findByUserAndStatus(user, status);
        return issues.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
}
