package com.sajilosarkar.sajilosarkar.repository;

import com.sajilosarkar.sajilosarkar.entity.User;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // @Override
    @SuppressWarnings("null")
    Optional<User> findById(Integer id);

    Optional<User> findByEmail(String email);
    Optional<User> getUserByEmail(String email);

    
    @Modifying
    @Query(value="insert into user_roles(role_id,user_id) values(?1,?2)",nativeQuery = true)
    void saveRoleUser(Integer role_id,Integer user_id);
}
