package com.azmi.config;

import com.azmi.modal.Role;
import com.azmi.repository.RoleRepository;
import com.azmi.user.domain.UserRole;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RoleConfig {

    @Bean
    CommandLineRunner initRoles(RoleRepository roleRepository) {
        return args -> {
            if (roleRepository.findByName(UserRole.ROLE_USER).isEmpty()) {
                Role userRole = new Role();
                userRole.setName(UserRole.ROLE_USER);
                roleRepository.save(userRole);
            }
            if (roleRepository.findByName(UserRole.ROLE_ADMIN).isEmpty()) {
                Role adminRole = new Role();
                adminRole.setName(UserRole.ROLE_ADMIN);
                roleRepository.save(adminRole);
            }
            if (roleRepository.findByName(UserRole.ROLE_RENTER).isEmpty()) {
                Role renterRole = new Role();
                renterRole.setName(UserRole.ROLE_RENTER);
                roleRepository.save(renterRole);
            }
        };
    }
}

