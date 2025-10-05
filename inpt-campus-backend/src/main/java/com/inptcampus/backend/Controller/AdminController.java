package com.inptcampus.backend.Controller;

import com.inptcampus.backend.DTO.StudentResponseDTO;
import com.inptcampus.backend.Mapper.StudentMapper;
import com.inptcampus.backend.Model.Admin;
import com.inptcampus.backend.Repository.RoomRepository;
import com.inptcampus.backend.Repository.StudentRepository;
import com.inptcampus.backend.Model.Room;
import com.inptcampus.backend.Service.AdminService;
import com.inptcampus.backend.Service.StudentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

}
