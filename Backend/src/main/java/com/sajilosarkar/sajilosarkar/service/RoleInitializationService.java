package com.sajilosarkar.sajilosarkar.service;

import com.sajilosarkar.sajilosarkar.entity.Role;
import com.sajilosarkar.sajilosarkar.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class RoleInitializationService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleInitializationService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @PostConstruct
    public void initRoles() {
        createRoleIfNotExists("ROLE_LOCAL_GOVERNMENT");
        createRoleIfNotExists("ROLE_USER");
        createRoleIfNotExists("ROLE_SUPER_ADMIN");
    }

    private void createRoleIfNotExists(String roleName) {
        if (roleRepository.findByName(roleName) == null) {
            Role role = new Role();
            role.setName(roleName);
            roleRepository.save(role);
        }
    }
}
