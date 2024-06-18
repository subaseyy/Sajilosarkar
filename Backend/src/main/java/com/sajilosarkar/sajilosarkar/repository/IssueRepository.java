package com.sajilosarkar.sajilosarkar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sajilosarkar.sajilosarkar.entity.Issue;
import com.sajilosarkar.sajilosarkar.entity.User;
import java.util.List;


public interface IssueRepository extends JpaRepository<Issue, Integer> {
    List<Issue> findByTitle(String title);

    List<Issue> findByCategory(String category);

    List<Issue> findByLocation(String location);

    List<Issue> findByDescription(String description);

    List<Issue> findByPriority(String priority);

    List<Issue> findByStatus(Boolean status);

    List<Issue> findByUser(User user);

    List<Issue> findByUserAndTitle(User user, String title);

    List<Issue> findByUserAndCategory(User user, String category);

    List<Issue> findByUserAndLocation(User user, String location);

    List<Issue> findByUserAndDescription(User user, String description);

    List<Issue> findByUserAndPriority(User user, String priority);

    List<Issue> findByUserAndStatus(User user, Boolean status); 
}
