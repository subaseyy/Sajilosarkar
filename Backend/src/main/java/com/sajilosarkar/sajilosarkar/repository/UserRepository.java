package com.sajilosarkar.sajilosarkar.repository;

import com.sajilosarkar.sajilosarkar.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Override
    Optional<User> findById(Integer id);

    Optional<User> findByEmail(String email);


    @Modifying
    @Query(value="insert into users_roles(role_id,user_id) values(?1,?2)",nativeQuery = true)
    void saveRoleUSer(Integer role_id,Integer user_id);
}
