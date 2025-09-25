package com.inptcampus.backend.Config;

import com.inptcampus.backend.Model.Admin;
import com.inptcampus.backend.Model.Role;
import com.inptcampus.backend.Repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminSetup {

    @Bean
    CommandLineRunner createAdmin(AdminRepository adminRepository, PasswordEncoder encoder) {
        return args -> {
            if (adminRepository.findByEmail("admin@inpt.com").isEmpty()) {
                Admin admin = new Admin();
                admin.setEmail("admin@inpt.com");
                admin.setPasswordHash(encoder.encode("Admin123!")); // hashed password
                admin.setRole(Role.ADMIN);
                admin.setFirstName("Super"); // <-- required
                admin.setLastName("Admin");  // <-- required
                adminRepository.save(admin);
                System.out.println("✅ Admin created: admin@inpt.com / Admin123!");
            }
        };
    }
}
