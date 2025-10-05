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
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@CookieValue(name = "jwt", required = false) String token) {

        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.ok(null);
        }

        String username = jwtUtil.getUsername(token);
        String role = jwtUtil.getRole(token);

        
        User user = studentRepository.findByEmail(username).map(s -> (User) s).orElse(null);
        
        if (user == null) {
            user = adminRepository.findByEmail(username).map(a -> (User) a).orElse(null);
        }

        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        // Build response map with base user fields
        Map<String, Object> response = Map.of(
                "id", user.getId(),
                "email", user.getEmail(),
                "firstName", user.getFirstName(),
                "lastName", user.getLastName(),
                "role", role
        );

        // Add student-specific fields if user is a student
        if (user instanceof com.inptcampus.backend.Model.Student) {
            com.inptcampus.backend.Model.Student student = (com.inptcampus.backend.Model.Student) user;
            
            // Create a safe filiere object without circular references
            Map<String, Object> filiereInfo = null;
            if (student.getFiliere() != null) {
                filiereInfo = Map.of(
                    "id", student.getFiliere().getId(),
                    "name", student.getFiliere().getName(),
                    "code", student.getFiliere().getCode(),
                    "description", student.getFiliere().getDescription()
                );
            }
            Map<String, Object> roomInfo = null;
            if (student.getRoom() != null) {
                roomInfo = Map.of(
                        "id", student.getRoom().getId(),
                        "roomNumber", student.getRoom().getRoomNumber(),
                        "building", Map.of(
                                "id", student.getRoom().getBuilding().getId(),
                                "name", student.getRoom().getBuilding().getName(),
                                "address", student.getRoom().getBuilding().getAddress(),
                                "numFloors", student.getRoom().getBuilding().getNumFloors()
                        )
                );
            }
            response = Map.of(
                    "id", user.getId(),
                    "email", user.getEmail(),
                    "firstName", user.getFirstName(),
                    "lastName", user.getLastName(),
                    "gender", student.getGender() != null ? student.getGender() : "",
                    "role", role,
                    "currentStudyYear", student.getCurrentStudyYear() != null ? student.getCurrentStudyYear() : 0,
                    "filiere", filiereInfo != null ? filiereInfo : Map.of(),
                    "room", roomInfo != null ? roomInfo : Map.of()
            );
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(@RequestBody RegisterRequestDTO request) {
        RegisterResponseDTO response = studentService.registerStudent(request);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO request, HttpServletResponse response) {

        User user = studentRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            user = adminRepository.findByEmail(request.getEmail()).orElse(null);
        }

        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        

        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(24 * 60 * 60)
                .build();

        response.addHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.ok("Login successful");


    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(0)
                .build();

        response.addHeader("Set-Cookie", cookie.toString());
        return ResponseEntity.ok("Logged out");
    }
}
