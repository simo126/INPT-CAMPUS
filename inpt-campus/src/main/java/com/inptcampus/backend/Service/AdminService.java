package com.inptcampus.backend.Service;

import com.inptcampus.backend.Model.Admin;
import com.inptcampus.backend.Repository.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Optional<Admin> findByEmail(String email) {
        return adminRepository.findByEmail(email);
    }
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }
}
