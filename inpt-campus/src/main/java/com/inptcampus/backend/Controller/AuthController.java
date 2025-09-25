package com.inptcampus.backend.Controller;

import com.inptcampus.backend.DTO.LoginRequestDTO;
import com.inptcampus.backend.DTO.LoginResponseDTO;
import com.inptcampus.backend.DTO.RegisterRequestDTO;
import com.inptcampus.backend.DTO.RegisterResponseDTO;
import com.inptcampus.backend.Model.User;
import com.inptcampus.backend.Repository.AdminRepository;
import com.inptcampus.backend.Security.JwtUtil;
import com.inptcampus.backend.Repository.StudentRepository;
import com.inptcampus.backend.Service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final StudentRepository studentRepository;
    private final AdminRepository adminRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final StudentService studentService;
    public AuthController(StudentRepository studentRepository, AdminRepository adminRepository,
                          JwtUtil jwtUtil,
                          PasswordEncoder passwordEncoder, StudentService studentService) {
        this.studentRepository = studentRepository;
        this.adminRepository = adminRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.studentService = studentService;
    }
    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(@RequestBody RegisterRequestDTO request) {
        RegisterResponseDTO response = studentService.registerStudent(request);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO request) {
        // Try finding student
        User user = studentRepository.findByEmail(request.getEmail()).orElse(null);

        // If not student, try finding admin
        if (user == null) {
            user = adminRepository.findByEmail(request.getEmail()).orElse(null);
        }

        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }
}
