package com.sajilosarkar.sajilosarkar.repository;

import com.sajilosarkar.sajilosarkar.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Override
    Optional<User> findById(Integer id);

    Optional<User> findByEmail(String email);
}
