package com.sajilosarkar.sajilosarkar.repository;

import com.sajilosarkar.sajilosarkar.entity.User;

import io.micrometer.common.lang.NonNull;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // @Override
    @NonNull
    // Optional<User> findById(Integer id);

    Optional<User> findByEmail(String email);
    Optional<User> getUserByEmail(String email);
//    Optional<User> findByUsername(String username);

    
    @Modifying
    @Query(value="insert into user_roles(role_id,user_id) values(?1,?2)",nativeQuery = true)
    void saveRoleUser(Integer role_id,Integer user_id);
}
